import { useState } from 'react'
import { Link } from 'react-router-dom'
import { insightCategories } from '../../data/insights'

/**
 * Editorial article card for the /insights index — distinct from the home
 * page's <InsightCard>, which the "insights" teaser section on Home still
 * uses and must not change. Shows a cover image (from Higgsfield / Google
 * Flow, once generated) with a graceful fallback when one isn't present yet.
 */
export default function ArticleCard({ insight }) {
  const [imageFailed, setImageFailed] = useState(false)
  const categoryName = insightCategories.find((c) => c.slug === insight.category)?.name || insight.category
  const imageSrc = `/images/insights/${insight.slug}.jpg`

  return (
    <article className="article-card" style={{ '--article-accent': insight.accent }}>
      <div className="article-card__media">
        {!imageFailed ? (
          <img src={imageSrc} alt="" loading="lazy" onError={() => setImageFailed(true)} />
        ) : (
          <div className="article-card__media-fallback">
            <span>{categoryName?.[0]}</span>
          </div>
        )}
      </div>

      <div className="article-card__body">
        <div className="article-card__meta">
          <span className="eyebrow">{categoryName}</span>
          {insight.readTime && <span className="article-card__readtime">{insight.readTime}</span>}
        </div>
        <h3>{insight.title}</h3>
        <p>{insight.excerpt}</p>
        <Link to={`/insights/${insight.slug}`} className="article-card__link">
          Read Article →
        </Link>
      </div>
    </article>
  )
}
