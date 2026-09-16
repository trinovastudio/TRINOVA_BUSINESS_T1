import { useState } from 'react'
import Container from '../../components/common/Container'
import Button from '../../components/common/Button'
import ScrollBurnText from '../../components/common/ScrollBurnText/ScrollBurnText'
import { ecosystemDivisions } from '../../data/ecosystem'
import { talkCTA, footerCopy } from '../../data/navigation'
import './About.css'

const burnSections = [
  "Trinova Business helps businesses navigate those changes.",
  "We bring together branding, business consultancy, marketing, and IT consultancy to help organisations understand where they are, decide where they want to go, and build what they need to get there.",
  "We work between strategy and execution.",
]

const introLead = 'We Help Businesses Find Their Direction.'

const introBody =
  "Businesses change. They grow, enter new markets, launch new products, adopt new technology, change their customers, and sometimes realise that the way they operate today isn't the way they need to operate tomorrow."

const whyWeExist =
  "A good product doesn't automatically create a strong brand. A strong brand doesn't automatically create growth. More marketing doesn't automatically mean more customers. And new technology doesn't automatically make a business better. Sometimes the real problem is simply that the pieces aren't working together — that's where we come in."

const beliefs = [
  { title: 'Start With the Business', body: 'The business comes before the deliverable. We want to understand why something is needed before we design, build, or recommend it.' },
  { title: 'Clarity Before Complexity', body: "Complexity isn't the same as sophistication. If something can be made simpler without losing what matters, we prefer the simpler answer." },
  { title: 'Strategy Should Lead Execution', body: 'Good execution is important. But execution without direction can simply make the wrong thing happen faster.' },
  { title: 'Listen Before Advising', body: 'You know the business. We bring an outside perspective, research, experience, and specialised capabilities. The best work comes from putting those things together.' },
  { title: 'Build for the Long Term', body: "We don't want to create something that only works for the launch. Brands, systems, strategies, and businesses need room to evolve." },
]

const stages = [
  { name: 'Starting', tag: 'You have an idea', body: 'You have an idea and need to turn it into something people can understand. We can help with strategy, research, positioning, naming, branding, product thinking, and go-to-market planning.' },
  { name: 'Building', tag: 'The business exists', body: "The business exists and you're building its presence. We can help with branding, digital presence, marketing, customer strategy, and technology." },
  { name: 'Growing', tag: 'The business is established', body: "The business is established and you're looking for the next stage. We can help with growth strategy, market expansion, marketing, customer acquisition, technology, and optimisation." },
  { name: 'Repositioning', tag: 'Something has changed', body: "The business, customers, or market has changed, or your existing brand no longer represents where you're going. We can help understand what needs to change and what should remain." },
]

const metrics = [
  {
    label: 'Working Principles',
    value: `${beliefs.length} We Hold To`,
    body: 'From starting with the business to building for the long term — the standards behind every recommendation we make.',
  },
  {
    label: 'Engagement Stages',
    value: `${stages.length} Ways We Meet You`,
    body: 'Starting, building, growing, or repositioning — we adapt to where a business actually is today.',
  },
  {
    label: 'Trinova Ecosystem',
    value: `${ecosystemDivisions.length} Sister Divisions`,
    body: 'Business, Studio, and Production — working independently, and together when a project calls for it.',
  },
]

const ourPromise =
  "We won't pretend every problem is easy, or that every solution needs technology, or that every business needs a rebrand. We'll ask questions, research, challenge assumptions when necessary, explain our thinking, and work with you to find a practical way forward."

