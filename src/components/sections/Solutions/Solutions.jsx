import Container from '../../common/Container'
import SectionLabel from '../../common/SectionLabel'
import SolutionsCarousel from './SolutionsCarousel'
import { solutions } from '../../../data/solutions'
import './Solutions.css'
import './SolutionsCarousel.css'

export default function Solutions() {
  return (
    <section className="section solutions" id="solutions">
      <div className="solutions__grid-bg" aria-hidden="true" />
      <Container className="solutions__inner">
        <div className="solutions__intro">
          <SectionLabel>What We Do</SectionLabel>
          <h2>One Business. Four Ways We Help.</h2>
          <p>
            We don't believe in selling the same solution to every business. Sometimes you
            need to build a brand. Sometimes you need to rethink your strategy. Sometimes
            you need better marketing. And sometimes, the problem is simply the way your
            business uses technology. We start with the problem and bring in the right
            expertise.
          </p>
        </div>

        <SolutionsCarousel solutions={solutions} />
      </Container>
    </section>
  )
}
