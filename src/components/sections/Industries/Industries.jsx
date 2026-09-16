import { Link } from 'react-router-dom'
import Container from '../../common/Container'
import SectionLabel from '../../common/SectionLabel'
import Button from '../../common/Button'
import IndustryWorld from './IndustryWorld'
import { industryList } from '../../../data/industries'
import './Industries.css'

export default function Industries() {
  return (
    <section className="section industries">
      <IndustryWorld />
      <Container className="industries__inner">
        <div className="industries__intro">
          <SectionLabel>Industries</SectionLabel>
          <h2>Different Industries. Different Problems.</h2>
          <p>
            A restaurant doesn't market like a manufacturer. A school doesn't build a
            brand like an FMCG company. A startup doesn't have the same challenges as an
            established business. That's why we don't use a fixed formula. We adapt our
            thinking to the industry, the business, the audience, and the problem in
            front of us.
          </p>
        </div>

        <ul className="industries__list">
          {industryList.map((industry) => (
            <li key={industry.slug}>
              <Link to={`/industries/${industry.slug}`}>{industry.name}</Link>
            </li>
          ))}
        </ul>

        <Button href="/industries" variant="ghost">
          Explore Industries →
        </Button>
      </Container>
    </section>
  )
}
