import { useRef, useState, useCallback } from 'react'
import FadeIn from './FadeIn'
import PhoneCard from './PhoneCard'
import { categories } from '../data/posts'

/* ── Horizontal drag-to-scroll row ── */
function ScrollRow({ posts }) {
  const rowRef  = useRef(null)
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false })
  const [dragging, setDragging] = useState(false)

  const onMouseDown = (e) => {
    if (e.button !== 0) return
    const el = rowRef.current
    dragRef.current = { active: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, moved: false }
    setDragging(false)
  }
  const onMouseMove = (e) => {
    const d = dragRef.current
    if (!d.active) return
    e.preventDefault()
    const x    = e.pageX - rowRef.current.offsetLeft
    const walk = (x - d.startX) * 1.2
    if (Math.abs(walk) > 4) { d.moved = true; setDragging(true) }
    rowRef.current.scrollLeft = d.scrollLeft - walk
  }
  const onMouseUp = () => { dragRef.current.active = false; setTimeout(() => setDragging(false), 0) }
  const onClickCapture = (e) => {
    if (dragRef.current.moved) { e.stopPropagation(); dragRef.current.moved = false }
  }

  return (
    <div
      className={`cat-scroll-row${dragging ? ' is-dragging' : ''}`}
      ref={rowRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onClickCapture={onClickCapture}
    >
      {posts.map((post, i) => (
        <FadeIn key={post.id} delay={i * 70}>
          <PhoneCard post={post} />
        </FadeIn>
      ))}
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
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              <span className="cat-nav-num" style={{ color: cat.accent === '#e7fe71' ? '#8a9400' : cat.accent }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="cat-nav-label">{cat.title}</span>
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

            <div className="cat-rows">
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
