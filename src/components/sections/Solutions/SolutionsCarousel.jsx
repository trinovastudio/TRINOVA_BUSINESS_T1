import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

const STEP = 90

/**
 * Lightweight CSS 3D "spatial carousel" — no WebGL, just a rotateY cylinder
 * built from transforms. Drag / swipe, click-to-focus, arrow keys, and
 * prev/next controls all converge on a single `angle` value.
 */
export default function SolutionsCarousel({ solutions }) {
  const [angle, setAngle] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragState = useRef({ startX: 0, startAngle: 0, moved: false })
  const stageRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const isCompact = useMediaQuery('(max-width: 640px)')
  const RADIUS = isCompact ? 210 : 340

  const count = solutions.length
  const activeIndex = useMemo(() => {
    const normalized = (((-angle / STEP) % count) + count) % count
    return Math.round(normalized) % count
  }, [angle, count])

  const goTo = useCallback((index) => {
    setAngle(-index * STEP)
  }, [])

  const next = useCallback(() => setAngle((a) => a - STEP), [])
  const prev = useCallback(() => setAngle((a) => a + STEP), [])

  const onPointerDown = (e) => {
    setDragging(true)
    dragState.current = { startX: e.clientX, startAngle: angle, moved: false }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!dragging) return
    const deltaX = e.clientX - dragState.current.startX
    if (Math.abs(deltaX) > 4) dragState.current.moved = true
    setAngle(dragState.current.startAngle + deltaX * 0.3)
  }

  const endDrag = () => {
    if (!dragging) return
    setDragging(false)
    setAngle((a) => Math.round(a / STEP) * STEP)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }

  // Keep the visible/interactive card in sync for assistive tech + inert siblings.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const cards = stage.querySelectorAll('[data-carousel-card]')
    cards.forEach((card, i) => {
      const isActive = i === activeIndex
      card.setAttribute('aria-hidden', isActive ? 'false' : 'true')
      card.querySelectorAll('a, button').forEach((el) => {
        if (isActive) el.removeAttribute('tabIndex')
        else el.setAttribute('tabIndex', '-1')
      })
    })
  }, [activeIndex])

  return (
    <div className="solutions-carousel">
      <div className="solutions-carousel__stage-header">
        <span className="solutions-carousel__hint desktop-only">Drag, or use the controls, to rotate</span>
        <div className="solutions-carousel__controls">
          <button type="button" className="solutions-carousel__nav" onClick={prev} aria-label="Previous solution">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="solutions-carousel__nav" onClick={next} aria-label="Next solution">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M7 3L13 9L7 15" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`solutions-carousel__stage${dragging ? ' is-dragging' : ''}`}
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Trinova Business solutions"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="solutions-carousel__aura" aria-hidden="true" />
        <div
          className="solutions-carousel__cylinder"
          style={{
            transform: `rotateY(${angle}deg)`,
            transition: dragging || reducedMotion ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {solutions.map((solution, i) => {
            const isActive = i === activeIndex
            return (
              <article
                key={solution.slug}
                data-carousel-card
                className={`solutions-carousel__card${isActive ? ' is-active' : ''}`}
                style={{ transform: `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)` }}
                onClick={() => !dragState.current.moved && goTo(i)}
              >
                <div className="solutions-carousel__card-top">
                  <span className="eyebrow">Solution {solution.number}</span>
                  <span className="solutions-carousel__card-icon" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{solution.name}</h3>
                <p>{solution.shortDescription}</p>
                <div className="solutions-carousel__tags">
                  {solution.whatWeDo.slice(0, 2).map((item) => (
                    <span key={item.title} className="solutions-carousel__tag">{item.title}</span>
                  ))}
                </div>
                <Link to={`/solutions/${solution.slug}`} className="solutions-carousel__link">
                  Explore {solution.name} →
                </Link>
              </article>
            )
          })}
        </div>
      </div>

      <div className="solutions-carousel__dots" role="tablist" aria-label="Select a solution">
        {solutions.map((solution, i) => (
          <button
            key={solution.slug}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={solution.name}
            className={`solutions-carousel__dot${i === activeIndex ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
