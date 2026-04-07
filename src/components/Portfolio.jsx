import { useRef, useState, useCallback, useEffect } from 'react'
import FadeIn from './FadeIn'
import PhoneCard from './PhoneCard'
import { categories } from '../data/posts'

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}


const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)
const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

/* ── 3-up carousel row ── */
function ScrollRow({ posts }) {
  const wrapRef  = useRef(null)
  // active = index of the center card; starts at 1 so cards [0,1,2] are visible
  const [active, setActive] = useState(Math.min(1, posts.length - 1))
  const [tx, setTx] = useState(0)

  const GAP = 16

  const calcTx = useCallback((idx) => {
    const wrap = wrapRef.current
    if (!wrap) return 0
    const w = wrap.offsetWidth
    // step = width of one card slot (card + gap)
    const step = (w + GAP) / 3
    return -(idx - 1) * step
  }, [])

  const moveTo = useCallback((idx) => {
    const clamped = Math.max(1, Math.min(posts.length - 2, idx))
    setActive(clamped)
    setTx(calcTx(clamped))
  }, [posts.length, calcTx])

  // Initialize translate on mount and on resize
  useEffect(() => {
    setTx(calcTx(active))
  }, []) // eslint-disable-line

  useEffect(() => {
    const onResize = () => setTx(calcTx(active))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active, calcTx])

  const canPrev = active > 1
  const canNext = active < posts.length - 2
  const trackRef = useRef(null)
  const activeRef = useRef(active)
  useEffect(() => { activeRef.current = active }, [active])

  // Touch swipe — finger follows in real time, snaps on release
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    let startX = null, startY = null, locked = null, baseTx = 0

    const getTrack = () => wrap.querySelector('.cat-scroll-row')
    const setTrackTx = (x, animated) => {
      const t = getTrack()
      if (!t) return
      t.style.transition = animated
        ? 'transform 0.38s cubic-bezier(0.25, 1, 0.35, 1)'
        : 'none'
      t.style.transform = `translateX(${x}px)`
    }

    let lastX = null, lastT = null

    const onStart = (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      lastX = startX
      lastT = Date.now()
      locked = null
      const w = wrap.offsetWidth
      const step = (w + 16) / 3
      baseTx = -(activeRef.current - 1) * step
    }
    const onMove = (e) => {
      if (startX === null) return
      const dx = e.touches[0].clientX - startX
      const dy = e.touches[0].clientY - startY
      if (locked === null) locked = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v'
      if (locked !== 'h') return
      e.preventDefault()
      lastX = e.touches[0].clientX
      lastT = Date.now()
      // 1:1 follow with soft rubber-band at edges
      const w = wrap.offsetWidth
      const step = (w + 16) / 3
      const maxSteps = posts.length - 3  // how many steps can move
      const minTx = -(maxSteps) * step
      const target = baseTx + dx
      const rubber = (v, limit) => limit + (v - limit) * 0.25
      const clamped = target < minTx ? rubber(target, minTx)
                    : target > 0     ? rubber(target, 0)
                    : target
      setTrackTx(clamped, false)
    }
    const onEnd = (e) => {
      if (startX === null || locked !== 'h') { startX = null; return }
      const dx = startX - e.changedTouches[0].clientX
      const dt = Date.now() - lastT
      const velocity = (lastX - e.changedTouches[0].clientX) / Math.max(dt, 1) // px/ms
      const w = wrap.offsetWidth
      const step = (w + 16) / 3
      // trigger on either distance (10%) OR flick velocity (0.3px/ms)
      const threshold = step * 0.10
      const cur = activeRef.current
      let next = cur
      if (dx > threshold || velocity > 0.3)  next = Math.min(posts.length - 2, cur + 1)
      else if (dx < -threshold || velocity < -0.3) next = Math.max(1, cur - 1)
      const snapTx = -(next - 1) * step
      setTrackTx(snapTx, true)
      if (next !== cur) moveTo(next)
      startX = null
    }

    wrap.addEventListener('touchstart', onStart, { passive: true })
    wrap.addEventListener('touchmove',  onMove,  { passive: false })
    wrap.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      wrap.removeEventListener('touchstart', onStart)
      wrap.removeEventListener('touchmove',  onMove)
      wrap.removeEventListener('touchend',   onEnd)
    }
  }, [posts.length, moveTo])

  // Handle edge case: fewer than 3 posts → just show them all without arrows
  if (posts.length <= 3) {
    return (
      <div className="cat-scroll-row-wrap">
        <div className="cat-scroll-row cat-scroll-row--static">
          {posts.map((post, i) => (
            <FadeIn key={post.id} delay={i * 70}>
              <PhoneCard post={post} />
            </FadeIn>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={wrapRef} className="cat-scroll-row-wrap">
      <button
        className={`scroll-arrow scroll-arrow--prev${!canPrev ? ' scroll-arrow--hidden' : ''}`}
        onClick={() => moveTo(active - 1)}
        aria-label="Anterior"
        tabIndex={-1}
      >
        <ChevronLeft />
      </button>

      <div
        className="cat-scroll-row"
        style={{ transform: `translateX(${tx}px)` }}
      >
        {posts.map((post, i) => (
          <FadeIn key={post.id} delay={i * 70}>
            <PhoneCard post={post} />
          </FadeIn>
        ))}
      </div>

      <button
        className={`scroll-arrow scroll-arrow--next${!canNext ? ' scroll-arrow--hidden' : ''}`}
        onClick={() => moveTo(active + 1)}
        aria-label="Siguiente"
        tabIndex={-1}
      >
        <ChevronRight />
      </button>

      {/* Dot indicators */}
      <div className="scroll-dots">
        {posts.map((_, i) => (
          i > 0 && i < posts.length - 1 && (
            <button
              key={i}
              className={`scroll-dot${i === active ? ' scroll-dot--active' : ''}`}
              onClick={() => moveTo(i)}
              aria-label={`Ir al video ${i}`}
              tabIndex={-1}
            />
          )
        ))}
      </div>
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
                  <ScrollRow posts={row.posts} />
                </div>
              ))}

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
