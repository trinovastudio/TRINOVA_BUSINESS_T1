import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import './ScrollSpine.css'

/**
 * Decorative background conduit that draws itself in as the page scrolls,
 * with a traveling pulse node — the "line" motif reused across the solution
 * detail pages, Capabilities, and How We Work. Renders as the first child of
 * a `position: relative` wrapper and measures that wrapper to build its path,
 * so it works at any content height without per-page tuning.
 */
export default function ScrollSpine({ segments = 5, color = 'var(--color-primary)' }) {
  const wrapRef = useRef(null)
  const pathRef = useRef(null)
  const travelerRef = useRef(null)
  const [box, setBox] = useState({ width: 0, height: 0 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = wrapRef.current?.parentElement
    if (!el) return undefined

    const update = () => setBox({ width: el.clientWidth, height: el.scrollHeight })
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const path = pathRef.current
    const container = wrapRef.current?.parentElement
    if (!path || !container || !path.getTotalLength) return undefined

    const length = path.getTotalLength()
    path.style.strokeDasharray = String(length)
    path.style.strokeDashoffset = reducedMotion ? '0' : String(length)

    let ticking = false
    function update() {
      const rect = container.getBoundingClientRect()
      const viewH = window.innerHeight
      const start = rect.top - viewH * 0.75
      const total = rect.height + viewH * 0.5
      let progress = total > 0 ? -start / total : 0
      progress = Math.min(Math.max(progress, 0), 1)

      path.style.strokeDashoffset = reducedMotion ? '0' : String(length * (1 - progress))

      if (travelerRef.current) {
        const pt = path.getPointAtLength(length * progress)
        travelerRef.current.setAttribute('cx', pt.x)
        travelerRef.current.setAttribute('cy', pt.y)
      }
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
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
  }, [box, reducedMotion])

  const d = buildSpinePath(box.width, box.height, segments)

  return (
    <div className="scroll-spine" ref={wrapRef} aria-hidden="true">
      {d && (
        <svg
          className="scroll-spine__svg"
          width={box.width}
          height={box.height}
          viewBox={`0 0 ${box.width} ${box.height}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="scrollSpineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.85" />
              <stop offset="50%" stopColor="var(--color-tertiary)" stopOpacity="0.6" />
              <stop offset="100%" stopColor={color} stopOpacity="0.85" />
            </linearGradient>
            <filter id="scrollSpineGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path d={d} stroke="var(--color-border-soft)" strokeWidth="1" fill="none" />
          <path
            ref={pathRef}
            d={d}
            stroke="url(#scrollSpineGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="url(#scrollSpineGlow)"
          />
          <circle ref={travelerRef} cx={box.width / 2} cy="0" r="5" fill={color} filter="url(#scrollSpineGlow)" />
        </svg>
      )}
    </div>
  )
}

function buildSpinePath(width, height, segments) {
  if (!width || !height) return ''
  const cx = width / 2
  const amp = Math.min(width * 0.24, 240)
  const segH = height / Math.max(segments, 1)
  let d = `M ${cx} 0`

  for (let i = 0; i < segments; i++) {
    const y0 = i * segH
    const y1 = y0 + segH
    const dir = i % 2 === 0 ? -1 : 1
    const bendX = Math.max(cx + dir * amp, 24)
    const midY = (y0 + y1) / 2
    d += ` C ${cx} ${y0 + segH * 0.2}, ${bendX} ${y0 + segH * 0.24}, ${bendX} ${midY}`
    d += ` C ${bendX} ${y1 - segH * 0.24}, ${cx} ${y1 - segH * 0.2}, ${cx} ${y1}`
  }

  return d
}
