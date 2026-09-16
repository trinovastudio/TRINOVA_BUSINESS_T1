import Container from '../../components/common/Container'
import SectionLabel from '../../components/common/SectionLabel'
import Button from '../../components/common/Button'
import { talkCTA } from '../../data/navigation'

export default function NotFound() {
  return (
    <div className="section">
      <Container style={{ maxWidth: '56ch', textAlign: 'center' }}>
        <SectionLabel>404</SectionLabel>
        <h1 style={{ marginTop: '1rem' }}>This page doesn't exist yet.</h1>
        <p style={{ marginTop: '1.25rem' }}>
          The page you're looking for may have moved, or hasn't been built yet. Head back
          home, or tell us what you were trying to find.
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href={talkCTA.href} variant="ghost">
            {talkCTA.label}
          </Button>
        </div>
      </Container>
    </div>
  )
}
