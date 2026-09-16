import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import './ScrollBurnText.css'

/**
 * Film grain as a tiled SVG rather than a bitmap: it's the one texture that
 * has to sit over the whole frame, and a few hundred bytes of turbulence
 * beats shipping a PNG large enough not to visibly repeat.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='gamma' exponent='4'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")"

/** Progress through a block's own slot at which it starts to burn. */
const BURN_AT = 0.62
/** How much of the slot the burn takes to eat the block whole. */
const BURN_SPAN = 0.38
/** Slots of approach before the first block reaches the front. */
const LEAD = 0.7
/** Alpha of a block still standing behind the one up front. */
const DIM = 0.3
/** How far into its own fade the first block already is on the opening frame. */
const OPEN = 0.22
/** Distance a block is born at, in units of the distance it is read at. */
const FAR = 4
/** Distance it has closed to by the time it is gone. */
const NEAR = 0.25
/** Burn a single glyph fades over — kept in step with the CSS opacity formula. */
const RAMP = 0.09

const clamp01 = (v) => Math.min(1, Math.max(0, v))

/**
 * Scroll-driven "burn" text reveal: each block of copy comes up out of the
 * dark, passes the reading plane, and burns away to uncover the next one
 * standing behind it. Ported from a shadcn/Tailwind/TS reference into plain
 * JSX + CSS so it fits this project's design-token system with no new
 * dependencies.
 */
export default function ScrollBurnText({
  sections,
  hint = 'scroll down',
  runway = '170vh',
  container,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion()
  const runwayRef = useRef(null)
  const counterRef = useRef(null)
  const hintRef = useRef(null)
  const blockRefs = useRef([])

  const count = sections.length
  const total = useRef(count)
  total.current = count

  useEffect(() => {
    if (prefersReducedMotion) return
    const el = runwayRef.current
    if (!el) return
    const containerEl = container?.current ?? null
    const win = el.ownerDocument.defaultView ?? window
    const scroller = containerEl ?? win

    const measure = () => {
      blockRefs.current.forEach((block) => {
        if (!block) return
        const w = block.offsetWidth || 1
        const h = block.offsetHeight || 1
        Array.from(block.children).forEach((node) => {
          const x = (node.offsetLeft + node.offsetWidth / 2) / w
          const y = (node.offsetTop + node.offsetHeight / 2) / h
          const blob =
            0.5 +
            0.28 * Math.sin(x * 11.3 + y * 6.1 + 1.7) +
            0.22 * Math.sin(x * 5.7 - y * 13.9 + 4.2)
          const middle = Math.hypot(x - 0.5, (y - 0.5) * 1.15) / 0.62
          node.style.setProperty('--t', `${clamp01(0.05 + 0.55 * middle + 0.45 * blob)}`)
        })
      })
    }

    const burnt = []
    let active = -1
    let raf = 0

    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const viewport = containerEl ? containerEl.clientHeight : win.innerHeight
      const top = containerEl ? rect.top - containerEl.getBoundingClientRect().top : rect.top
      const p = clamp01(-top / (rect.height - viewport || 1))

      const count = total.current
      const t = -LEAD + p * (count - 1 + LEAD + BURN_AT)
      let front = 0

      blockRefs.current.forEach((block, i) => {
        const wrap = block?.parentElement
        if (!block || !wrap) return
        const q = t - i
        if (q > 1) front = Math.min(i + 1, count - 1)

        const alpha = clamp01((q + LEAD + OPEN) / 0.45) * (DIM + (1 - DIM) * clamp01(q / 0.45))

        if (alpha <= 0 || q > 1) {
          wrap.style.visibility = 'hidden'
          return
        }
        wrap.style.visibility = 'visible'
        wrap.style.opacity = `${alpha}`
        const depth = Math.max(FAR - ((FAR - NEAR) * (q + LEAD)) / (1 + LEAD), NEAR)
        wrap.style.transform = `scale(${1 / depth})`

        const burn = clamp01((q - BURN_AT) / BURN_SPAN) * (1 + RAMP)
        if (burnt[i] !== burn) {
          burnt[i] = burn
          block.style.setProperty('--b', `${burn}`)
          block.style.setProperty('--ab', `${0.35 + burn * 2.6}`)
        }
      })

      if (hintRef.current) {
        hintRef.current.style.opacity = `${clamp01(1 - p / 0.08)}`
      }
      if (active !== front) {
        active = front
        if (counterRef.current) {
          counterRef.current.textContent = `${String(front + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`
        }
      }
    }

    const onScroll = () => {
      if (!raf) raf = win.requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    update()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    win.addEventListener('resize', onResize)
    const ro = containerEl ? new ResizeObserver(onResize) : null
    if (containerEl && ro) ro.observe(containerEl)

    return () => {
      scroller.removeEventListener('scroll', onScroll)
      win.removeEventListener('resize', onResize)
      ro?.disconnect()
      if (raf) win.cancelAnimationFrame(raf)
    }
  }, [prefersReducedMotion, container])

  if (prefersReducedMotion) {
    return (
      <div className={`scroll-burn scroll-burn--static ${className}`.trim()}>
        <div className="scroll-burn__static-list">
          {sections.map((body, i) => (
            <p key={i} className="scroll-burn__block scroll-burn__block--static">
              {body}
            </p>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`scroll-burn ${className}`.trim()}>
      <div ref={runwayRef} style={{ height: `calc(${runway} * ${count})` }} className="scroll-burn__runway">
        <div className="scroll-burn__stage">
          <div ref={counterRef} className="scroll-burn__counter" />

          {hint ? (
            <div ref={hintRef} className="scroll-burn__hint">
              <span className="scroll-burn__hint-label">{hint}</span>
            </div>
          ) : null}

          {sections.map((body, i) => (
            <div key={i} style={{ visibility: 'hidden' }} className="scroll-burn__block-wrap" aria-hidden>
              <p
                ref={(node) => {
                  blockRefs.current[i] = node
                }}
                className="scroll-burn__block"
                style={{ '--b': 0, '--ab': 0.35 }}
              >
                {Array.from(body).map((ch, k) =>
                  ch === ' ' ? ' ' : (
                    <span key={k} className="scroll-burn__glyph">
                      {ch}
                    </span>
                  ),
                )}
              </p>
            </div>
          ))}

          <div aria-hidden className="scroll-burn__grain" style={{ backgroundImage: GRAIN }} />

          <p className="sr-only">{sections.join(' ')}</p>
        </div>
      </div>
    </div>
  )
}
