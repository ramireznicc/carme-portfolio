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
          Community Manager y editora de video especializada en Instagram y TikTok.
          Creo contenido que genera comunidad, engagement y resultados reales para marcas.
        </p>

        <div className="hero-ctas hero-anim-3">
          <button className="btn btn-primary" onClick={() => scrollTo('portfolio')}>
            Proyectos ↓
          </button>
          <button className="btn btn-outline" onClick={() => scrollTo('contacto')}>
            Hablemos
          </button>
        </div>
      </div>

      {/* ── Marco con foto (derecha en desktop) ── */}
      <div className="hero-photo-frame hero-anim-0">
        <div className="hero-frame-card hero-frame-card-3" aria-hidden="true" />
        <div className="hero-frame-card hero-frame-card-1" aria-hidden="true" />
        <div className="hero-frame-card hero-frame-card-2" aria-hidden="true" />
        <img
          src="/carme-portfolio-2.png"
          alt="Carmela Gil Pujol"
          className="hero-photo-img"
        />
      </div>

    </section>
  )
}
