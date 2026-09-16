import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './HowStepsSpine.css'

/**
 * The methodology spine for How We Work — ported from the reference
 * code.html's "core-spine" mechanic (a scroll-drawn SVG path with a
 * traveling pulse node), but computed from the *actual* measured position
 * of each step's center node marker rather than a hardcoded pixel path.
 *
 * The generic <ScrollSpine> used elsewhere bends across the full section
 * width, which cuts across card text on this alternating-column layout.
 * This one stays anchored to the fixed center node column and only bows
 * gently in the gap between steps, so it never crosses the copy.
 */
export default function HowStepsSpine({
  containerRef,
  nodeSelector = '.how-step__node',
  color = 'var(--color-primary)',
  midColor = 'var(--color-tertiary)',
  trackColor = 'var(--color-border-soft)',
}) {
  const pathRef = useRef(null)
  const travelerRef = useRef(null)
  const [box, setBox] = useState({ width: 0, height: 0 })
  const [d, setD] = useState('')
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    function measure() {
      const containerRect = container.getBoundingClientRect()
      const nodes = Array.from(container.querySelectorAll(nodeSelector))
      const points = nodes.map((el) => {
        const r = el.getBoundingClientRect()
        return {
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top,
        }
      })

      setBox({ width: containerRect.width, height: container.scrollHeight })

      if (points.length === 0) {
        setD('')
        return
      }

      const amp = 22
      let path = `M ${points[0].x} 0 L ${points[0].x} ${points[0].y}`

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1]
        const curr = points[i]
        const midY = (prev.y + curr.y) / 2
        const dir = i % 2 === 0 ? 1 : -1
        const bendX = (prev.x + curr.x) / 2 + dir * amp
        path += ` C ${prev.x} ${prev.y + (midY - prev.y) * 0.6}, ${bendX} ${midY}, ${curr.x} ${curr.y}`
      }

      const last = points[points.length - 1]
      path += ` L ${last.x} ${container.scrollHeight}`
      setD(path)
    }

    measure()
    // Re-measure once after mount so nodes mid-entrance-animation (fadeUp
    // on scroll-into-view) settle into their final position first.
    const settleTimer = setTimeout(measure, 500)
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(settleTimer)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [containerRef, nodeSelector])

  useEffect(() => {
    const path = pathRef.current
    const container = containerRef.current
    if (!path || !container || !d || !path.getTotalLength) return undefined

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
  }, [d, reducedMotion, containerRef])

  if (!d) return null

  return (
    <div className="how-steps-spine" aria-hidden="true">
      <svg
        className="how-steps-spine__svg"
        width={box.width}
        height={box.height}
        viewBox={`0 0 ${box.width} ${box.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="howSpineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.85" />
            <stop offset="50%" stopColor={midColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.85" />
          </linearGradient>
          <filter id="howSpineGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={d} stroke={trackColor} strokeWidth="1" fill="none" />
        <path
          ref={pathRef}
          d={d}
          stroke="url(#howSpineGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          filter="url(#howSpineGlow)"
        />
        <circle ref={travelerRef} r="5" fill={color} filter="url(#howSpineGlow)" />
      </svg>
    </div>
  )
}
