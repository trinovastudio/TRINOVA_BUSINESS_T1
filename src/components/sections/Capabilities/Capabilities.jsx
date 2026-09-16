import Container from '../../common/Container'
import SectionLabel from '../../common/SectionLabel'
import Button from '../../common/Button'
import CapabilityScene from './CapabilityScene'
import { coreCapabilities } from '../../../data/capabilities'
import './Capabilities.css'

export default function Capabilities() {
  return (
    <section className="section capabilities">
      <CapabilityScene />
      <Container className="capabilities__inner">
        <SectionLabel>Capabilities</SectionLabel>
        <h2>The People and Skills Behind the Work.</h2>
        <p className="capabilities__lead">
          Good work rarely comes from one discipline. Strategy needs research. Branding
          needs design. Marketing needs creativity and data. Technology needs people who
          understand both systems and the business using them.
        </p>

        <div className="capabilities__grid">
          {coreCapabilities.map((cap) => (
            <article key={cap.slug} className="capability-card">
              <h3>{cap.name}</h3>
              <p>{cap.tagline}</p>
            </article>
          ))}
        </div>

        <Button href="/capabilities" variant="ghost">
          Explore Capabilities →
        </Button>
      </Container>
    </section>
  )
}
