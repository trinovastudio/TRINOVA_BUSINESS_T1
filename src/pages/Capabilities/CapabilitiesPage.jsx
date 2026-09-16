import { motion } from 'motion/react'
import Container from '../../components/common/Container'
import SectionLabel from '../../components/common/SectionLabel'
import Button from '../../components/common/Button'
import ScrollSpine from '../../components/common/ScrollSpine/ScrollSpine'
import CrystalScene from '../../components/sections/Solutions/CrystalScene'
import { fadeUp, staggerContainer } from '../../utils/animations'
import {
  capabilitiesIntro,
  coreCapabilities,
  capabilityExamples,
  businessStages,
  teamDisciplines,
} from '../../data/capabilities'
import { talkCTA } from '../../data/navigation'
import './CapabilitiesPage.css'

export default function CapabilitiesPage() {
  return (
    <div className="capabilities-page">
      <ScrollSpine segments={6} />

      <div className="capabilities-page__content">
        {/* HERO */}
        <section className="section capabilities-hero">
          <Container>
            <SectionLabel>{capabilitiesIntro.label}</SectionLabel>
            <h1 style={{ marginTop: '1rem', maxWidth: '30ch' }}>{capabilitiesIntro.title}</h1>
            {capabilitiesIntro.body.map((p) => (
              <p key={p} style={{ marginTop: '1.1rem', maxWidth: '62ch' }}>
                {p}
              </p>
            ))}
          </Container>
        </section>

        {/* CORE CAPABILITIES */}
        {coreCapabilities.map((cap, i) => (
          <section
            className="section capability-block"
            id={cap.slug}
            key={cap.slug}
            style={{ '--capability-accent': cap.accent, scrollMarginTop: '6rem' }}
          >
            <Container>
              <div className={`capability-block__grid${i % 2 === 1 ? ' is-reversed' : ''}`}>
                <div className="capability-block__copy">
                  <SectionLabel>{cap.name}</SectionLabel>
                  <h2 style={{ marginTop: '0.75rem' }}>{cap.title}</h2>
                  <p style={{ marginTop: '1rem', maxWidth: '58ch' }}>{cap.description}</p>

                  <div className="capability-block__tags">
                    {cap.whatWeDo.map((item) => (
                      <span key={item} className="capability-block__tag">
                        {item}
                      </span>
                    ))}
                  </div>

                  <p className="capability-block__why">
                    <strong>Why it matters — </strong>
                    {cap.whyItMatters}
                  </p>
                  <p className="capability-block__for">
                    <strong>Best for — </strong>
                    {cap.bestFor.join(', ')}
                  </p>
                </div>

                <div className="capability-block__stage">
                  <CrystalScene accent={cap.accent} />
                </div>
              </div>
            </Container>
          </section>
        ))}

        <hr className="divider" />

        {/* HOW CAPABILITIES WORK TOGETHER */}
        <section className="section capabilities-together">
          <Container>
            <SectionLabel>In Practice</SectionLabel>
            <h2 style={{ marginTop: '1rem' }}>How Our Capabilities Work Together</h2>

            <motion.div
              className="capabilities-together__grid"
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {capabilityExamples.map((example) => (
                <motion.div className="capabilities-together__card" key={example.name} variants={fadeUp}>
                  <h3>{example.name}</h3>
                  <p>{example.steps.join(' → ')}</p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* BY BUSINESS STAGE */}
        <section className="section capabilities-stages">
          <Container>
            <SectionLabel>Where You Are</SectionLabel>
            <h2 style={{ marginTop: '1rem' }}>Capabilities by Business Stage</h2>

            <motion.div
              className="capabilities-stages__grid"
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {businessStages.map((stage) => (
                <motion.div className="capabilities-stages__card" key={stage.stage} variants={fadeUp}>
                  <h3>{stage.stage}</h3>
                  <p>{stage.description}</p>
                  <span className="capabilities-stages__focus">{stage.focus}</span>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* TEAM */}
        <section className="section capabilities-team">
          <Container>
            <SectionLabel>Behind the Work</SectionLabel>
            <h2 style={{ marginTop: '1rem' }}>The People Behind the Work</h2>

            <div className="capabilities-team__grid">
              {teamDisciplines.map((group) => (
                <div className="capabilities-team__card" key={group.group}>
                  <h3>{group.group}</h3>
                  <p>{group.roles.join(', ')}</p>
                </div>
              ))}
            </div>

            <Button href={talkCTA.href} variant="primary" style={{ marginTop: '2.5rem' }}>
              {talkCTA.label}
            </Button>
          </Container>
        </section>
      </div>
    </div>
  )
}
