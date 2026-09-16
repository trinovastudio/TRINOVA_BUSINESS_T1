import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { industryCohorts } from '../../../data/industries'
import './IndustrySqueezeCarousel.css'

/**
 * The squeeze-slat carousel — a horizontal row of collapsed industry slats
 * where the active one expands to reveal its detail card, the rest
 * compressing to make room. Rebuilt as a clean, state-driven React
 * component (click / keyboard, not hover-triggered, which is what made the
 * original mechanism fragile) with cohort filter pills and a vertical
 * accordion fallback below 900px where a horizontal squeeze can't fit 19
 * items.
 */
export default function IndustrySqueezeCarousel({ industries }) {
  const [cohortFilter, setCohortFilter] = useState('all')
  const [activeIndex, setActiveIndex] = useState(0)

  const filtered = useMemo(
    () => (cohortFilter === 'all' ? industries : industries.filter((item) => item.cohort === cohortFilter)),
    [industries, cohortFilter]
  )

  useEffect(() => {
    setActiveIndex(0)
  }, [cohortFilter])

  const active = filtered[activeIndex] ?? filtered[0]

  const selectCohort = (slug) => {
    setCohortFilter(slug)
  }

  const prev = () => setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length)
  const next = () => setActiveIndex((i) => (i + 1) % filtered.length)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }

  if (!active) return null

  return (
    <div className="industry-carousel">
      <div className="industry-carousel__toolbar">
        <div className="industry-carousel__pills">
          <button
            type="button"
            className={`industry-carousel__pill${cohortFilter === 'all' ? ' is-active' : ''}`}
            onClick={() => selectCohort('all')}
          >
            All {industries.length} Sectors
          </button>
          {industryCohorts.map((cohort) => (
            <button
              key={cohort.slug}
              type="button"
              className={`industry-carousel__pill${cohortFilter === cohort.slug ? ' is-active' : ''}`}
              onClick={() => selectCohort(cohort.slug)}
            >
              {cohort.label}
            </button>
          ))}
        </div>

        <div className="industry-carousel__meta">
          <span>
            {active.id} · Sector {activeIndex + 1} / {filtered.length}
          </span>
          <div className="industry-carousel__nav">
            <button type="button" aria-label="Previous sector" onClick={prev}>
              ←
            </button>
            <button type="button" aria-label="Next sector" onClick={next}>
              →
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal squeeze strip — desktop / tablet */}
      <div
        className="industry-carousel__strip"
        role="tablist"
        aria-label="Industries"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {filtered.map((item, i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`industry-slat${isActive ? ' is-active' : ''}`}
              style={{ '--slat-accent': item.accent }}
              onClick={() => setActiveIndex(i)}
            >
              {isActive ? (
                <div className="industry-slat__card">
                  <div className="industry-slat__card-top">
                    <span className="industry-slat__id">{item.id}</span>
                    <span className="eyebrow">{item.subtitle}</span>
                  </div>
                  <h3>{item.name}</h3>
                  <p className="industry-slat__tension">{item.tension}</p>
                  <p className="industry-slat__focus">{item.focus}</p>
                  <Link to={`/industries/${item.slug}`} className="industry-slat__link">
                    View {item.name} →
                  </Link>
                </div>
              ) : (
                <span className="industry-slat__collapsed">
                  <span className="industry-slat__collapsed-id">{item.id}</span>
                  <span className="industry-slat__collapsed-name">{item.name}</span>
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Vertical accordion — mobile */}
      <div className="industry-accordion">
        {filtered.map((item, i) => {
          const isActive = i === activeIndex
          return (
            <div className={`industry-accordion__item${isActive ? ' is-active' : ''}`} key={item.slug} style={{ '--slat-accent': item.accent }}>
              <button
                type="button"
                className="industry-accordion__header"
                aria-expanded={isActive}
                onClick={() => setActiveIndex(isActive ? -1 : i)}
              >
                <span className="industry-accordion__id">{item.id}</span>
                <span className="industry-accordion__name">{item.name}</span>
                <span className="industry-accordion__chevron">{isActive ? '−' : '+'}</span>
              </button>
              {isActive && (
                <div className="industry-accordion__body">
                  <p className="industry-slat__tension">{item.tension}</p>
                  <p className="industry-slat__focus">{item.focus}</p>
                  <Link to={`/industries/${item.slug}`} className="industry-slat__link">
                    View {item.name} →
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
