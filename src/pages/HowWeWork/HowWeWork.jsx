import { useRef } from 'react'
import { motion } from 'motion/react'
import Container from '../../components/common/Container'
import Button from '../../components/common/Button'
import HowStepsSpine from './HowStepsSpine'
import MethodologyNav from './MethodologyNav'
import { fadeUp, staggerContainer } from '../../utils/animations'
import { talkCTA } from '../../data/navigation'
import './HowWeWork.css'

const steps = [
  {
    name: 'Understand',
    tag: '01 // DISCOVERY',
    quote: 'Where are you now?',
    focusLine: 'Baseline diagnosis · Friction audit · Stakeholder alignment',
    note: "The clearer the starting picture, the fewer wrong turns later.",
    headline: 'Understanding the Business Before the Solution.',
    body: "We start by understanding your business — what you do, how it operates, what you're trying to achieve, who your customers are, and where you are today.",
    stats: [
      { label: 'TIMEFRAME', value: 'Weeks 1–2' },
      { label: 'FOCUS', value: 'Listening First' },
    ],
    deliverables: [
      { title: 'Discovery Summary', team: 'Strategy' },
      { title: 'Friction Point Map', team: 'Strategy' },
    ],
  },
  {
    name: 'Research',
    tag: '02 // MARKET',
    quote: 'What does the market actually show?',
    focusLine: 'Audience mapping · Competitive research · Category context',
    note: 'Assumptions are expensive. Evidence is cheap by comparison.',
    headline: 'Grounding Decisions in the Market, Not Assumptions.',
    body: 'We research the market, competitors, customers, industry, and relevant trends to understand the environment in which the business operates.',
    stats: [
      { label: 'TIMEFRAME', value: 'Weeks 2–3' },
      { label: 'FOCUS', value: 'Evidence Over Opinion' },
    ],
    deliverables: [
      { title: 'Market & Competitor Review', team: 'Strategy' },
      { title: 'Audience Notes', team: 'Marketing' },
    ],
  },
  {
    name: 'Define',
    tag: '03 // DIRECTION',
    quote: 'What is the right direction?',
    focusLine: 'Synthesis · Prioritisation · Clear direction',
    note: "Strategy is also the decision of what not to do.",
    headline: 'Turning Information Into a Clear Direction.',
    body: "We bring together what we've learned and define the direction the project needs to take — and sometimes, what doesn't need to be done.",
    stats: [
      { label: 'TIMEFRAME', value: 'Weeks 3–4' },
      { label: 'FOCUS', value: 'Direction, Not Guesswork' },
    ],
    deliverables: [
      { title: 'Strategic Brief', team: 'Strategy' },
      { title: 'Scope Definition', team: 'Project Management' },
    ],
  },
  {
    name: 'Build',
    tag: '04 // EXECUTION',
    quote: 'What does this actually look like?',
    focusLine: 'Brand identity · Website · Campaign · Product',
    note: 'Plans remain theory until translated into something real.',
    headline: 'Making the Strategy Real.',
    body: 'Once the direction is clear, we start creating — a brand identity, a website, a campaign, a digital product, or whatever the business actually needs.',
    stats: [
      { label: 'CADENCE', value: 'Milestone Sprints' },
      { label: 'FOCUS', value: 'Making It Real' },
    ],
    deliverables: [
      { title: 'Creative or Technical Assets', team: 'Creative' },
      { title: 'Working Build', team: 'Technology' },
    ],
  },
  {
    name: 'Launch',
    tag: '05 // RELEASE',
    quote: 'Is this ready for the real world?',
    focusLine: 'Rollout planning · Handover · Coordination',
    note: "A project isn't finished when the files are delivered.",
    headline: 'Bringing the Work Into the Real World.',
    body: "A project isn't finished when the files are delivered. We help make sure the transition from planning to implementation is clear and organised.",
    stats: [
      { label: 'FOCUS', value: 'Organised Handoff' },
      { label: 'CADENCE', value: 'Coordinated Rollout' },
    ],
    deliverables: [
      { title: 'Launch Plan', team: 'Project Management' },
      { title: 'Handover Notes', team: 'Project Management' },
    ],
  },
  {
    name: 'Measure',
    tag: '06 // SIGNAL',
    quote: 'What is actually happening?',
    focusLine: 'Traffic · Leads · Conversions · Engagement',
    note: 'Opinions about performance are no substitute for the data.',
    headline: 'Learning What Actually Happened.',
    body: "Once something is live, we look at measurable signals — traffic, leads, conversions, engagement — to understand what is working and what isn't.",
    stats: [
      { label: 'FOCUS', value: 'What Actually Happened' },
      { label: 'CADENCE', value: 'Ongoing Review' },
    ],
    deliverables: [
      { title: 'Performance Review', team: 'Marketing' },
      { title: 'Signal Summary', team: 'Technology' },
    ],
  },
  {
    name: 'Improve',
    tag: '07 // ITERATION',
    quote: "What should change next?",
    focusLine: 'Iteration · Optimisation · Next steps',
    note: 'Markets change. So should the plan.',
    headline: 'Using What We Learn to Move Forward.',
    body: 'Markets, customers, and businesses change. We use what we learn to identify opportunities for improvement.',
    stats: [
      { label: 'FOCUS', value: 'Continuous Iteration' },
      { label: 'CADENCE', value: 'Recurring Cycles' },
    ],
    deliverables: [
      { title: 'Improvement Plan', team: 'Strategy' },
      { title: 'Next-Step Recommendations', team: 'Project Management' },
    ],
  },
]

