import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import DesktopNav from './DesktopNav'
import MobileMenu from './MobileMenu'
import Button from '../../common/Button'
import { heroCTA } from '../../../data/navigation'
import './Header.css'

// Real text nav on desktop (compact, anchored dropdowns for the five
// content-heavy sections); a slide-out panel only on narrow viewports.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    if (!menuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="header__logo" onClick={closeMenu} aria-label="Trinova Business — Home">
          <img src="/logo.svg" alt="Trinova Business" height={28} />
        </Link>

        <DesktopNav />

        <div className="header__actions desktop-only">
          <Button href={heroCTA.href} variant="primary">
            {heroCTA.label}
          </Button>
        </div>

        <button
          className={`header__menu-toggle mobile-only${menuOpen ? ' is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {/*
        Rendered via a portal into <body> rather than as a child of <header>:
        a transformed/filtered ancestor would make the overlay's `inset`
        resolve against the header box instead of the viewport.
      */}
      {createPortal(<MobileMenu open={menuOpen} onClose={closeMenu} />, document.body)}
    </header>
  )
}
