import Container from '../../common/Container'
import Button from '../../common/Button'
import { talkCTA } from '../../../data/navigation'
import './FinalCTA.css'

export default function FinalCTA() {
  return (
    <section className="section final-cta">
      <Container className="final-cta__inner">
        <h2>Have a Business to Build?</h2>
        <p>
          Maybe you need a new brand. Maybe you need a better strategy. Maybe you don't
          know exactly what you need yet. That's okay.
        </p>
        <p className="final-cta__prompt">
          Tell us where you are, where you want to go, and what's getting in the way.
          We'll start there.
        </p>
        <Button href={talkCTA.href} variant="primary">
          {talkCTA.label}
        </Button>
      </Container>
    </section>
  )
}
