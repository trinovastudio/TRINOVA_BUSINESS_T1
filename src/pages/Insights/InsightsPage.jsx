import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import Container from '../../components/common/Container'
import SectionLabel from '../../components/common/SectionLabel'
import Button from '../../components/common/Button'
import ArticleCard from './ArticleCard'
import { fadeUp, staggerContainer } from '../../utils/animations'
import { insightsIntro, insightCategories, featuredArticles, resources } from '../../data/insights'
import { talkCTA } from '../../data/navigation'
import './InsightsPage.css'

export default function InsightsPage() {
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filtered = useMemo(
    () => (categoryFilter === 'all' ? featuredArticles : featuredArticles.filter((a) => a.category === categoryFilter)),
    [categoryFilter]
  )

  return (
    <div className="insights-page">
      {/* HERO */}
      <section className="section insights-hero">
        <Container>
          <SectionLabel>{insightsIntro.label}</SectionLabel>
          <h1 style={{ marginTop: '1rem', maxWidth: '30ch' }}>{insightsIntro.title}</h1>
          {insightsIntro.body.map((p) => (
            <p key={p} style={{ marginTop: '1.1rem', maxWidth: '62ch' }}>
              {p}
            </p>
          ))}
        </Container>
      </section>

      {/* CATEGORIES OVERVIEW */}
      <section className="section insights-categories">
        <Container>
          <SectionLabel>Explore Insights</SectionLabel>
          <h2 style={{ marginTop: '1rem' }}>Five Lenses on the Same Question.</h2>

          <div className="insights-categories__grid">
            {insightCategories.map((category) => (
              <article className="insights-categories__card" key={category.slug}>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED ARTICLES */}
      <section className="section insights-articles" id="featured-articles">
        <Container>
          <div className="insights-articles__toolbar">
            <SectionLabel>Featured Articles</SectionLabel>
            <div className="insights-articles__pills">
              <button
                type="button"
                className={`insights-articles__pill${categoryFilter === 'all' ? ' is-active' : ''}`}
                onClick={() => setCategoryFilter('all')}
              >
                All ({featuredArticles.length})
              </button>
              {insightCategories.map((category) => {
                const count = featuredArticles.filter((a) => a.category === category.slug).length
                if (!count) return null
                return (
                  <button
                    key={category.slug}
                    type="button"
                    className={`insights-articles__pill${categoryFilter === category.slug ? ' is-active' : ''}`}
                    onClick={() => setCategoryFilter(category.slug)}
                  >
                    {category.name} ({count})
                  </button>
                )
              })}
            </div>
          </div>

          <motion.div
            className="insights-articles__grid"
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate="visible"
            key={categoryFilter}
          >
            {filtered.map((article) => (
              <motion.div key={article.slug} variants={fadeUp}>
                <ArticleCard insight={article} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* RESOURCES */}
      <section className="section insights-resources" id="resources">
        <Container>
          <SectionLabel>Guides &amp; Resources</SectionLabel>
          <h2 style={{ marginTop: '1rem' }}>Practical Starting Points.</h2>

          <div className="insights-resources__grid">
            {resources.map((resource) => (
              <div className="insights-resources__card" key={resource.name}>
                <h3>{resource.name}</h3>
                <p>{resource.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section insights-cta">
        <Container className="insights-cta__inner">
          <h2>Have Something Worth Exploring?</h2>
          <p>If something you read sounds familiar, tell us what's happening in your business.</p>
          <Button href={talkCTA.href} variant="primary">
            {talkCTA.label}
          </Button>
        </Container>
      </section>
    </div>
  )
}
