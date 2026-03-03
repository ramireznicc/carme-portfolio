/**
 * PostCard
 *
 * Renders a single portfolio card.
 * - Instagram embeds: iframe con crop de header via CSS
 * - TikTok embeds: iframe escalado con ResizeObserver para evitar recortes
 */

import { useRef, useEffect, useState } from 'react'

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

// Dimensiones naturales del player de TikTok embed v2
const TK_W = 325
const TK_H = 740

function TikTokEmbed({ src, title }) {
  const wrapRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / TK_W)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="post-tiktok-wrap">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{
          width: TK_W,
          height: TK_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          border: 'none',
        }}
      />
      <div className="tiktok-swipe-guard" aria-hidden="true" />
    </div>
  )
}

export default function PostCard({ post }) {
  const {
    platform, aspectRatio, thumbClass, shapes,
    badgeLabel, hasPlay, countIcon, count,
    client, title, tags, embedUrl,
  } = post

  return (
    <article className="post-card">
      {/* ── Thumbnail ── */}
      <div className={`post-thumb ${aspectRatio}${embedUrl && platform === 'tiktok' ? ' tiktok-embed-container' : ''}`}>
        {embedUrl && platform === 'tiktok' ? (
          <TikTokEmbed src={embedUrl} title={title} />
        ) : embedUrl ? (
          <>
            <iframe
              src={embedUrl}
              className={`post-embed post-embed-${platform}`}
              loading="lazy"
              title={title}
            />
            {/* Captura touch events en mobile para que el swipe del carrusel funcione.
                Al tap abre el post en Instagram. */}
            <a
              href={embedUrl.replace('/embed/', '/')}
              target="_blank"
              rel="noopener noreferrer"
              className="embed-swipe-guard"
              aria-label="Ver en Instagram"
            />
          </>
        ) : (
          <div className={`post-thumb-inner ${thumbClass}`}>
            {shapes.map((s) => (
              <div key={s} className={`thumb-shape ${s}`} aria-hidden="true" />
            ))}
            <span className={`platform-badge ${platform === 'ig' ? 'badge-ig' : 'badge-tiktok'}`}>
              {platform === 'tiktok' && <span aria-hidden="true">♪</span>}
              {badgeLabel}
            </span>
            {hasPlay && <div className="play-btn" aria-label="Reproducir video" />}
            <div className="views-overlay" aria-label={`${count} ${countIcon === 'play' ? 'views' : 'likes'}`}>
              {countIcon === 'play' ? <PlayIcon /> : <HeartIcon />}
              {count}
            </div>
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <div className="post-info">
        <div className="post-client">{client}</div>
        <div className="post-title">{title}</div>
        <div className="post-tags">
          {tags.map((tag) => (
            <span key={tag} className="post-tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