const projectPatterns = [
  { name: 'New Brand', steps: ['Understand', 'Research', 'Position', 'Name', 'Identity', 'Apply', 'Launch'] },
  { name: 'Growing Business', steps: ['Understand', 'Analyse', 'Strategy', 'Brand', 'Marketing', 'Measure', 'Improve'] },
  { name: 'Digital Transformation', steps: ['Understand', 'Analyse', 'Map Processes', 'Define Requirements', 'Technology Strategy', 'Implement', 'Improve'] },
  { name: 'New Product', steps: ['Research', 'Customer', 'Product Strategy', 'Positioning', 'Brand', 'Go-to-Market', 'Launch', 'Learn'] },
  { name: 'Rebranding', steps: ['Audit', 'Research', 'Position', 'Define', 'Design', 'Implement', 'Launch'] },
]

const workingPrinciples = [
  { title: 'Clear Scope', body: 'Everyone should understand what is being worked on and what is not.' },
  { title: 'Defined Responsibilities', body: 'The client and Trinova team should know who is responsible for what.' },
  { title: 'Regular Updates', body: 'Progress, questions, decisions, and blockers should be communicated clearly.' },
  { title: 'Review Stages', body: 'Important work is reviewed at defined stages rather than leaving everything until the end.' },
  { title: 'Documentation', body: 'Important decisions, requirements, and deliverables are documented so everyone stays aligned.' },
  { title: 'Feedback Cycles', body: 'Feedback is gathered at the right stage and incorporated into the work.' },
  { title: 'Milestone Delivery', body: 'Large projects are divided into manageable stages wherever practical.' },
  { title: 'Direct Communication', body: 'We prefer clear conversations over unnecessary layers of communication.' },
]

