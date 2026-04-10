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
const SketchArrowRight = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#f962b2" strokeLinecap="round" strokeLinejoin="round">
      {/* shaft — 3 lines with visible offset */}
      <line x1="6"  y1="24"   x2="30"  y2="23"   strokeWidth="2.8"/>
      <line x1="5"  y1="26.5" x2="30"  y2="25.5" strokeWidth="2.0"/>
      <line x1="7"  y1="21.5" x2="30"  y2="22"   strokeWidth="1.5"/>
      {/* arrowhead upper — 3 lines fanning out */}
      <line x1="29" y1="23"   x2="43"  y2="12"   strokeWidth="2.8"/>
      <line x1="28" y1="21"   x2="44"  y2="9"    strokeWidth="2.0"/>
      <line x1="30" y1="24"   x2="45"  y2="13"   strokeWidth="1.5"/>
      {/* arrowhead lower — 3 lines fanning out */}
      <line x1="29" y1="24"   x2="43"  y2="35"   strokeWidth="2.8"/>
      <line x1="28" y1="26"   x2="44"  y2="38"   strokeWidth="2.0"/>
      <line x1="30" y1="23"   x2="45"  y2="34"   strokeWidth="1.5"/>
    </g>
  </svg>
)

const SketchArrowLeft = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#f962b2" strokeLinecap="round" strokeLinejoin="round">
      {/* shaft */}
      <line x1="42" y1="24"   x2="18"  y2="23"   strokeWidth="2.8"/>
      <line x1="43" y1="26.5" x2="18"  y2="25.5" strokeWidth="2.0"/>
      <line x1="41" y1="21.5" x2="18"  y2="22"   strokeWidth="1.5"/>
      {/* arrowhead upper */}
      <line x1="19" y1="23"   x2="5"   y2="12"   strokeWidth="2.8"/>
      <line x1="20" y1="21"   x2="4"   y2="9"    strokeWidth="2.0"/>
      <line x1="18" y1="24"   x2="3"   y2="13"   strokeWidth="1.5"/>
      {/* arrowhead lower */}
      <line x1="19" y1="24"   x2="5"   y2="35"   strokeWidth="2.8"/>
      <line x1="20" y1="26"   x2="4"   y2="38"   strokeWidth="2.0"/>
      <line x1="18" y1="23"   x2="3"   y2="34"   strokeWidth="1.5"/>
    </g>
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
        <SketchArrowLeft />
      </button>
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
        onSwiper={setSwiperInst}
        modules={[EffectCoverflow, Pagination, Mousewheel]}
        className="portfolio-swiper"
      >
        {posts.map((post, i) => (
          <SwiperSlide key={post.id}>
            <VideoCard post={post} onOpen={() => setModalIdx(i)} loadEmbed={loadEmbeds} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="swiper-sketch-btn swiper-sketch-btn--next"
        onClick={() => swiperInst?.slideNext()}
        aria-label="Siguiente"
      >
        <SketchArrowRight />
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

      <div className="portfolio-categories">
        {categories.map((cat, idx) => (
          <div key={cat.id} id={`cat-${cat.id}`} className="portfolio-category">
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
