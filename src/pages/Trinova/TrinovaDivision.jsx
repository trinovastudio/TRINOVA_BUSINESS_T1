import { useParams, Navigate, Link } from 'react-router-dom'
import Container from '../../components/common/Container'
import SectionLabel from '../../components/common/SectionLabel'
import Button from '../../components/common/Button'
import { ecosystemDivisions } from '../../data/ecosystem'
import { talkCTA } from '../../data/navigation'

export default function TrinovaDivision() {
  const { slug } = useParams()
  const division = ecosystemDivisions.find((d) => d.slug === slug)

  if (!division) return <Navigate to="/trinova" replace />

  return (
    <div className="section">
      <Container style={{ maxWidth: '68ch' }}>
        <SectionLabel>Trinova Ecosystem</SectionLabel>
        <h1 style={{ marginTop: '1rem' }}>{division.name}</h1>
        <p style={{ marginTop: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>{division.tagline}</p>
        <p style={{ marginTop: '1.25rem' }}>{division.description}</p>

        <h2 style={{ marginTop: '2.5rem', fontSize: '1.1rem' }}>Focus Areas</h2>
        <ul style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {division.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>

        <p style={{ marginTop: '2.5rem' }}>
          {division.name} is part of the wider Trinova Private Limited ecosystem, working
          alongside Trinova Business when a project calls for it.
        </p>

        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button href={talkCTA.href} variant="primary">
            {talkCTA.label}
          </Button>
          <Link to="/trinova" className="btn btn-ghost">
            <span>← Back to Trinova Ecosystem</span>
          </Link>
        </div>
      </Container>
    </div>
  )
}
