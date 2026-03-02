import { useState, useRef, useEffect, useCallback } from 'react'
import FadeIn from './FadeIn'
import PostCard from './PostCard'
import { posts } from '../data/posts'

const filters = [
  { key: 'all',    label: 'Todos' },
  { key: 'ig',     label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'reel',   label: 'Reels' },
  { key: 'feed',   label: 'Feed' },
]

function matchesFilter(post, active) {
  if (active === 'all')    return true
  if (active === 'ig')     return post.platform === 'ig'
  if (active === 'tiktok') return post.platform === 'tiktok'
  if (active === 'reel')   return post.type === 'reel'
  if (active === 'feed')   return post.type === 'feed'
  return true
}

export default function Portfolio() {
  const [active, setActive]         = useState('all')
  const [canPrev, setCanPrev]       = useState(false)
  const [canNext, setCanNext]       = useState(true)
  const gridRef = useRef(null)

  const visible = posts.filter((p) => matchesFilter(p, active))

  const updateArrows = useCallback(() => {
    const el = gridRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  useEffect(() => {
    updateArrows()
  }, [visible, updateArrows])

  const scrollStep = (dir) => {
    const el = gridRef.current
    if (!el) return
    const card = el.querySelector('.fade-in')
    const step = (card?.offsetWidth ?? el.clientWidth) + 14
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="portfolio-section section" id="portfolio">
      <FadeIn className="section-header">
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">Trabajos seleccionados</h2>
      </FadeIn>

      {/* Filter tabs */}
      <FadeIn className="filter-tabs" delay={80}>
        {filters.map(({ key, label }) => (
          <button
            key={key}
            className={`filter-tab${active === key ? ' active' : ''}`}
            onClick={() => setActive(key)}
          >
            {label}
          </button>
        ))}
      </FadeIn>

      {/* Grid / Carousel */}
      <div className="portfolio-carousel-wrap">
        <div
          className="portfolio-grid"
          ref={gridRef}
          onScroll={updateArrows}
        >
          {visible.map((post, i) => (
            <FadeIn key={post.id} delay={i * 80}>
              <PostCard post={post} />
            </FadeIn>
          ))}
        </div>

        {/* Flechas — solo visibles en mobile via CSS */}
        <button
          className={`carousel-arrow carousel-arrow-prev${canPrev ? '' : ' carousel-arrow--hidden'}`}
          onClick={() => scrollStep(-1)}
          aria-label="Anterior"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className={`carousel-arrow carousel-arrow-next${canNext ? '' : ' carousel-arrow--hidden'}`}
          onClick={() => scrollStep(1)}
          aria-label="Siguiente"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  )
}
