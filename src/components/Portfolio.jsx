import { useState } from 'react'
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
  const [active, setActive] = useState('all')

  const visible = posts.filter((p) => matchesFilter(p, active))

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

      {/* Grid */}
      <div className="portfolio-grid">
        {visible.map((post, i) => (
          <FadeIn key={post.id} delay={i * 80}>
            <PostCard post={post} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
