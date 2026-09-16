import Container from '../../common/Container'
import SectionLabel from '../../common/SectionLabel'
import Button from '../../common/Button'
import PhilosophyScene from './PhilosophyScene'
import './Philosophy.css'

const questions = [
  'What are you trying to achieve?',
  'Who are you trying to reach?',
  "What's working?",
  "What's not?",
  'And what is actually holding the business back?',
]

export default function Philosophy() {
  return (
    <section className="section philosophy">
      <PhilosophyScene />
      <Container className="philosophy__inner">
        <SectionLabel>How We Think</SectionLabel>
        <h2>We Don't Start With a Solution. We Start With a Question.</h2>
        <p className="philosophy__lead">
          Before we design a logo, launch a campaign, or recommend a technology, we want
          to understand the business behind it.
        </p>
        <ul className="philosophy__questions">
          {questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <p>Once we understand that, the solution becomes much clearer.</p>
        <Button href="/how-we-work" variant="ghost">
          How We Work →
        </Button>
      </Container>
    </section>
  )
}
