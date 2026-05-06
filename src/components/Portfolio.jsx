import { useState, useEffect, useRef } from 'react'
import FadeIn from './FadeIn'
import VideoCard from './VideoCard'
import VideoModal from './VideoModal'
import { categories } from '../data/posts'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

/* ── Sketch crayon arrows ── */
const ArrowRight = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="21" stroke="#f962b2" strokeWidth="1.5" fill="#f2e9de" fillOpacity="0.95"/>
    <polyline points="18,14 27,22 18,30" stroke="#f962b2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ArrowLeft = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="21" stroke="#f962b2" strokeWidth="1.5" fill="#f2e9de" fillOpacity="0.95"/>
    <polyline points="26,14 17,22 26,30" stroke="#f962b2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

/* ── Coverflow carousel row ── */
function SwiperRow({ posts }) {
  const [modalIdx, setModalIdx] = useState(null)
  const [swiperInst, setSwiperInst] = useState(null)
  const [loadEmbeds, setLoadEmbeds] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const rowRef = useRef(null)

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoadEmbeds(true)
        io.disconnect()
      }
    }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={rowRef} className="swiper-row-wrap">
      <button
        className="swiper-sketch-btn swiper-sketch-btn--prev"
        onClick={() => swiperInst?.slidePrev()}
        aria-label="Anterior"
      >
        <ArrowLeft />
      </button>
      <div className="swiper-clip">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={posts.length >= 3}
          coverflowEffect={{
            rotate: 35,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          mousewheel={{ releaseOnEdges: true, sensitivity: 1 }}
          onSwiper={(s) => { setSwiperInst(s); setActiveIdx(s.realIndex) }}
          onSlideChange={(s) => setActiveIdx(s.realIndex)}
          modules={[EffectCoverflow, Pagination, Mousewheel]}
          className="portfolio-swiper"
        >
          {posts.map((post, i) => (
            <SwiperSlide key={post.id}>
              <VideoCard post={post} onOpen={() => setModalIdx(i)} loadEmbed={loadEmbeds} isActive={i === activeIdx} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        className="swiper-sketch-btn swiper-sketch-btn--next"
        onClick={() => swiperInst?.slideNext()}
        aria-label="Siguiente"
      >
        <ArrowRight />
      </button>

      {modalIdx !== null && (
        <VideoModal
          posts={posts}
          index={modalIdx}
          onNavigate={setModalIdx}
          onClose={() => setModalIdx(null)}
        />
      )}
    </div>
  )
}

export default function Portfolio() {
  const categoriesRef = useRef(null)

  useEffect(() => {
    const container = categoriesRef.current
    if (!container) return
    const cats = container.querySelectorAll('.portfolio-category')
    const observers = []
    cats.forEach(cat => {
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          cat.classList.add('deco-visible')
          io.disconnect()
        }
      }, { threshold: 0.1 })
      io.observe(cat)
      observers.push(io)
    })
    return () => observers.forEach(io => io.disconnect())
  }, [])

  return (
    <section className="portfolio-section section" id="portfolio">
      <FadeIn className="section-header">
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">Trabajos y Proyectos</h2>
      </FadeIn>

      {/* Category shortcuts */}
      <FadeIn delay={80}>
        <div className="cat-nav">
          {categories.map((cat, idx) => (
            <a
              key={cat.id}
              href={`#cat-${cat.id}`}
              className="cat-nav-item"
              style={{
                '--accent': cat.accent === '#e7fe71' ? '#8a9400' : cat.accent,
                '--accent-tint': hexToRgba(cat.accent, 0.1),
                borderColor: 'var(--accent)',
              }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              <span className="cat-nav-label">{cat.navLabel ?? cat.title}</span>
            </a>
          ))}
        </div>
      </FadeIn>

      <div className="portfolio-categories" ref={categoriesRef}>
        {categories.map((cat, idx) => (
          <div key={cat.id} id={`cat-${cat.id}`} className="portfolio-category">
            {cat.id === 'marcas' && <>
              <img src="/dibujos/cine3.png" alt="" className="marcas-deco marcas-deco--left"  aria-hidden="true" />
              <img src="/dibujos/like.png"  alt="" className="marcas-deco marcas-deco--right" aria-hidden="true" />
            </>}
            {cat.id === 'medios' && <>
              <img src="/dibujos/tv.png"       alt="" className="marcas-deco marcas-deco--left"  aria-hidden="true" />
              <img src="/dibujos/notebook.png" alt="" className="marcas-deco marcas-deco--right" aria-hidden="true" />
            </>}
            {cat.id === 'propio' && <>
              <img src="/dibujos/lisa.png" alt="" className="marcas-deco marcas-deco--left"  aria-hidden="true" />
              <img src="/dibujos/sad.png"  alt="" className="marcas-deco marcas-deco--right" aria-hidden="true" />
            </>}
            <FadeIn>
              <div className="cat-header">
                <span className="cat-number" style={{ color: cat.accent === '#e7fe71' ? '#8a9400' : cat.accent }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="cat-title">{cat.title}</h3>
              </div>
            </FadeIn>

            <div className={`cat-rows${cat.rows.length === 2 ? ' cat-rows--two-col' : ''}`}>
              {cat.rows.map((row) => (
                <div key={row.id} className="cat-row">
                  <FadeIn>
                    <div className="cat-row-meta">
                      {row.id === 'cm-ig' && (
                        <img src="/dibujos/agenda.png" alt="" className="portfolio-cat-deco" aria-hidden="true" />
                      )}
                      {row.id === 'cm-tt' && (
                        <img src="/dibujos/flor.png" alt="" className="portfolio-cat-deco" aria-hidden="true" />
                      )}
                      {row.platform && (
                        <span
                          className="cat-platform-pill"
                          style={{
                            background: row.platform === 'TikTok' ? '#010101' : 'linear-gradient(135deg,#f9a, #f96)',
                            color: '#fff',
                          }}
                        >
                          {row.platform === 'TikTok' && <span aria-hidden="true">♪ </span>}
                          {row.platform === 'Instagram' && <span aria-hidden="true">◈ </span>}
                          {row.platform}
                        </span>
                      )}
                      {row.description && (
                        <p className="cat-row-desc">{row.description}</p>
                      )}
                    </div>
                  </FadeIn>
                  <SwiperRow posts={row.posts} />
                </div>
              ))}

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
