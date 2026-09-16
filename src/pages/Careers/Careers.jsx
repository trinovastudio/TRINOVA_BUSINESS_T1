import Container from '../../components/common/Container'
import SectionLabel from '../../components/common/SectionLabel'
import Button from '../../components/common/Button'

// External application form — deliberately not the site's own /contact page.
const careersFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSdVxGYTsourFX1UJB6sbcIXaaDvXLb_wE21SD7xmNtDbR9cgg/viewform'

export default function Careers() {
  return (
    <div className="section">
      <Container style={{ maxWidth: '62ch' }}>
        <SectionLabel>Careers</SectionLabel>
        <h1 style={{ marginTop: '1rem' }}>Different Skills. One Shared Purpose.</h1>
        <p style={{ marginTop: '1.25rem' }}>
          Trinova Business brings together people from strategy, brand and creative,
          marketing and growth, technology, and project and client management. Not
          every project needs every role — we bring in the right people at the right
          time, and the team grows around the work.
        </p>
        <p style={{ marginTop: '1.25rem' }}>
          We don't have open positions listed here right now. If you think you'd be a
          good fit for how we work, tell us about yourself and what you'd want to work
          on — we'll start there.
        </p>
        <Button href={careersFormUrl} variant="primary" style={{ marginTop: '2rem' }}>
          Get in Touch
        </Button>
      </Container>
    </div>
  )
}