export default function HowWeWork() {
  const methodologyRef = useRef(null)

  return (
    <div className="how-methodology">
      {/* Ambient vector background grid */}
      <div className="how-methodology__ambient" aria-hidden="true">
        <div className="how-methodology__ambient-grid" />
        <span className="how-methodology__ambient-label how-methodology__ambient-label--left">REF. SYS // TRINOVA-METHOD</span>
        <span className="how-methodology__ambient-label how-methodology__ambient-label--right">AXIS // 12-COL ASYMMETRIC</span>
      </div>

      {/* Floating HUD coordinate navigator */}
      <MethodologyNav steps={steps} containerRef={methodologyRef} />

      {/* HERO */}
      <section className="how-methodology__hero">
        <Container>
          <div className="how-methodology__hero-inner">
            <div className="how-methodology__eyebrow-row">
              <span className="how-methodology__eyebrow">METHODOLOGY // TRINOVA ADVISORY VECTOR</span>
              <span className="how-methodology__status-pill">
                <span className="how-methodology__status-dot" />
                {steps.length} SEQUENTIAL STAGES · CONTINUOUS FLOW
              </span>
            </div>

            <h1 className="how-methodology__h1">
              HOW WE WORK<span className="how-methodology__h1-dot">.</span>
            </h1>

            <p className="how-methodology__lead">
              A single continuous line of reasoning. No arbitrary silos, no disconnected handoffs. We trace clarity
              from initial diagnosis to sustained improvement.
            </p>

            <div className="how-methodology__signals">
              <div className="how-methodology__signal">
                <span className="how-methodology__signal-label">APPROACH</span>
                <span className="how-methodology__signal-value">Continuous, Not Siloed</span>
              </div>
              <div className="how-methodology__signal-divider" />
              <div className="how-methodology__signal">
                <span className="how-methodology__signal-label">CADENCE</span>
                <span className="how-methodology__signal-value">Regular Check-Ins</span>
              </div>
              <div className="how-methodology__signal-divider" />
              <div className="how-methodology__signal">
                <span className="how-methodology__signal-label">STRUCTURE</span>
                <span className="how-methodology__signal-value">Clear Stages, Clear Owners</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CENTRAL CONTINUOUS VECTOR EXPERIENCE */}
      <div className="how-methodology__container" ref={methodologyRef}>
        <Container>
          <HowStepsSpine containerRef={methodologyRef} color="#6d28d9" midColor="#8b5cf6" trackColor="#e5e5ea" />

          <div className="how-methodology__stages">
            {steps.map((step, i) => {
              const isReversed = i % 2 === 1
              return (
                <motion.section
                  className={`how-step${isReversed ? ' is-reversed' : ''}`}
                  key={step.name}
                  id={step.name.toLowerCase()}
                  style={{ scrollMarginTop: '7rem' }}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Rich node presentation card */}
                  <div className="how-step__box">
                    <div className="how-step__box-top">
                      <span className="how-step__box-tag">{step.tag}</span>
                    </div>
                    <div className="how-step__box-heading">
                      <h2>{step.name}</h2>
                      <p className="how-step__box-quote">&ldquo;{step.quote}&rdquo;</p>
                    </div>
                    <p className="how-step__box-focus">{step.focusLine}</p>

                    <div className="how-step__inset">
                      <span className="how-step__inset-label">WHY IT MATTERS</span>
                      <p>{step.note}</p>
                    </div>

                    <div className="how-step__ledger">
                      {step.deliverables.map((item) => (
                        <div className="how-step__ledger-row" key={item.title}>
                          <span className="how-step__ledger-title">
                            <span className="how-step__ledger-bullet">—</span> {item.title}
                          </span>
                          <span className="how-step__ledger-team">{item.team.toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="how-step__node" aria-hidden="true">
                    <span className="how-step__node-dot" />
                    <span className="how-step__node-ping" />
                  </div>

                  {/* Descriptive metadata card */}
                  <div className="how-step__meta">
                    <span className="how-step__meta-badge">STEP {String(i + 1).padStart(2, '0')}.0</span>
                    <h3>{step.headline}</h3>
                    <p>{step.body}</p>
                    <div className="how-step__meta-stats">
                      {step.stats.map((stat) => (
                        <div className="how-step__meta-stat" key={stat.label}>
                          <span className="how-step__meta-stat-label">{stat.label}</span>
                          <span className="how-step__meta-stat-value">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.section>
              )
            })}
          </div>
        </Container>
      </div>

      {/* PROJECT PATTERNS */}
      <section className="how-methodology__section">
        <Container>
          <span className="how-methodology__section-label">Not a Rigid Checklist</span>
          <h2 className="how-methodology__section-h2">Not Every Project Looks the Same.</h2>
          <p className="how-methodology__section-lead">
            Because not every business has the same problem. Our process provides a framework, not a rigid
            checklist.
          </p>

          <motion.div
            className="how-methodology__patterns"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {projectPatterns.map((pattern) => (
              <motion.div className="how-methodology__pattern-card" key={pattern.name} variants={fadeUp}>
                <h3>{pattern.name}</h3>
                <p>{pattern.steps.join(' → ')}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* WORKING PRINCIPLES */}
      <section className="how-methodology__section how-methodology__section--raised">
        <Container>
          <span className="how-methodology__section-label">Working With Our Clients</span>
          <h2 className="how-methodology__section-h2">Good Work Also Depends on How People Work Together.</h2>
          <p className="how-methodology__section-lead">We aim to keep projects straightforward and transparent.</p>

          <motion.div
            className="how-methodology__principles"
            variants={staggerContainer(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {workingPrinciples.map((principle) => (
              <motion.div className="how-methodology__principle-card" key={principle.title} variants={fadeUp}>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* FINAL CONVERGENCE & CTA */}
      <section className="how-methodology__final">
        <Container>
          <div className="how-methodology__convergence">
            <span className="how-methodology__convergence-line" />
            <span className="how-methodology__convergence-node">
              <span className="how-methodology__convergence-node-inner">↓</span>
            </span>
            <span className="how-methodology__convergence-label">FINAL CONVERGENCE POINT</span>
          </div>

          <div className="how-methodology__cta">
            <span className="how-methodology__cta-badge">INITIATE ENGAGEMENT</span>
            <h2>
              Let&rsquo;s Figure It Out<span className="how-methodology__h1-dot">.</span>
            </h2>
            <p>Every engagement starts with clean-sheet evaluation. Let us trace your business's clearest path forward.</p>
            <div className="how-methodology__cta-actions">
              <Button href={talkCTA.href} variant="primary">
                {talkCTA.label}
              </Button>
              <Button to="/insights" variant="ghost">
                Explore Insights ↗
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
