import { useEffect, useState } from 'react'
import { expoEvent, eventStatus } from '../../data/fmcgExpo'

function getPhase(now) {
  const start = new Date(expoEvent.startISO).getTime()
  const end = new Date(expoEvent.endISO).getTime()
  if (now < start) return 'before'
  if (now < end) return 'during'
  return 'after'
}

function getCountdown(now) {
  const start = new Date(expoEvent.startISO).getTime()
  const distance = Math.max(start - now, 0)
  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((distance / (1000 * 60)) % 60)
  return { days, hours, minutes }
}

/**
 * Live event-state strip: switches copy automatically between pre-expo
 * (countdown), during-expo (live), and post-expo (thank you) based on the
 * visitor's clock against the real event dates — no manual toggling.
 */
export default function EventStatusBar({ onBookClick }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(id)
  }, [])

  const phase = getPhase(now)
  const copy = eventStatus[phase]
  const countdown = phase === 'before' ? getCountdown(now) : null

  return (
    <div className={`fmcg-status fmcg-status--${phase}`} role="status">
      <div className="fmcg-status__inner">
        <span className={`fmcg-status__dot fmcg-status__dot--${phase}`} aria-hidden="true" />
        <span className="fmcg-status__label">{copy.label}</span>

        {countdown && (
          <span className="fmcg-status__countdown">
            <strong>{countdown.days}</strong>d
            <strong>{String(countdown.hours).padStart(2, '0')}</strong>h
            <strong>{String(countdown.minutes).padStart(2, '0')}</strong>m to go
          </span>
        )}

        <span className="fmcg-status__body">{copy.body}</span>
        <span className="fmcg-status__meta">
          {expoEvent.dateRange} · {expoEvent.city}
        </span>
      </div>
      <button type="button" className="fmcg-status__cta" onClick={onBookClick}>
        {copy.cta}
      </button>
    </div>
  )
}
