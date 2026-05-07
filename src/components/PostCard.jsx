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
const TK_CROP_TOP = 72   // oculta header (avatar + botones)
const TK_CROP_BOT = 155  // oculta copy, hashtags y audio
const TK_VIS_H = TK_H - TK_CROP_TOP - TK_CROP_BOT  // 513px visibles

function TikTokEmbed({ src, title }) {
  const wrapRef  = useRef(null)
  const iframeRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [ended, setEnded]  = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / TK_W)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Escucha eventos de TikTok embed para detectar fin del video
  useEffect(() => {
    const onMsg = (e) => {
      try {
        const d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        if (!d) return
        const isEnded =
          d.type === 'ended' ||
          d.event === 'ended' ||
          d.type === 'tiktok:video:end' ||
          (d.type === 'onPlayerStateChange' && d.value === 'ended')
        if (isEnded) setEnded(true)
      } catch {}
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  const replay = (e) => {
    e.stopPropagation()
    const iframe = iframeRef.current
    if (iframe) { iframe.src = ''; iframe.src = src }
    setEnded(false)
  }

  return (
    <div ref={wrapRef} className="post-tiktok-wrap">
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{
          width: TK_W,
          height: TK_H,
          transform: `scale(${scale}) translateY(-${TK_CROP_TOP}px)`,
          transformOrigin: 'top left',
          border: 'none',
        }}
      />
      {/* Overlay cuando el video termina: bloquea recomendados y ofrece replay */}
      {ended && (
        <div className="tiktok-ended-overlay" onClick={replay} role="button" aria-label="Reproducir de nuevo">
          <span className="tiktok-replay-icon">↺</span>
        </div>
      )}
      {/* Fallback estático: cubre "Videos relacionados" y "Ver ahora" */}
      <div className="tiktok-endscreen-guard" aria-hidden="true" />
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
