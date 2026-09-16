import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Container from '../../components/common/Container'
import SectionLabel from '../../components/common/SectionLabel'
import Button from '../../components/common/Button'
import { industries } from '../../data/industries'
import { solutions } from '../../data/solutions'
import { talkCTA } from '../../data/navigation'
import { fmcgExpoBackLink } from '../../data/fmcgExpo'
import './IndustryDetail.css'

export default function IndustryDetail() {
  const { slug } = useParams()
  const industry = industries.find((i) => i.slug === slug)
  const [imageFailed, setImageFailed] = useState(false)

  if (!industry) return <Navigate to="/industries" replace />

  const related = industries.filter((i) => i.slug !== slug && i.cohort === industry.cohort).slice(0, 4)
  const fallbackRelated = industries.filter((i) => i.slug !== slug).slice(0, 4)
  const relatedIndustries = related.length ? related : fallbackRelated
  const imageSrc = `/images/industries/${industry.slug}.jpg`

  return (
    <div className="industry-detail" style={{ '--industry-accent': industry.accent }}>
      {/* CAMPAIGN BANNER — FMCG only, while the expo is active */}
      {industry.slug === 'fmcg' && (
        <Link to={fmcgExpoBackLink.href} className="industry-detail__expo-banner">
          <span className="eyebrow">FMCG Biz Connect Expo 2026 · 26–28 September · Raipur</span>
          <span className="industry-detail__expo-banner-link">{fmcgExpoBackLink.label}</span>
        </Link>
      )}

      {/* HERO */}
      <section className="section industry-hero">
        <Container>
          <div className="industry-hero__grid">
            <div className="industry-hero__copy">
              <SectionLabel>{`${industry.id} — ${industry.subtitle}`}</SectionLabel>
              <h1>{industry.name}</h1>
              <p className="industry-hero__tension">{industry.tension}</p>
              <p className="industry-hero__focus">{industry.focus}</p>
              <div className="industry-hero__actions">
                <Button href={talkCTA.href} variant="primary">
                  {talkCTA.label}
                </Button>
                <Button to="/industries" variant="ghost">
                  ← All Industries
                </Button>
              </div>
            </div>

            <div className="industry-hero__stage">
              {!imageFailed ? (
                <img
                  src={imageSrc}
                  alt={`${industry.name} — illustrated by Trinova Business`}
                  loading="lazy"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="industry-hero__stage-fallback">
                  <span>{industry.id}</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* WHAT MAKES IT DIFFERENT */}
      <section className="section industry-different">
        <Container>
          <SectionLabel>What Makes This Different</SectionLabel>
          <h2 style={{ marginTop: '1rem', maxWidth: '48ch' }}>
            Before Recommending Anything, We Look at How {industry.name} Actually Works.
          </h2>
          <p style={{ marginTop: '1.1rem', maxWidth: '62ch' }}>
            A restaurant doesn't market like a manufacturer. A school doesn't build a brand like an FMCG company.
            We start with how {industry.name.toLowerCase()} businesses actually operate — who the audience is, what
            the buying decision looks like, and what already exists in the market around them.
          </p>

          <div className="industry-different__deliverable">
            <span className="eyebrow">What We Aim For</span>
            <p>{industry.deliverable}</p>
          </div>
        </Container>
      </section>

      {/* HOW WE CAN HELP */}
      <section className="section industry-solutions">
        <Container>
          <SectionLabel>How We Can Help</SectionLabel>
          <h2 style={{ marginTop: '1rem' }}>The Right Combination for {industry.name}</h2>

          <div className="industry-solutions__grid">
            {solutions.map((solution) => (
              <Link to={`/solutions/${solution.slug}`} className="industry-solutions__card" key={solution.slug}>
                <span className="eyebrow">{solution.number}</span>
                <h3>{solution.name}</h3>
                <p>{solution.shortDescription}</p>
                <span className="industry-solutions__link">Explore →</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* RELATED INDUSTRIES */}
      <section className="section industry-related">
        <Container>
          <SectionLabel>Related Industries</SectionLabel>
          <ul className="industry-related__list">
            {relatedIndustries.map((item) => (
              <li key={item.slug}>
                <Link to={`/industries/${item.slug}`}>
                  <span className="industry-related__id">{item.id}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <Button href={talkCTA.href} variant="primary" style={{ marginTop: '2.5rem' }}>
            {talkCTA.label}
          </Button>
        </Container>
      </section>
    </div>
  )
}
