import { useEffect, useRef } from 'react'

/**
 * @typedef {{ x: number, y: number, t: number }} StrokePoint
 * @typedef {{ version?: number, width: number, height: number, strokes: StrokePoint[][] }} StrokeRecording
 */

function flattenTimes(strokes) {
  const flat = strokes.flat()
  if (flat.length === 0) return { tMin: 0, tMax: 0 }
  let tMin = flat[0].t
  let tMax = flat[0].t
  for (const p of flat) {
    if (p.t < tMin) tMin = p.t
    if (p.t > tMax) tMax = p.t
  }
  return { tMin, tMax }
}

/**
 * @param {{ x: number, y: number }[]} pts
 */
/** One Chaikin pass on open polyline (keeps endpoints); softens digitized corners. */
function chaikinOpen(pts) {
  if (pts.length < 3) return pts
  const out = [pts[0]]
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i]
    const b = pts[i + 1]
    out.push({ x: 0.75 * a.x + 0.25 * b.x, y: 0.75 * a.y + 0.25 * b.y, t: a.t })
    out.push({ x: 0.25 * a.x + 0.75 * b.x, y: 0.25 * a.y + 0.75 * b.y, t: b.t })
  }
  out.push(pts[pts.length - 1])
  return out
}

function appendSmoothedStroke(path, pts) {
  const n = pts.length
  if (n < 2) return
  if (n === 2) {
    path.moveTo(pts[0].x, pts[0].y)
    path.lineTo(pts[1].x, pts[1].y)
    return
  }
  path.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < n - 2; i++) {
    const cx = (pts[i].x + pts[i + 1].x) * 0.5
    const cy = (pts[i].y + pts[i + 1].y) * 0.5
    path.quadraticCurveTo(pts[i].x, pts[i].y, cx, cy)
  }
  const a = pts[n - 2]
  const b = pts[n - 1]
  path.quadraticCurveTo(a.x, a.y, b.x, b.y)
}

/**
 * Plays back a stroke-recorder JSON export on a canvas over the polaroid margin.
 * Triggered by hover on the parent `.bio-section__polaroid` (see useEffect).
 */
export default function PolaroidStrokePlayback({ data }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const phaseRef = useRef('idle')

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas || !data?.strokes?.length) return

    const polaroid = wrap.closest('.bio-section__polaroid')
    if (!polaroid) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = canvas.getContext('2d')
    const { width: W, height: H, strokes } = data
    const { tMin, tMax } = flattenTimes(strokes)
    const recordSpan = Math.max(1, tMax - tMin)
    /** Wall-clock playback (ms). */
    const wallDuration = Math.min(3400, Math.max(420, recordSpan * 0.48))
    /** Zoom vs JSON bounds; scale math caps so the stroke still fits the caption box. */
    const contentScale = 1.28
    /** Extra internal pixels (on top of DPR) so rotated / scaled polaroids stay crisp. */
    const supersample = 2

    const drawUpTo = (recordTime) => {
      // Use layout box, not getBoundingClientRect(): parent polaroid uses transform: scale()
      // on hover; rect.width/height would match the *visual* size and blow past layout → huge canvas.
      const cssW = Math.max(1, wrap.offsetWidth)
      const cssH = Math.max(1, wrap.offsetHeight)
      const dpr = window.devicePixelRatio || 1
      // Uniform scale so scaled recording fits inside the caption box (contentScale > 1 otherwise overflows → clip).
      const sBase = Math.min(cssW / (W * contentScale), cssH / (H * contentScale))
      const k = supersample * dpr * sBase * contentScale
      const bw = Math.max(1, Math.round(cssW * dpr * supersample))
      const bh = Math.max(1, Math.round(cssH * dpr * supersample))
      canvas.width = bw
      canvas.height = bh
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`
      const ox = Math.round((bw - W * k) * 0.5)
      /** Bottom-align recording (y = H) to caption bottom; tiny pad in device px. */
      const bottomPadDev = Math.round(1.25 * supersample)
      const oy = Math.round(bh - H * k - bottomPadDev)

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.setTransform(k, 0, 0, k, ox, oy)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.miterLimit = 2.5
      /** User-space width; divide by supersample so on-screen thickness stays similar after hi-res bitmap. */
      ctx.lineWidth = Math.max(1.14, 1.78 / (sBase * contentScale)) / supersample
      ctx.strokeStyle = '#24221f'

      for (const stroke of strokes) {
        const pts = stroke.filter((p) => p.t <= recordTime)
        if (pts.length < 2) continue
        const softened = pts.length >= 5 ? chaikinOpen(pts) : pts
        const path = new Path2D()
        appendSmoothedStroke(path, softened)
        ctx.stroke(path)
      }
    }

    const drawComplete = () => {
      drawUpTo(tMax + 1)
    }

    const cancelAnim = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }

    const onEnter = () => {
      cancelAnim()
      phaseRef.current = 'playing'
      const wallStart = performance.now()

      const tick = (now) => {
        if (phaseRef.current !== 'playing') return
        const u = Math.min(1, (now - wallStart) / wallDuration)
        const recordTime = tMin + u * (tMax - tMin + 0.001)
        drawUpTo(recordTime)
        if (u < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          phaseRef.current = 'done'
          drawComplete()
          rafRef.current = 0
        }
      }
      drawUpTo(tMin)
      rafRef.current = requestAnimationFrame(tick)
    }

    const onLeave = () => {
      phaseRef.current = 'idle'
      cancelAnim()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    polaroid.addEventListener('mouseenter', onEnter)
    polaroid.addEventListener('mouseleave', onLeave)

    const ro = new ResizeObserver(() => {
      if (phaseRef.current === 'done') drawComplete()
    })
    ro.observe(wrap)

    return () => {
      polaroid.removeEventListener('mouseenter', onEnter)
      polaroid.removeEventListener('mouseleave', onLeave)
      ro.disconnect()
      phaseRef.current = 'idle'
      cancelAnim()
    }
  }, [data])

  return (
    <div ref={wrapRef} className="bio-section__polaroid-stroke-caption" aria-hidden>
      <canvas ref={canvasRef} className="bio-section__polaroid-stroke-caption__canvas" />
    </div>
  )
}
