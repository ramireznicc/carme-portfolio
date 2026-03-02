import { useState, useEffect } from 'react'

const links = [
  { href: 'sobre-mi',  label: 'Sobre mí' },
  { href: 'portfolio', label: 'Portfolio' },
  { href: 'contacto',  label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNav = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="nav"
        style={{ boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.07)' : 'none' }}
      >
        <div className="nav-logo">carmela<span>.</span></div>

        {/* Desktop links */}
        <div className="nav-links">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={`#${href}`}
              className="nav-link"
              onClick={(e) => handleNav(e, href)}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className={`nav-burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
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
        <div className="nav-mobile-overlay" onClick={() => setMenuOpen(false)}>
          <div className="nav-mobile-menu" onClick={(e) => e.stopPropagation()}>
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={`#${href}`}
                className="nav-mobile-link"
                onClick={(e) => handleNav(e, href)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
