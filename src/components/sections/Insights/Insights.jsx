import Container from '../../common/Container'
import SectionLabel from '../../common/SectionLabel'
import Button from '../../common/Button'
import InsightCard from './InsightCard'
import { featuredInsights } from '../../../data/insights'
import './Insights.css'

export default function Insights() {
  return (
    <section className="section insights">
      <Container>
        <div className="insights__intro">
          <SectionLabel>Insights</SectionLabel>
          <h2>Things Worth Thinking About.</h2>
          <p>
            Ideas, observations, research, and practical lessons from branding,
            business, marketing, technology, and the industries we work with.
          </p>
        </div>

        <div className="insights__grid">
          {featuredInsights.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>

        <Button href="/insights" variant="ghost">
          Explore Insights →
        </Button>
      </Container>
    </section>
  )
}
