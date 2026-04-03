import { useEffect } from 'react'

const SEL = '[data-parallax-speed]'

/** Multipliers on window.scrollY — higher = stronger parallax (px offset per px scrolled). */
const speeds = [0.12, 0.2, 0.11, 0.17, 0.13, 0.23, 0.1, 0.18, 0.16, 0.22, 0.12, 0.19, 0.14, 0.26, 0.12, 0.19]

export function parallaxSpeedForIndex(i) {
  return speeds[i % speeds.length]
}

export function useParallaxDecos() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    let ticking = false

    const apply = () => {
      const y = window.scrollY
      document.querySelectorAll(SEL).forEach((el) => {
        const raw = el.getAttribute('data-parallax-speed')
        const speed = raw != null ? Number.parseFloat(raw) : 0.17
        if (Number.isNaN(speed)) return
        el.style.setProperty('--deco-parallax-y', `${y * speed}px`)
      })
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(apply)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    apply()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
