import { useState, useEffect } from 'react'

const links = [
  {
    href: 'sobre-mi', label: 'Sobre mí',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  },
  {
    href: 'portfolio', label: 'Portfolio',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    href: 'contacto', label: 'Contacto',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>,
  },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [menuClosing, setMenuClosing] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop (no animation needed)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) { setMenuOpen(false); setMenuClosing(false) }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeMenu = () => {
    setMenuClosing(true)
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false) }, 240)
  }

  const handleNav = (e, id) => {
    e.preventDefault()
    closeMenu()
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 260)
  }

  return (
    <>
      <nav
        className="nav"
        style={{ boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.07)' : 'none' }}
      >
        <div className="nav-logo" aria-label="Carmela Gil Pujol">
          <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <defs>
              <linearGradient id="nav-logo-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#e7fe71"/>
                <stop offset="50%"  stopColor="#00d4aa"/>
                <stop offset="100%" stopColor="#f962b2"/>
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="7" fill="url(#nav-logo-g)"/>
          </svg>
        </div>

        {/* Desktop links */}
        <div className="nav-links">
          {links.map(({ href, label, icon }) => (
            <a
              key={href}
              href={`#${href}`}
              className="nav-link"
              onClick={(e) => handleNav(e, href)}
            >
              {icon}{label}
            </a>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className={`nav-burger${menuOpen ? ' open' : ''}`}
          onClick={() => menuOpen ? closeMenu() : setMenuOpen(true)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          className={`nav-mobile-overlay${menuClosing ? ' closing' : ''}`}
          onClick={closeMenu}
        >
          <div
            className={`nav-mobile-menu${menuClosing ? ' closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {links.map(({ href, label, icon }) => (
              <a
                key={href}
                href={`#${href}`}
                className="nav-mobile-link"
                onClick={(e) => handleNav(e, href)}
              >
                {icon}{label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
