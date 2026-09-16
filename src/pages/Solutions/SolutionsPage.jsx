import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Container from '../../components/common/Container'
import SectionLabel from '../../components/common/SectionLabel'
import Button from '../../components/common/Button'
import SolutionsHeroScene from '../../components/sections/Solutions/SolutionsHeroScene'
import SolutionExplorerScene from '../../components/sections/Solutions/SolutionExplorerScene'
import { fadeUp, staggerContainer } from '../../utils/animations'
import { solutionsIntro, solutions, combinedJourneys } from '../../data/solutions'
import { heroCTA, talkCTA } from '../../data/navigation'
import './SolutionsPage.css'

export default function SolutionsPage() {
  const navigate = useNavigate()
  const explorerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const active = solutions[activeIndex]

  useEffect(() => {
    const el = explorerRef.current
    if (!el) return undefined

    let ticking = false
    function update() {
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight
      if (rect.top <= viewH * 0.65 && rect.bottom >= viewH * 0.2) {
        const total = Math.max(rect.height - viewH * 0.35, 1)
        const offset = Math.max(0, viewH * 0.5 - rect.top)
        const progress = Math.min(Math.max(offset / total, 0), 0.999)
        const idx = Math.min(solutions.length - 1, Math.floor(progress * solutions.length))
        setActiveIndex((cur) => (cur === idx ? cur : idx))
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
  }, [])

  const goToSolution = (index) => {
    const target = solutions[index]
    if (target) navigate(`/solutions/${target.slug}`)
  }

  return (
    <div className="solutions-page">
      {/* HERO */}
      <section className="solutions-hero">
        <SolutionsHeroScene />
        <div className="solutions-hero__scrim" aria-hidden="true" />
        <Container className="solutions-hero__inner">
          <SectionLabel>{solutionsIntro.label}</SectionLabel>
          <h1 className="solutions-hero__title">{solutionsIntro.title}</h1>
          <p className="solutions-hero__lead">{solutionsIntro.body[0]}</p>
          <p className="solutions-hero__lead">{solutionsIntro.body[1]}</p>
          <div className="solutions-hero__actions">
            <Button href={heroCTA.href} variant="primary">
              {heroCTA.label}
            </Button>
            <Button href="#explorer" variant="ghost">
              Explore the four disciplines ↓
            </Button>
          </div>
        </Container>
      </section>

      {/* 3D EXPLORER */}
      <section className="section solutions-explorer" id="explorer" ref={explorerRef}>
        <Container>
          <div className="solutions-explorer__header">
            <SectionLabel>Explore the System</SectionLabel>
            <h2>Four Disciplines. One Connected Approach.</h2>
            <p className="solutions-explorer__intro">
              {solutionsIntro.body[2]}
            </p>

            <div className="solutions-explorer__tabs" role="tablist" aria-label="Select a solution">
              {solutions.map((solution, i) => (
                <button
                  key={solution.slug}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  className={`solutions-explorer__tab${i === activeIndex ? ' is-active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                >
                  {solution.number} {solution.name}
                </button>
              ))}
            </div>
          </div>

          <div className="solutions-explorer__grid">
            <div className="solutions-explorer__stage">
              <SolutionExplorerScene items={solutions} activeIndex={activeIndex} onSelect={goToSolution} />
            </div>

            <div className="solutions-explorer__dossier" key={active.slug}>
              <div className="solutions-explorer__dossier-top">
                <span className="solutions-explorer__dossier-index">{active.number} / 0{solutions.length}</span>
                <span className="eyebrow">{active.name}</span>
              </div>
              <h3>{active.title}</h3>
              <p className="solutions-explorer__dossier-lead">{active.shortDescription}</p>

              <ul className="solutions-explorer__dossier-focus">
                {active.whatWeDo.slice(0, 3).map((item) => (
                  <li key={item.title}>
                    <span className="solutions-explorer__dossier-dot" style={{ background: active.accent }} />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <Button to={`/solutions/${active.slug}`} variant="primary">
                Explore {active.name} →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <hr className="divider" />

      {/* CONNECTED BY DESIGN */}
      <section className="section solutions-matrix">
        <Container>
          <SectionLabel>Connected by Design</SectionLabel>
          <h2 style={{ marginTop: '1rem', maxWidth: '30ch' }}>The Four Don't Work in Isolation.</h2>
          <p style={{ marginTop: '1.25rem', maxWidth: '62ch' }}>{solutionsIntro.body[4]}</p>

          <motion.div
            className="solutions-matrix__journeys"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {combinedJourneys.map((journey) => (
              <motion.div className="solutions-matrix__journey" key={journey.name} variants={fadeUp}>
                <h3>{journey.name}</h3>
                <p>{journey.steps.join(' → ')}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="section solutions-cta">
        <Container className="solutions-cta__inner">
          <h2>Not Sure Which Solution You Need?</h2>
          <p>Tell us the problem. We'll bring together the right combination of thinking and capability.</p>
          <Button href={talkCTA.href} variant="primary">
            {talkCTA.label}
          </Button>
        </Container>
      </section>
    </div>
  )
}
