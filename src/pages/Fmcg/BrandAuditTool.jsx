import { useState } from 'react'
import { brandAudit } from '../../data/fmcgExpo'

const MAX_PER_AREA = 4
const MAX_TOTAL = brandAudit.areas.length * MAX_PER_AREA

function scoreLabel(pct) {
  if (pct >= 80) return 'Scale-Ready'
  if (pct >= 55) return 'Building Momentum'
  return 'Foundational Gaps to Close'
}

/**
 * Self-contained 5-question brand check. Entirely client-side and scored
 * from the visitor's own answers — no external claims or benchmarks are
 * implied, only a relative score out of 100 and their lowest-scoring areas.
 */
export default function BrandAuditTool({ onBookClick }) {
  const [answers, setAnswers] = useState({})
  const [revealed, setRevealed] = useState(false)

  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === brandAudit.areas.length

  const total = brandAudit.areas.reduce((sum, area) => sum + (answers[area.key] ?? 0), 0)
  const pct = Math.round((total / MAX_TOTAL) * 100)

  const gaps = [...brandAudit.areas]
    .filter((area) => answers[area.key] !== undefined)
    .sort((a, b) => (answers[a.key] ?? 0) - (answers[b.key] ?? 0))
    .slice(0, 3)

  function selectAnswer(areaKey, score) {
    setAnswers((prev) => ({ ...prev, [areaKey]: score }))
  }

  return (
    <div className="fmcg-audit">
      <p className="fmcg-audit__disclaimer">{brandAudit.disclaimer}</p>

      <div className="fmcg-audit__grid">
        {brandAudit.areas.map((area, i) => (
          <div className="fmcg-audit__area" key={area.key}>
            <div className="fmcg-audit__area-head">
              <span className="fmcg-audit__area-number">{String(i + 1).padStart(2, '0')}</span>
              <span className="fmcg-audit__area-label">{area.label}</span>
            </div>
            <p className="fmcg-audit__question">{area.question}</p>
            <div className="fmcg-audit__options">
              {area.options.map((opt) => (
                <button
                  type="button"
                  key={opt.label}
                  className={`fmcg-audit__option${answers[area.key] === opt.score ? ' is-selected' : ''}`}
                  onClick={() => selectAnswer(area.key, opt.score)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fmcg-audit__result">
        <div className="fmcg-audit__score-ring" style={{ '--pct': allAnswered ? pct : 0 }}>
          <span className="fmcg-audit__score-num">{allAnswered ? pct : '—'}</span>
          <span className="fmcg-audit__score-max">/100</span>
        </div>
        <div className="fmcg-audit__result-copy">
          {allAnswered ? (
            <>
              <span className="fmcg-audit__result-status">{scoreLabel(pct)}</span>
              {revealed && gaps.length > 0 && (
                <ul className="fmcg-audit__gaps">
                  <span className="fmcg-audit__gaps-label">Your 3 biggest gaps</span>
                  {gaps.map((g) => (
                    <li key={g.key}>{g.label}</li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <span className="fmcg-audit__result-status fmcg-audit__result-status--muted">
              Answer all 5 to see your score ({answeredCount}/{brandAudit.areas.length})
            </span>
          )}
          <span className="fmcg-audit__free-tag">FREE · 5 MINUTES · NO OBLIGATION</span>
        </div>
        {allAnswered && !revealed ? (
          <button type="button" className="btn btn-primary" onClick={() => setRevealed(true)}>
            {brandAudit.cta}
          </button>
        ) : (
          <button type="button" className="btn btn-primary" disabled={!allAnswered} onClick={onBookClick}>
            {brandAudit.resultCTA}
          </button>
        )}
      </div>
    </div>
  )
}
