import Container from '../../common/Container'
import SectionLabel from '../../common/SectionLabel'
import Button from '../../common/Button'
import './Introduction.css'

export default function Introduction() {
  return (
    <section className="section introduction">
      <Container className="introduction__grid">
        <div>
          <SectionLabel>Introduction</SectionLabel>
          <h2>Good Businesses Need More Than Good Ideas.</h2>
        </div>
        <div className="introduction__body">
          <p>A good idea is only the beginning.</p>
          <p>
            Building a business takes clarity. It takes a brand people understand, a
            strategy that makes sense, and the right decisions at the right time.
          </p>
          <p>
            Trinova Business works with businesses to figure out what needs to change,
            what needs to be built, and what should happen next.
          </p>
          <p>
            We bring branding, business consultancy, marketing, and IT consultancy
            together so you don't have to manage every piece separately.
          </p>
          <Button href="/solutions" variant="ghost">
            What We Do →
          </Button>
        </div>
      </Container>
    </section>
  )
}
