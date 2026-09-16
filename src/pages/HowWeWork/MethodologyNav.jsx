import { useEffect, useRef, useState } from 'react'

/**
 * Fixed right-side "coordinate navigator" HUD — ported from the reference
 * code.html's floating stage-nav aside. Tracks scroll progress through the
 * methodology container and highlights whichever step is currently in view.
 */
export default function MethodologyNav({ steps, containerRef }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrubPct, setScrubPct] = useState(0)
  const ticking = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    function update() {
      const rect = container.getBoundingClientRect()
      const viewH = window.innerHeight
      const start = rect.top - viewH * 0.4
      const total = rect.height
      let progress = total > 0 ? -start / total : 0
      progress = Math.min(Math.max(progress, 0), 1)
      setScrubPct(Math.round(progress * 100))

      const sections = Array.from(container.querySelectorAll('.how-step'))
      sections.forEach((section, i) => {
        const sRect = section.getBoundingClientRect()
        if (sRect.top <= viewH * 0.55 && sRect.bottom >= viewH * 0.2) {
          setActiveIndex(i)
        }
      })
      ticking.current = false
    }

    function onScroll() {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [containerRef])

  const scrollToStep = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <aside className="methodology-nav" aria-label="Methodology stage navigator">
      <div className="methodology-nav__header">
        <span>VECTOR TRACK</span>
        <span className="methodology-nav__pct">{scrubPct}%</span>
      </div>
      <nav className="methodology-nav__list">
        {steps.map((step, i) => (
          <button
            key={step.name}
            type="button"
            className={`methodology-nav__item${i === activeIndex ? ' is-active' : ''}`}
            onClick={() => scrollToStep(step.name.toLowerCase())}
          >
            <span className="methodology-nav__dot" />
            <span className="methodology-nav__label">
              {String(i + 1).padStart(2, '0')} {step.name.toUpperCase()}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
