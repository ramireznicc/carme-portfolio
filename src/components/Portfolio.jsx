import { useState, useRef, useEffect, useCallback } from 'react'
import FadeIn from './FadeIn'
import PhoneCard from './PhoneCard'
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
  const [active, setActive]     = useState('all')
  const [canPrev, setCanPrev]   = useState(false)
  const [canNext, setCanNext]   = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const gridRef  = useRef(null)
  const dragRef  = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false })

  const visible = posts.filter((p) => matchesFilter(p, active))

  const updateArrows = useCallback(() => {
    const el = gridRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  useEffect(() => { updateArrows() }, [visible, updateArrows])

  const scrollStep = (dir) => {
    const el = gridRef.current
    if (!el) return
    const card = el.querySelector('.reveal')
    const step = (card?.offsetWidth ?? 230) + 20
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // ── Drag-to-scroll (desktop only) ──
  const onMouseDown = (e) => {
    if (e.button !== 0) return
    const el = gridRef.current
    dragRef.current = { active: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, moved: false }
    setIsDragging(false)
  }
  const onMouseMove = (e) => {
    const d = dragRef.current
    if (!d.active) return
    e.preventDefault()
    const x    = e.pageX - gridRef.current.offsetLeft
    const walk = (x - d.startX) * 1.2
    if (Math.abs(walk) > 4) { d.moved = true; setIsDragging(true) }
    gridRef.current.scrollLeft = d.scrollLeft - walk
  }
  const onMouseUp = () => {
    dragRef.current.active = false
    setTimeout(() => setIsDragging(false), 0)
  }

  // Prevent click-through on cards after a drag
  const onClickCapture = (e) => {
    if (dragRef.current.moved) { e.stopPropagation(); dragRef.current.moved = false }
  }

  return (
    <section className="portfolio-section section" id="portfolio">
      <FadeIn className="section-header">
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">Trabajos y Proyectos</h2>
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
          className={`portfolio-grid${isDragging ? ' is-dragging' : ''}`}
          ref={gridRef}
          onScroll={updateArrows}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onClickCapture={onClickCapture}
        >
          {visible.map((post, i) => (
            <FadeIn key={post.id} delay={i * 80}>
              <PhoneCard post={post} />
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
