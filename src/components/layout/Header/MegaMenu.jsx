import { Link } from 'react-router-dom'
import { solutions } from '../../../data/solutions'
import { industryList } from '../../../data/industries'
import { coreCapabilities } from '../../../data/capabilities'
import { insightCategories, featuredArticles } from '../../../data/insights'
import { howWeWorkSteps } from '../../../data/navigation'

function Panel({ className = '', children }) {
  return <div className={`mega-menu__panel ${className}`}>{children}</div>
}

function SolutionsMega({ onNavigate }) {
  return (
    <Panel className="mega-menu__panel--solutions">
      <div className="mega-menu__grid mega-menu__grid--4">
        {solutions.map((solution) => (
          <Link
            key={solution.slug}
            to={`/solutions/${solution.slug}`}
            className="mega-menu__card"
            onClick={onNavigate}
          >
            <span className="mega-menu__card-number">{solution.number}</span>
            <span className="mega-menu__card-title">{solution.name}</span>
            <span className="mega-menu__card-desc">{solution.shortDescription}</span>
          </Link>
        ))}
      </div>
      <div className="mega-menu__footer">
        <span className="mega-menu__footer-note">{solutions.length} solutions, working independently or together.</span>
        <Link to="/solutions" className="mega-menu__cta" onClick={onNavigate}>
          View all Solutions →
        </Link>
      </div>
    </Panel>
  )
}

function IndustriesMega({ onNavigate }) {
  return (
    <Panel className="mega-menu__panel--industries">
      <div className="mega-menu__grid mega-menu__grid--links">
        {industryList.map((industry) => (
          <Link
            key={industry.slug}
            to={`/industries/${industry.slug}`}
            className="mega-menu__link"
            onClick={onNavigate}
          >
            {industry.name}
          </Link>
        ))}
      </div>
      <div className="mega-menu__footer">
        <span className="mega-menu__footer-note">{industryList.length} industries. No fixed formula.</span>
        <Link to="/industries" className="mega-menu__cta" onClick={onNavigate}>
          View all Industries →
        </Link>
      </div>
    </Panel>
  )
}

function CapabilitiesMega({ onNavigate }) {
  return (
    <Panel className="mega-menu__panel--capabilities">
      <div className="mega-menu__grid mega-menu__grid--4">
        {coreCapabilities.map((capability) => (
          <Link
            key={capability.slug}
            to={`/capabilities#${capability.slug}`}
            className="mega-menu__card"
            onClick={onNavigate}
          >
            <span className="mega-menu__card-title">{capability.name}</span>
            <span className="mega-menu__card-desc">{capability.tagline}</span>
          </Link>
        ))}
      </div>
      <div className="mega-menu__footer">
        <span className="mega-menu__footer-note">Four disciplines. One connected team.</span>
        <Link to="/capabilities" className="mega-menu__cta" onClick={onNavigate}>
          Explore Capabilities →
        </Link>
      </div>
    </Panel>
  )
}

function InsightsMega({ onNavigate }) {
  return (
    <Panel className="mega-menu__panel--insights">
      <div className="mega-menu__columns">
        <div className="mega-menu__column">
          <span className="mega-menu__column-label">Browse by topic</span>
          <ul className="mega-menu__list">
            {insightCategories.map((category) => (
              <li key={category.slug}>
                <Link to={`/insights?category=${category.slug}`} onClick={onNavigate}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mega-menu__column mega-menu__column--wide">
          <span className="mega-menu__column-label">Featured</span>
          <ul className="mega-menu__list mega-menu__list--articles">
            {featuredArticles.slice(0, 3).map((article) => (
              <li key={article.slug}>
                <Link to={`/insights/${article.slug}`} onClick={onNavigate}>
                  <span className="mega-menu__article-title">{article.title}</span>
                  <span className="mega-menu__article-excerpt">{article.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mega-menu__footer">
        <span className="mega-menu__footer-note">Ideas, research, and practical lessons.</span>
        <Link to="/insights" className="mega-menu__cta" onClick={onNavigate}>
          Explore all Insights →
        </Link>
      </div>
    </Panel>
  )
}

function HowWeWorkMega({ onNavigate }) {
  return (
    <Panel className="mega-menu__panel--how-we-work">
      <div className="mega-menu__columns">
        <div className="mega-menu__column">
          <span className="mega-menu__column-label">Our process</span>
          <ul className="mega-menu__list mega-menu__list--steps">
            {howWeWorkSteps.map((step, i) => (
              <li key={step.slug}>
                <Link to={`/how-we-work#${step.slug}`} onClick={onNavigate}>
                  <span className="mega-menu__step-number">{String(i + 1).padStart(2, '0')}</span>
                  {step.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mega-menu__footer">
        <span className="mega-menu__footer-note">Understand. Research. Define. Build. Launch. Measure. Improve.</span>
        <Link to="/how-we-work" className="mega-menu__cta" onClick={onNavigate}>
          See Our Approach →
        </Link>
      </div>
    </Panel>
  )
}

const PANELS = {
  solutions: SolutionsMega,
  industries: IndustriesMega,
  capabilities: CapabilitiesMega,
  insights: InsightsMega,
  'how-we-work': HowWeWorkMega,
}

export default function MegaMenu({ type, onNavigate }) {
  const PanelComponent = PANELS[type]
  if (!PanelComponent) return null
  return <PanelComponent onNavigate={onNavigate} />
}
