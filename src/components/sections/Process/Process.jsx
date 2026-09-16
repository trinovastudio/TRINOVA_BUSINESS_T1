import Container from '../../common/Container'
import SectionLabel from '../../common/SectionLabel'
import Button from '../../common/Button'
import ProcessScene from './ProcessScene'
import './Process.css'

const steps = [
  { name: 'Understand', description: 'We learn how your business works, where you are, and where you want to go.' },
  { name: 'Research', description: 'We look at your market, customers, competitors, and the environment around your business.' },
  { name: 'Define', description: 'We turn what we learn into a clear direction and a practical plan.' },
  { name: 'Build', description: 'We turn that plan into brands, campaigns, systems, experiences, or whatever the business actually needs.' },
  { name: 'Grow', description: 'We look at what happens after launch, learn from it, and keep improving.' },
]

export default function Process() {
  return (
    <section className="section process">
      <ProcessScene />
      <Container className="process__inner">
        <SectionLabel>Our Approach</SectionLabel>
        <h2>Understand. Research. Define. Build. Grow.</h2>
        <p className="process__lead">Every project starts differently, but our thinking stays the same.</p>

        <ol className="process__steps">
          {steps.map((step, i) => (
            <li key={step.name}>
              <span className="process__index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.name}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>

        <Button href="/how-we-work" variant="ghost">
          See Our Approach →
        </Button>
      </Container>
    </section>
  )
}
