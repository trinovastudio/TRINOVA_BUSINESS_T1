import { useParams } from 'react-router-dom'
import Container from '../../components/common/Container'
import SectionLabel from '../../components/common/SectionLabel'
import Button from '../../components/common/Button'
import { featuredArticles, insightCategories } from '../../data/insights'
import { talkCTA } from '../../data/navigation'

export default function Article() {
  const { slug } = useParams()
  const article = featuredArticles.find((a) => a.slug === slug) || featuredArticles[0]
  const categoryName = insightCategories.find((c) => c.slug === article.category)?.name

  return (
    <div className="section">
      <Container style={{ maxWidth: '72ch' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <SectionLabel>{categoryName || 'Insight'}</SectionLabel>
          {article.readTime && (
            <span style={{ fontSize: 'var(--fs-small)', color: 'var(--color-text-faint)' }}>{article.readTime}</span>
          )}
        </div>
        <h1 style={{ marginTop: '1rem' }}>{article.title}</h1>
        <p style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>{article.excerpt}</p>

        <hr className="divider" style={{ margin: '3rem 0' }} />

        <h3>Have a Similar Problem?</h3>
        <p style={{ marginTop: '1rem' }}>
          Reading about a problem is one thing. Figuring out what to do about it is
          another. If something in this article sounds familiar, tell us what's
          happening in your business. We'll start with the problem.
        </p>
        <Button href={talkCTA.href} variant="primary" style={{ marginTop: '1.5rem' }}>
          {talkCTA.label}
        </Button>
      </Container>
    </div>
  )
}
