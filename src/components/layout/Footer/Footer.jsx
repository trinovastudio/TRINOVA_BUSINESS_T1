import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../common/Container'
import { footerNav, footerCopy } from '../../../data/navigation'
import { industryList } from '../../../data/industries'
import './Footer.css'

const industryLinks = industryList.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }))

const columns = [
  { title: 'Company', items: footerNav.company },
  { title: 'Solutions', items: footerNav.solutions },
  { title: 'Industries', items: industryLinks, wide: true },
  { title: 'Insights', items: footerNav.insights },
  { title: 'Trinova', items: footerNav.trinova },
]

export default function Footer() {
  // Accordion state only matters below the 901px breakpoint — a media
  // query in Footer.css forces every column open above it. Native
  // <details>/<summary> was tried here first, but Chromium suppresses a
  // collapsed <details>'s paint at the engine level in a way plain CSS
  // (display, content-visibility, !important) can't override, so this is
  // a plain button + class toggle instead — the same proven pattern as
  // the mobile nav's sublists.
  const [openColumn, setOpenColumn] = useState('Company')

  const toggle = (title) => setOpenColumn((current) => (current === title ? null : title))

  return (
    <footer className="footer">
      <Container>
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Trinova Business — Home">
              <img src="/logo.svg" alt="Trinova Business" height={32} />
            </Link>
            <p className="footer__parent">{footerCopy.tagline}</p>
            <p className="footer__strapline">{footerCopy.strapline}</p>
            <p>{footerCopy.description}</p>
            <p className="footer__locations">{footerCopy.locations.join(' · ')}</p>
          </div>

          <div className="footer__columns">
            {columns.map((col) => {
              const isOpen = openColumn === col.title
              return (
                <div key={col.title} className={`footer__col${col.wide ? ' footer__col--wide' : ''}`}>
                  <button
                    type="button"
                    className={`footer__col-summary${isOpen ? ' is-open' : ''}`}
                    onClick={() => toggle(col.title)}
                    aria-expanded={isOpen}
                  >
                    <span className="eyebrow">{col.title}</span>
                  </button>
                  <ul className={`footer__col-list${isOpen ? ' is-open' : ''}${col.wide ? ' footer__col-list--grid' : ''}`}>
                    {col.items.map((item) => {
                      const isExternal = /^https?:\/\//.test(item.href)
                      return (
                        <li key={item.label}>
                          {isExternal ? (
                            <a href={item.href} target="_blank" rel="noreferrer">
                              {item.label}
                            </a>
                          ) : (
                            <Link to={item.href}>{item.label}</Link>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        <hr className="divider" />

        <div className="footer__bottom">
          <span>{footerCopy.copyright}</span>
          <span>{footerCopy.parentCompany}</span>
        </div>
      </Container>
    </footer>
  )
}
