import { useEffect, useRef } from 'react'

export function useParallax(speed = 0.2) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function handleScroll() {
      const rect = el.getBoundingClientRect()
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed
      el.style.transform = `translate3d(0, ${offset}px, 0)`
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return ref
}
