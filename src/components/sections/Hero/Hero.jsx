import Container from '../../common/Container'
import Button from '../../common/Button'
import SectionLabel from '../../common/SectionLabel'
import HeroScene from './HeroScene'
import { heroCTA } from '../../../data/navigation'
import './Hero.css'

const badges = [
  { label: 'Brand', icon: '◆', position: 'badge-brand' },
  { label: 'Strategy', icon: '◇', position: 'badge-strategy' },
  { label: 'Marketing', icon: '▲', position: 'badge-marketing' },
  { label: 'Technology', icon: '▣', position: 'badge-technology' },
  { label: 'Growth', icon: '↗', position: 'badge-growth' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow hero__glow--primary" aria-hidden="true" />
      <div className="hero__glow hero__glow--secondary" aria-hidden="true" />

      <Container className="hero__inner">
        <div className="hero__copy">
          <SectionLabel>Trinova Business</SectionLabel>
          <h1 className="text-hero hero__title">
            Build a Brand
            <br />
            <span className="hero__title-accent">Worth Remembering.</span>
          </h1>
          <p className="hero__body">
            We help businesses build stronger brands, make better decisions, reach the
            right people, and use technology where it actually makes sense.
          </p>
          <p className="hero__strapline">Branding. Consultancy. Marketing. IT Consultancy.</p>
          <div className="hero__actions">
            <Button href={heroCTA.href} variant="primary">
              {heroCTA.label} →
            </Button>
            <Button href="/solutions" variant="ghost">
              Explore Solutions →
            </Button>
          </div>
        </div>

        <div className="hero__scene-wrapper">
          <HeroScene />
          {badges.map((badge) => (
            <div key={badge.label} className={`hero__badge ${badge.position}`}>
              <span className="hero__badge-icon">{badge.icon}</span>
              <span className="hero__badge-label">{badge.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
