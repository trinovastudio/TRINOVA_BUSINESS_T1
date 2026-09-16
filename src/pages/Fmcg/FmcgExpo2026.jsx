import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Container from '../../components/common/Container'
import SectionLabel from '../../components/common/SectionLabel'
import Button from '../../components/common/Button'
import ScrollSpine from '../../components/common/ScrollSpine/ScrollSpine'
import CrystalScene from '../../components/sections/Solutions/CrystalScene'
import EventStatusBar from './EventStatusBar'
import BrandAuditTool from './BrandAuditTool'
import BookingForm from './BookingForm'
import CantAttendForm from './CantAttendForm'
import { fadeUp, staggerContainer } from '../../utils/animations'
import { industries } from '../../data/industries'
import { SITE_URL } from '../../utils/constants'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'
import {
  expoEvent,
  heroCopy,
  quickActions,
  aboutStall,
  opportunity,
  whatWeDo,
  whyTrinova,
  chhattisgarh,
  experience,
  brandAudit,
  whoShouldVisit,
  bigIdea,
  booking,
  cantAttend,
  finalClosing,
  fmcgIndustryLink,
  seo,
} from '../../data/fmcgExpo'
import './FmcgExpo2026.css'

const fmcgIndustry = industries.find((i) => i.slug === 'fmcg')
const accent = fmcgIndustry?.accent || '#a855f7'

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function FmcgExpo2026() {
  const heroRef = useRef(null)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

  useDocumentMeta({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: seo.path,
    jsonLd: buildJsonLd(),
  })

  useEffect(() => {
    const el = heroRef.current
    if (!el) return undefined
    const io = new IntersectionObserver(([entry]) => setShowFloatingCTA(!entry.isIntersecting), {
      rootMargin: '-64px 0px 0px 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="fmcg-expo" style={{ '--fmcg-accent': accent }}>
      <EventStatusBar onBookClick={() => scrollToId('booking')} />

      {/* HERO */}
      <section className="section fmcg-expo__hero" ref={heroRef}>
        <Container>
          <div className="fmcg-expo__hero-grid">
            <div className="fmcg-expo__hero-copy">
              <SectionLabel>{heroCopy.eyebrow}</SectionLabel>
              <h1 className="fmcg-expo__h1">{heroCopy.title}</h1>
              <p className="fmcg-expo__hero-subtitle">{heroCopy.subtitle}</p>
              <p className="fmcg-expo__hero-body">{heroCopy.body}</p>

              <div className="fmcg-expo__coords">
                <span>{expoEvent.dateRange}</span>
                <span className="fmcg-expo__coords-dot" />
                <span>{expoEvent.venue}</span>
                <span className="fmcg-expo__coords-dot" />
                <span className="fmcg-expo__coords-stall">{expoEvent.stall}</span>
              </div>

              <div className="fmcg-expo__hero-actions">
                <Button variant="primary" onClick={() => scrollToId('booking')}>
                  {heroCopy.primaryCTA}
                </Button>
                <Button variant="ghost" onClick={() => scrollToId('about-the-stall')}>
                  {heroCopy.secondaryCTA}
                </Button>
              </div>
            </div>

            <div className="fmcg-expo__hero-stage">
              <CrystalScene accent={accent} color="#d0bcff" />
            </div>
          </div>

          {/* Quick actions */}
          <div className="fmcg-expo__quick-actions">
            {quickActions.map((action) => (
              <button
                type="button"
                key={action.label}
                className="fmcg-expo__quick-action"
                onClick={() => scrollToId(action.href.replace('#', ''))}
              >
                <span className="fmcg-expo__quick-action-label">{action.label}</span>
                <span className="fmcg-expo__quick-action-desc">{action.description}</span>
                <span className="fmcg-expo__quick-action-arrow">→</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ABOUT THE STALL */}
      <section className="section fmcg-expo__section" id="about-the-stall">
        <Container>
          <div className="fmcg-expo__about-grid">
            <div className="fmcg-expo__about-copy">
              <SectionLabel>{aboutStall.eyebrow}</SectionLabel>
              <h2 className="fmcg-expo__h2">{aboutStall.title}</h2>
              <p className="fmcg-expo__lead">{aboutStall.lead}</p>
              {aboutStall.paragraphs.map((p) => (
                <p key={p} className="fmcg-expo__body-text">
                  {p}
                </p>
              ))}
              <div className="fmcg-expo__coords fmcg-expo__coords--stacked">
                <span>{expoEvent.dateRange}</span>
                <span>{expoEvent.venueFull}</span>
                <span className="fmcg-expo__coords-stall">{expoEvent.stall}</span>
              </div>
              <Button variant="primary" onClick={() => scrollToId('booking')}>
                {aboutStall.cta}
              </Button>
              <p className="fmcg-expo__note">{aboutStall.note}</p>
            </div>

            <div className="fmcg-expo__meeting-card" aria-hidden="true">
              <div className="fmcg-expo__meeting-card-row">
                <span className="fmcg-expo__meeting-dot" />
                <span>Your Brand</span>
              </div>
              <div className="fmcg-expo__meeting-card-line" />
              <div className="fmcg-expo__meeting-card-row">
                <span className="fmcg-expo__meeting-dot fmcg-expo__meeting-dot--accent" />
                <span>Trinova Team</span>
              </div>
              <div className="fmcg-expo__meeting-card-footer">
                <span>40-min conversation</span>
                <span>{expoEvent.stall}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* THE OPPORTUNITY — journey spine */}
      <section className="section fmcg-expo__section fmcg-expo__section--raised" id="opportunity" style={{ position: 'relative' }}>
        <ScrollSpine segments={opportunity.journey.length} color={accent} />
        <Container>
          <div className="fmcg-expo__section-head">
            <SectionLabel>{opportunity.eyebrow}</SectionLabel>
            <h2 className="fmcg-expo__h2">{opportunity.title}</h2>
            {opportunity.lines.map((line) => (
              <p key={line} className="fmcg-expo__lead">
                {line}
              </p>
            ))}
            <p className="fmcg-expo__body-text">{opportunity.body}</p>
          </div>

          <div className="fmcg-expo__journey">
            {opportunity.journey.map((step, i) => (
              <motion.div
                className="fmcg-expo__journey-step"
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="fmcg-expo__journey-number">{String(i + 1).padStart(2, '0')}</span>
                <span className="fmcg-expo__journey-name">{step}</span>
                <span className="fmcg-expo__journey-desc">{opportunity.journeyDescriptions[step]}</span>
              </motion.div>
            ))}
          </div>

          <p className="fmcg-expo__positioning">{opportunity.positioning}</p>
        </Container>
      </section>

      {/* WHAT WE DO */}
      <section className="section fmcg-expo__section" id="what-we-do">
        <Container>
          <div className="fmcg-expo__section-head">
            <SectionLabel>{whatWeDo.eyebrow}</SectionLabel>
            <h2 className="fmcg-expo__h2">{whatWeDo.title}</h2>
          </div>

          <motion.div
            className="fmcg-expo__pillars"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {whatWeDo.pillars.map((pillar) => (
              <motion.div className="fmcg-expo__pillar" key={pillar.number} variants={fadeUp}>
                <span className="fmcg-expo__pillar-number">{pillar.number}</span>
                <h3>{pillar.name}</h3>
                <p>{pillar.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* WHY TRINOVA */}
      <section className="section fmcg-expo__section fmcg-expo__section--raised" id="why-trinova">
        <Container>
          <div className="fmcg-expo__why-grid">
            <div>
              <SectionLabel>{whyTrinova.eyebrow}</SectionLabel>
              <h2 className="fmcg-expo__h2">{whyTrinova.title}</h2>
            </div>
            <div>
              {whyTrinova.paragraphs.map((p) => (
                <p key={p} className="fmcg-expo__body-text">
                  {p}
                </p>
              ))}
              <p className="fmcg-expo__positioning fmcg-expo__positioning--left">{whyTrinova.closing}</p>
              <div className="fmcg-expo__chips">
                {whyTrinova.disciplines.map((d) => (
                  <span className="fmcg-expo__chip" key={d}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CHHATTISGARH */}
      <section className="section fmcg-expo__section" id="chhattisgarh">
        <Container>
          <div className="fmcg-expo__section-head">
            <SectionLabel>{chhattisgarh.eyebrow}</SectionLabel>
            <h2 className="fmcg-expo__h2">{chhattisgarh.title}</h2>
          </div>
          <div className="fmcg-expo__chhattisgarh-grid">
            <div>
              {chhattisgarh.paragraphs.map((p) => (
                <p key={p} className="fmcg-expo__body-text">
                  {p}
                </p>
              ))}
              <p className="fmcg-expo__positioning fmcg-expo__positioning--left">{chhattisgarh.closing}</p>
            </div>
            <div className="fmcg-expo__path">
              {chhattisgarh.path.map((step, i) => (
                <div className="fmcg-expo__path-step" key={step}>
                  <span className="fmcg-expo__path-dot" />
                  <span>{step}</span>
                  {i < chhattisgarh.path.length - 1 && <span className="fmcg-expo__path-arrow">→</span>}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* EXPERIENCE & APPROACH */}
      <section className="section fmcg-expo__section fmcg-expo__section--raised" id="experience">
        <Container>
          <div className="fmcg-expo__experience">
            <SectionLabel>{experience.eyebrow}</SectionLabel>
            <h2 className="fmcg-expo__h2">{experience.title}</h2>
            {experience.paragraphs.map((p) => (
              <p key={p} className="fmcg-expo__body-text">
                {p}
              </p>
            ))}
            <p className="fmcg-expo__positioning fmcg-expo__positioning--left">{experience.closing}</p>
          </div>
        </Container>
      </section>

      {/* FREE BRAND AUDIT */}
      <section className="section fmcg-expo__section" id="brand-audit">
        <Container>
          <div className="fmcg-expo__section-head fmcg-expo__section-head--center">
            <SectionLabel>{brandAudit.eyebrow}</SectionLabel>
            <h2 className="fmcg-expo__h2">{brandAudit.title}</h2>
            <p className="fmcg-expo__lead">{brandAudit.subtitle}</p>
            <p className="fmcg-expo__body-text">{brandAudit.intro}</p>
          </div>
          <BrandAuditTool onBookClick={() => scrollToId('booking')} />
        </Container>
      </section>

      {/* WHO SHOULD VISIT */}
      <section className="section fmcg-expo__section fmcg-expo__section--raised" id="who-should-visit">
        <Container>
          <div className="fmcg-expo__section-head">
            <SectionLabel>{whoShouldVisit.eyebrow}</SectionLabel>
            <h2 className="fmcg-expo__h2">{whoShouldVisit.title}</h2>
          </div>
          <WhoShouldVisit onBookClick={() => scrollToId('booking')} />
        </Container>
      </section>

      {/* THE BIG IDEA */}
      <section className="section fmcg-expo__big-idea" id="big-idea">
        <Container>
          <div className="fmcg-expo__big-idea-inner">
            <SectionLabel>{bigIdea.eyebrow}</SectionLabel>
            <h2 className="fmcg-expo__h2 fmcg-expo__h2--display">{bigIdea.title}</h2>
            {bigIdea.paragraphs.map((p) => (
              <p key={p} className="fmcg-expo__lead">
                {p}
              </p>
            ))}
            <p className="fmcg-expo__positioning">{bigIdea.positioning}</p>
            <p className="fmcg-expo__body-text">{bigIdea.closing}</p>

            <div className="fmcg-expo__bigidea-transition" aria-hidden="true">
              <span className="fmcg-expo__bigidea-local">Local</span>
              <span className="fmcg-expo__bigidea-line" />
              <span className="fmcg-expo__bigidea-wide">Wider Markets</span>
            </div>
          </div>
        </Container>
      </section>

      {/* BOOKING */}
      <section className="section fmcg-expo__section fmcg-expo__booking" id="booking">
        <Container>
          <div className="fmcg-expo__section-head fmcg-expo__section-head--center">
            <SectionLabel>{booking.eyebrow}</SectionLabel>
            <h2 className="fmcg-expo__h2">{booking.title}</h2>
            <p className="fmcg-expo__lead">{booking.supporting}</p>
            <p className="fmcg-expo__body-text">
              {booking.subtitle} {booking.body}
            </p>
          </div>
          <div className="fmcg-expo__booking-card">
            <BookingForm />
          </div>
        </Container>
      </section>

      {/* CROSS-LINK TO FMCG INDUSTRY PAGE */}
      <section className="section fmcg-expo__crosslink">
        <Container>
          <Link to={fmcgIndustryLink.href} className="fmcg-expo__crosslink-card">
            <div>
              <span className="eyebrow">Beyond the Expo</span>
              <h3>Our Ongoing Work With FMCG &amp; Consumer Goods Brands</h3>
              <p>{fmcgIndustry?.tension}</p>
            </div>
            <span className="fmcg-expo__crosslink-arrow">{fmcgIndustryLink.label}</span>
          </Link>
        </Container>
      </section>

      {/* FINAL CLOSING */}
      <section className="section fmcg-expo__final">
        <Container>
          <div className="fmcg-expo__final-inner">
            <h2 className="fmcg-expo__h2 fmcg-expo__h2--display">{finalClosing.title}</h2>
            <h2 className="fmcg-expo__h2 fmcg-expo__h2--display fmcg-expo__h2--accent">{finalClosing.subtitle}</h2>
            <p className="fmcg-expo__lead">{finalClosing.body}</p>
            <div className="fmcg-expo__final-actions">
              <Button variant="primary" onClick={() => scrollToId('brand-audit')}>
                {finalClosing.primaryCTA}
              </Button>
              <Button variant="ghost" onClick={() => scrollToId('booking')}>
                {finalClosing.secondaryCTA}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* CAN'T ATTEND */}
      <section className="section fmcg-expo__section fmcg-expo__section--raised" id="cant-attend">
        <Container>
          <div className="fmcg-expo__cant-attend">
            <div>
              <SectionLabel>{cantAttend.eyebrow}</SectionLabel>
              <h2 className="fmcg-expo__h2">{cantAttend.title}</h2>
              <p className="fmcg-expo__body-text">{cantAttend.body}</p>
            </div>
            <CantAttendForm />
          </div>
        </Container>
      </section>

      {/* Floating mobile-accessible booking CTA */}
      <div className={`fmcg-expo__floating-cta${showFloatingCTA ? ' is-visible' : ''}`}>
        <button type="button" onClick={() => scrollToId('booking')}>
          {heroCopy.primaryCTA}
        </button>
      </div>
    </div>
  )
}

function WhoShouldVisit({ onBookClick }) {
  const [selected, setSelected] = useState(null)
  const options = whoShouldVisit.segments

  return (
    <div className="fmcg-expo__segments">
      <div className="fmcg-expo__segments-list">
        {options.map((opt, i) => (
          <button
            type="button"
            key={opt.label}
            className={`fmcg-expo__segment${selected === i ? ' is-selected' : ''}`}
            onClick={() => setSelected(i)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="fmcg-expo__segment-response">
          <p>{options[selected].response}</p>
          <button type="button" className="btn btn-primary" onClick={onBookClick}>
            {whoShouldVisit.closing}
          </button>
        </div>
      )}
    </div>
  )
}

function buildJsonLd() {
  const url = `${SITE_URL.replace(/\/$/, '')}${seo.path}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Event',
        name: `${expoEvent.name} — Trinova Business at ${expoEvent.stall}`,
        startDate: expoEvent.startISO,
        endDate: expoEvent.endISO,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: expoEvent.venue,
          address: {
            '@type': 'PostalAddress',
            streetAddress: expoEvent.venueFull,
            addressLocality: expoEvent.city,
            addressRegion: expoEvent.region,
            addressCountry: 'IN',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'Trinova Business',
          url: SITE_URL,
        },
        description: seo.description,
        url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trinova Business', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'FMCG & Consumer Goods', item: `${SITE_URL}/industries/fmcg` },
          { '@type': 'ListItem', position: 3, name: 'FMCG Expo 2026', item: url },
        ],
      },
    ],
  }
}
