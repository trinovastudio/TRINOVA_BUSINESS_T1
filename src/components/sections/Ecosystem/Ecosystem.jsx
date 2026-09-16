import Container from '../../common/Container'
import SectionLabel from '../../common/SectionLabel'
import Button from '../../common/Button'
import EcosystemScene from './EcosystemScene'
import { ecosystemDivisions, ecosystemNote } from '../../../data/ecosystem'
import './Ecosystem.css'

export default function Ecosystem() {
  return (
    <section className="section ecosystem">
      <EcosystemScene />
      <Container className="ecosystem__inner">
        <SectionLabel>Trinova Ecosystem</SectionLabel>
        <h2>Part of Something Bigger.</h2>
        <p className="ecosystem__lead">
          Trinova Business is part of Trinova Private Limited, an ecosystem bringing
          together business, technology, gaming, and creative production.
        </p>

        <div className="ecosystem__grid">
          {ecosystemDivisions.map((division) => (
            <article key={division.slug} className={`ecosystem-card${division.current ? ' is-current' : ''}`}>
              <h3>{division.name}</h3>
              <span className="eyebrow">{division.tagline}</span>
              <ul>
                {division.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="ecosystem__note">{ecosystemNote}</p>
        <Button href="/trinova" variant="ghost">
          Explore Trinova →
        </Button>
      </Container>
    </section>
  )
}