export default function About() {
  const [openStage, setOpenStage] = useState(0)

  return (
    <div className="about-mono-page">
      <ScrollBurnText sections={burnSections} />

      <div className="about-mono">
        {/* 01 — WHO WE ARE */}
        <section className="about-mono__section" id="who-we-are">
          <Container>
            <div className="about-mono__grid">
              <div className="about-mono__label-col">
                <div className="about-mono__eyebrow-row">
                  <span className="about-mono__eyebrow">Vector Index</span>
                  <span className="about-mono__index">// 01</span>
                </div>
                <h2 className="about-mono__h2">Who We Are</h2>
                <div className="about-mono__rule" />
              </div>

              <div className="about-mono__lead-col">
                <p className="about-mono__lead-strong">{introLead}</p>
                <p className="about-mono__lead">{introBody}</p>
                <p className="about-mono__body">{whyWeExist}</p>

                <div className="about-mono__metrics">
                  {metrics.map((metric) => (
                    <div className="about-mono__metric-card" key={metric.label}>
                      <span className="about-mono__metric-label">{metric.label}</span>
                      <span className="about-mono__metric-value">{metric.value}</span>
                      <p className="about-mono__metric-body">{metric.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 02 — HOW WE THINK */}
        <section className="about-mono__section about-mono__section--raised" id="how-we-think">
          <Container>
            <div className="about-mono__section-head">
              <div className="about-mono__eyebrow-row">
                <span className="about-mono__eyebrow">Doctrine &amp; Operating Values</span>
                <span className="about-mono__index">// 02</span>
              </div>
              <h2 className="about-mono__h2">How We Think</h2>
              <p className="about-mono__section-lead">
                Clear thinking. Honest recommendations. No unnecessary complexity.
              </p>
            </div>

            <div className="about-mono__tenets">
              {beliefs.map((belief, i) => (
                <div className="about-mono__tenet-card" key={belief.title}>
                  <span className="about-mono__tenet-tag">Tenet {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="about-mono__tenet-title">{belief.title}</h3>
                  <p className="about-mono__tenet-body">{belief.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 03 — HOW WE WORK WITH BUSINESSES */}
        <section className="about-mono__section" id="how-we-work-with-businesses">
          <Container>
            <div className="about-mono__section-head">
              <div className="about-mono__eyebrow-row">
                <span className="about-mono__eyebrow">Engagement Sequence</span>
                <span className="about-mono__index">// 03</span>
              </div>
              <h2 className="about-mono__h2">How We Work With Businesses</h2>
              <p className="about-mono__section-lead">
                Every business we work with is somewhere on this line. We meet you where you are.
              </p>
            </div>

            <div className="about-mono__accordion">
              {stages.map((stage, i) => {
                const isOpen = openStage === i
                return (
                  <div className={`about-mono__acc-item${isOpen ? ' is-open' : ''}`} key={stage.name}>
                    <button
                      type="button"
                      className="about-mono__acc-trigger"
                      aria-expanded={isOpen}
                      onClick={() => setOpenStage(isOpen ? null : i)}
                    >
                      <span className="about-mono__acc-trigger-left">
                        <span className="about-mono__acc-number">{String(i + 1).padStart(2, '0')} //</span>
                        <span className="about-mono__acc-name">{stage.name}</span>
                      </span>
                      <span className="about-mono__acc-trigger-right">
                        <span className="about-mono__acc-tag">{stage.tag}</span>
                        <svg
                          className="about-mono__acc-chevron"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    <div className="about-mono__acc-content" hidden={!isOpen}>
                      <p>{stage.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Container>
        </section>

        {/* 04 — THE TRINOVA ECOSYSTEM */}
        <section className="about-mono__section about-mono__section--raised" id="ecosystem">
          <Container>
            <div className="about-mono__section-head">
              <div className="about-mono__eyebrow-row">
                <span className="about-mono__eyebrow">Integrated Structure</span>
                <span className="about-mono__index">// 04</span>
              </div>
              <h2 className="about-mono__h2">Part of Something Bigger</h2>
              <p className="about-mono__section-lead">
                Trinova Business is part of the wider Trinova Private Limited ecosystem, bringing together
                business, technology, gaming, and creative production.
              </p>
            </div>

            <div className="about-mono__nodes">
              {ecosystemDivisions.map((division, i) => (
                <div className="about-mono__node-card" key={division.slug}>
                  <div className="about-mono__node-top">
                    <span className="about-mono__node-tag">Node {String(i + 1).padStart(2, '0')}</span>
                    {division.current ? <span className="about-mono__node-badge">You Are Here</span> : null}
                  </div>
                  <h3 className="about-mono__node-name">{division.name}</h3>
                  <p className="about-mono__node-tagline">{division.tagline}</p>
                  <p className="about-mono__node-desc">{division.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 05 — OUR PRINCIPLE / CONCLUSION */}
        <section className="about-mono__final">
          <Container>
            <div className="about-mono__cta">
              <div className="about-mono__eyebrow-row about-mono__eyebrow-row--center">
                <span className="about-mono__eyebrow">Governing Ethos</span>
                <span className="about-mono__index">// 05</span>
              </div>
              <h2 className="about-mono__cta-quote">&ldquo;Clarity Before Complexity.&rdquo;</h2>
              <p className="about-mono__cta-body">{ourPromise}</p>

              <div className="about-mono__cta-locations">
                {footerCopy.locations.join(' · ')} — {footerCopy.parentCompany}
              </div>

              <div className="about-mono__cta-actions">
                <Button href={talkCTA.href} variant="primary">
                  {talkCTA.label}
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </div>
  )
}
