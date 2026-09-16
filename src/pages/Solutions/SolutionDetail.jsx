import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Container from '../../components/common/Container'
import SectionLabel from '../../components/common/SectionLabel'
import Button from '../../components/common/Button'
import ScrollSpine from '../../components/common/ScrollSpine/ScrollSpine'
import CrystalScene from '../../components/sections/Solutions/CrystalScene'
import { fadeUp, staggerContainer } from '../../utils/animations'
import { solutions } from '../../data/solutions'
import { talkCTA } from '../../data/navigation'
import './SolutionDetail.css'

/**
 * Shared structure for all four solution pages — hero, what-we-do grid,
 * "can help when" list, process timeline, and result — with the scroll
 * spine line running behind the whole page. Individual pages
 * (Branding.jsx, Marketing.jsx, ...) render this with just a slug.
 */
export default function SolutionDetail({ slug }) {
  const solution = solutions.find((s) => s.slug === slug)
  if (!solution) return null

  const accent = solution.accent

  return (
    <div className="solution-detail" style={{ '--solution-accent': accent }}>
      <ScrollSpine segments={5} color={accent} />

      <div className="solution-detail__content">
        {/* SIBLING SWITCHER */}
        <div className="solution-switcher">
          <Container className="solution-switcher__inner">
            <Link to="/solutions" className="solution-switcher__back">
              ← Solutions
            </Link>
            <div className="solution-switcher__pills">
              {solutions.map((s) => (
                <Link
                  key={s.slug}
                  to={`/solutions/${s.slug}`}
                  className={`solution-switcher__pill${s.slug === slug ? ' is-active' : ''}`}
                >
                  {s.number} {s.name}
                </Link>
              ))}
            </div>
          </Container>
        </div>

        {/* HERO */}
        <section className="section solution-hero">
          <Container>
            <div className="solution-hero__grid">
              <div className="solution-hero__copy">
                <SectionLabel>{`${solution.number} — ${solution.name}`}</SectionLabel>
                <h1>{solution.title}</h1>
                {solution.intro.map((p) => (
                  <p key={p} className="solution-hero__intro">
                    {p}
                  </p>
                ))}
                <div className="solution-hero__actions">
                  <Button href={talkCTA.href} variant="primary">
                    {talkCTA.label}
                  </Button>
                  <Button href="#process" variant="ghost">
                    See our process ↓
                  </Button>
                </div>
              </div>
              <div className="solution-hero__stage">
                <CrystalScene accent={accent} />
              </div>
            </div>
          </Container>
        </section>

        {/* WHAT WE DO */}
        <section className="section solution-what">
          <Container>
            <SectionLabel>What We Do</SectionLabel>
            <h2 style={{ marginTop: '1rem' }}>Where {solution.name} Starts.</h2>

            <motion.div
              className="solution-what__grid"
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {solution.whatWeDo.map((item) => (
                <motion.div className="solution-what__item" key={item.title} variants={fadeUp}>
                  <span className="solution-what__marker" />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* CAN HELP WHEN */}
        <section className="section solution-help">
          <Container className="solution-help__inner">
            <div className="solution-help__label">
              <SectionLabel>Signals</SectionLabel>
              <h2>{solution.name} Can Help When</h2>
            </div>
            <motion.ul
              className="solution-help__list"
              variants={staggerContainer(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {solution.canHelpWhen.map((item) => (
                <motion.li key={item} variants={fadeUp}>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </Container>
        </section>

        {/* PROCESS */}
        <section className="section solution-process" id="process">
          <Container>
            <SectionLabel>Process</SectionLabel>
            <h2 style={{ marginTop: '1rem' }}>{`Our ${solution.name} Process`}</h2>

            <div className="solution-process__track">
              {solution.process.map((step, i) => (
                <div className="solution-process__step" key={step}>
                  <span className="solution-process__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="solution-process__label">{step}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* RESULT + CTA */}
        <section className="section solution-result">
          <Container className="solution-result__inner">
            <SectionLabel>The Result</SectionLabel>
            {solution.result.map((p, i) => (
              <p key={p} className={i === 0 ? 'solution-result__lead' : undefined}>
                {p}
              </p>
            ))}
            <Button href={talkCTA.href} variant="primary" style={{ marginTop: '2rem' }}>
              {talkCTA.label}
            </Button>
          </Container>
        </section>
      </div>
    </div>
  )
}
