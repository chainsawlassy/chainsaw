import { useEffect, useRef, useState } from 'react'

const BG_FACTOR = 0.14
const BAND_FACTOR = 0.38

export default function HeroParallax({ backgroundSrc, bandSrc, bandAlt = 'Chainsaw Lassy', children }) {
  const frameRef = useRef(null)
  const [offsets, setOffsets] = useState({ bg: 0, band: 0 })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = frameRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const scrolled = Math.max(0, -rect.top)
        setOffsets({
          bg: scrolled * BG_FACTOR,
          band: scrolled * BAND_FACTOR,
        })
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="hero-banner" aria-label="Hero">
      <div className="hero-banner__frame" ref={frameRef}>
        <div
          className="hero-banner__layer hero-banner__layer--bg"
          style={{ transform: `translate3d(0, ${offsets.bg}px, 0)` }}
          aria-hidden
        >
          <img
            className="hero-banner__img"
            src={backgroundSrc}
            alt=""
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="low"
          />
        </div>
        <div
          className="hero-banner__layer hero-banner__layer--band"
          style={{ transform: `translate3d(0, ${offsets.band}px, 0)` }}
        >
          <img
            className="hero-banner__img hero-banner__img--band"
            src={bandSrc}
            alt={bandAlt}
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="hero-banner__frame-overlay" aria-hidden />
      </div>
      {children}
    </section>
  )
}
