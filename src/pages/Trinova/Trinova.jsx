import { Link } from 'react-router-dom'
import Container from '../../components/common/Container'
import SectionLabel from '../../components/common/SectionLabel'
import Button from '../../components/common/Button'
import { ecosystemIntro, ecosystemDivisions, ecosystemNote } from '../../data/ecosystem'
import { talkCTA } from '../../data/navigation'

export default function Trinova() {
  return (
    <div className="section">
      <Container>
        <SectionLabel>{ecosystemIntro.label}</SectionLabel>
        <h1 style={{ marginTop: '1rem', maxWidth: '24ch' }}>{ecosystemIntro.title}</h1>
        <p style={{ marginTop: '1.25rem', maxWidth: '62ch' }}>{ecosystemIntro.body}</p>

        <div
          style={{
            marginTop: '3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {ecosystemDivisions.map((division) => (
            <article
              key={division.slug}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 16,
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <span className="eyebrow">{division.current ? 'This division' : 'Sister division'}</span>
              <h3 style={{ fontSize: '1.15rem' }}>{division.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>{division.tagline}</p>
              <p style={{ fontSize: '0.9rem' }}>{division.description}</p>
              <ul style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {division.services.map((service) => (
                  <li key={service} style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    {service}
                  </li>
                ))}
              </ul>
              {!division.current && (
                <Button href={`/trinova/${division.slug}`} variant="ghost" style={{ marginTop: 'auto', padding: 0 }}>
                  Learn more →
                </Button>
              )}
              {division.current && (
                <Link to="/" style={{ marginTop: 'auto', fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                  You are here — back to Trinova Business →
                </Link>
              )}
            </article>
          ))}
        </div>

        <p style={{ marginTop: '2.5rem', maxWidth: '62ch' }}>{ecosystemNote}</p>

        <Button href={talkCTA.href} variant="primary" style={{ marginTop: '2.5rem' }}>
          {talkCTA.label}
        </Button>
      </Container>
    </div>
  )
}
