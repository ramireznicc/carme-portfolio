export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">

      {/* ── Contenido de texto (izquierda en desktop) ── */}
      <div className="hero-content">
        <h1 className="hero-name hero-anim-1">
          Carmela
          <em>Gil Pujol</em>
        </h1>

        <p className="hero-description hero-anim-2">
          <mark className="hero-highlight">Creadora de contenido y comunicadora.</mark><br />
          <em>Pienso, produzco y edito contenido para internet.</em><br />
          Community manager. Producción audiovisual.<br />
          Conductora y panelista en programas de streaming y TV.
        </p>

        <div className="hero-ctas hero-anim-3">
          <button className="btn btn-lime" onClick={() => scrollTo('sobre-mi')}>
            Sobre mí
          </button>
          <button className="btn btn-purple" onClick={() => scrollTo('portfolio')}>
            Proyectos ↓
          </button>
          <button className="btn-icon" onClick={() => scrollTo('contacto')} aria-label="Contacto">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <polyline points="2,4 12,13 22,4"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Marco con foto (derecha en desktop) ── */}
      <div className="hero-photo-frame hero-anim-0">
        <div className="hero-frame-card hero-frame-card-3" aria-hidden="true" />
        <div className="hero-frame-card hero-frame-card-1" aria-hidden="true" />
        <div className="hero-frame-card hero-frame-card-2" aria-hidden="true" />
        <img
          src="/carsi-3.PNG"
          alt="Carmela Gil Pujol"
          className="hero-photo-img"
        />
      </div>

    </section>
  )
}
