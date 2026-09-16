import Container from '../../common/Container'
import SectionLabel from '../../common/SectionLabel'
import './WhyTrinova.css'

const pillars = [
  { title: 'Business First', description: 'We consider the business behind the project, not just the final deliverable.' },
  { title: 'Clarity Before Complexity', description: 'We look for the simplest answer that actually solves the problem.' },
  { title: 'One Team', description: 'Strategy, branding, marketing, and technology can work together instead of becoming separate conversations.' },
  { title: 'Built to Last', description: 'We want the work to keep making sense after the launch, not just look good on launch day.' },
]

export default function WhyTrinova() {
  return (
    <section className="section why-trinova">
      <Container>
        <div className="why-trinova__intro">
          <SectionLabel>Why Trinova Business</SectionLabel>
          <h2>We Look at the Business, Not Just the Brief.</h2>
          <p>
            A brief tells us what you want. A conversation tells us why you need it. We
            take the time to understand the bigger picture before recommending what
            comes next.
          </p>
        </div>

        <div className="why-trinova__grid">
          {pillars.map((pillar) => (
            <article key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
