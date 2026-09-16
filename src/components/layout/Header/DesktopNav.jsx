import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MegaMenu from './MegaMenu'
import { mainNav } from '../../../data/navigation'

const CLOSE_DELAY = 150

export default function DesktopNav() {
  const [openItem, setOpenItem] = useState(null)
  const closeTimer = useRef(null)
  const navRef = useRef(null)

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setOpenItem(null), CLOSE_DELAY)
  }

  const openNow = (label) => {
    clearCloseTimer()
    setOpenItem(label)
  }

  const closeNow = () => {
    clearCloseTimer()
    setOpenItem(null)
  }

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!openItem) return undefined

    const handlePointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        closeNow()
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeNow()
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openItem])

  useEffect(() => () => clearCloseTimer(), [])

  return (
    <nav className="desktop-nav desktop-only" ref={navRef}>
      <ul className="desktop-nav__list">
        {mainNav.map((item) => {
          const hasMega = Boolean(item.mega)
          const isOpen = openItem === item.label

          return (
            <li
              key={item.href}
              className="desktop-nav__item"
              onMouseEnter={() => hasMega && openNow(item.label)}
              onMouseLeave={() => hasMega && scheduleClose()}
            >
              <NavLink
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) => `desktop-nav__link${isActive ? ' is-active' : ''}${isOpen ? ' is-open' : ''}`}
                aria-haspopup={hasMega ? 'true' : undefined}
                aria-expanded={hasMega ? isOpen : undefined}
                onFocus={() => hasMega && openNow(item.label)}
                onClick={() => hasMega && closeNow()}
              >
                {item.label}
                {hasMega && (
                  <svg className="desktop-nav__chevron" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </NavLink>

              {hasMega && (
                <div className={`mega-menu${isOpen ? ' is-open' : ''}`} role="region" aria-label={`${item.label} menu`}>
                  <MegaMenu type={item.mega} onNavigate={closeNow} />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
