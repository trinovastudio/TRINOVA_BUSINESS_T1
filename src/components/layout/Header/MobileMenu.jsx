import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { mainNav, heroCTA, howWeWorkSteps } from '../../../data/navigation'
import { solutions } from '../../../data/solutions'
import { industryList } from '../../../data/industries'
import { coreCapabilities } from '../../../data/capabilities'
import { insightCategories } from '../../../data/insights'

const MOBILE_MEGA_LINKS = {
  solutions: solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
  industries: industryList.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
  capabilities: coreCapabilities.map((c) => ({ label: c.name, href: `/capabilities#${c.slug}` })),
  insights: insightCategories.map((c) => ({ label: c.name, href: `/insights?category=${c.slug}` })),
  'how-we-work': howWeWorkSteps.map((s) => ({ label: s.label, href: `/how-we-work#${s.slug}` })),
}

export default function MobileMenu({ open, onClose }) {
  const [expanded, setExpanded] = useState(null)

  const toggle = (label) => setExpanded((current) => (current === label ? null : label))

  return (
    <div className={`mobile-menu${open ? ' is-open' : ''}`}>
      <nav className="mobile-menu__nav">
        <ul>
          {mainNav.map((item) => {
            const hasMega = Boolean(item.mega)
            const isExpanded = expanded === item.label
            const links = hasMega ? MOBILE_MEGA_LINKS[item.mega] || [] : []

            return (
              <li key={item.href} className="mobile-menu__item">
                <div className="mobile-menu__row">
                  <NavLink to={item.href} end={item.href === '/'} onClick={onClose}>
                    {item.label}
                  </NavLink>
                  {hasMega && (
                    <button
                      type="button"
                      className={`mobile-menu__toggle${isExpanded ? ' is-open' : ''}`}
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label} links`}
                      onClick={() => toggle(item.label)}
                    >
                      <svg width="14" height="8" viewBox="0 0 14 8" aria-hidden="true">
                        <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>

                {hasMega && (
                  <ul className={`mobile-menu__sublist${isExpanded ? ' is-open' : ''}`}>
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link to={link.href} onClick={onClose}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
      <Link to={heroCTA.href} onClick={onClose} className="mobile-menu__cta">
        {heroCTA.label}
      </Link>
    </div>
  )
}
