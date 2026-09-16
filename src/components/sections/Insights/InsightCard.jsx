import Button from '../../common/Button'

export default function InsightCard({ insight }) {
  return (
    <article className="insight-card">
      <span className="eyebrow">{insight.category}</span>
      <h3>{insight.title}</h3>
      <p>{insight.excerpt}</p>
      <Button href={`/insights/${insight.slug}`} variant="ghost">
        Read Article →
      </Button>
    </article>
  )
}
