import Container from '../../components/common/Container'
import SectionLabel from '../../components/common/SectionLabel'
import Button from '../../components/common/Button'
import IndustrySqueezeCarousel from '../../components/sections/Industries/IndustrySqueezeCarousel'
import { industriesIntro, industries } from '../../data/industries'
import { talkCTA } from '../../data/navigation'
import './IndustriesPage.css'

export default function IndustriesPage() {
  return (
    <div className="industries-page">
      <section className="section industries-hero">
        <Container>
          <SectionLabel>{industriesIntro.label}</SectionLabel>
          <h1 style={{ marginTop: '1rem', maxWidth: '26ch' }}>{industriesIntro.title}</h1>
          {industriesIntro.body.map((p) => (
            <p key={p} style={{ marginTop: '1.1rem', maxWidth: '62ch' }}>
              {p}
            </p>
          ))}
        </Container>
      </section>

      <section className="section industries-carousel-section" id="sectors">
        <Container>
          <SectionLabel>Sector Directory</SectionLabel>
          <h2 style={{ marginTop: '1rem' }}>{industries.length} Sectors. One Adaptive Approach.</h2>
          <p style={{ marginTop: '1.1rem', maxWidth: '62ch' }}>
            Filter by cohort or step through each sector below. Select one to see where it sits, then open it for
            the full picture.
          </p>

          <IndustrySqueezeCarousel industries={industries} />
        </Container>
      </section>

      <section className="section industries-cta">
        <Container className="industries-cta__inner">
          <h2>Don't See Your Industry?</h2>
          <p>We haven't worked in every category — but the way we work adapts to any of them.</p>
          <Button href={talkCTA.href} variant="primary">
            {talkCTA.label}
          </Button>
        </Container>
      </section>
    </div>
  )
}
