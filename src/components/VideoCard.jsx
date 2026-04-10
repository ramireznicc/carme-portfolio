/**
 * VideoCard
 *
 * Portfolio card — plain rounded video, no phone mockup.
 * Click opens VideoModal with full embed + link to IG/TikTok.
 */

import { useRef, useEffect, useState } from 'react'
import IGSketchFrame from './IGSketchFrame'

/* Scale constants for IG embed preview inside the card */
const IG_EMBED_W = 326
const CARD_W     = 200
const IG_SCALE   = CARD_W / IG_EMBED_W
const IG_EMBED_H = Math.round((CARD_W * 17 / 9 + 50) / IG_SCALE)

/* TikTok player natural dimensions */
const TK_W = 325
const TK_H = 740

function TikTokPreview({ src, title }) {
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
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <iframe
        src={src}
        title={title || 'TikTok'}
        loading="lazy"
        style={{
          width: TK_W,
          height: TK_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          border: 'none',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

const PlayOverlay = () => (
  <div className="video-card-play" aria-hidden="true">
    <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  </div>
)

const TkIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="36" height="36" style={{ opacity: 0.9, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
)

export default function VideoCard({ post, onOpen, loadEmbed = true }) {
  const { platform, embedUrl, title, thumbClass, shapes } = post
  const hasVideoUrl = !!post.videoUrl
  const hasIgEmbed  = embedUrl && platform === 'ig'  && !hasVideoUrl
  const hasTkEmbed  = embedUrl && platform === 'tiktok' && !hasVideoUrl
  // noMeta: shift embed so only the media is visible (clips header and actions bar)
  const igTop = post.noMeta ? '-37px' : '-62px'

  return (
    <>
      <article
        className="video-card"
        onClick={onOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpen?.()}
        aria-label={`Ver ${title || 'post'}`}
      >
        <div className="video-card-screen">
          {hasVideoUrl ? (
            <>
              <video
                src={post.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
              />
              <IGSketchFrame
                avatarUrl={post.owner?.avatar ?? '/lucilaPerfil.jpg'}
                name={post.owner?.name ?? 'Lucila De Ponti'}
                handle={post.owner?.handle ?? '@luciladepont1'}
              />
            </>
          ) : hasIgEmbed ? (
            <iframe
              src={embedUrl}
              loading="lazy"
              scrolling="no"
              tabIndex={-1}
              title={title || 'Instagram post'}
              style={{
                position: 'absolute',
                top: igTop,
                left: '-1px',
                width: IG_EMBED_W + 2,
                height: IG_EMBED_H,
                transform: `scale(${IG_SCALE})`,
                transformOrigin: 'top left',
                border: 'none',
                pointerEvents: 'none',
              }}
            />
          ) : hasTkEmbed && loadEmbed ? (
            <TikTokPreview src={embedUrl} title={title} />
          ) : hasTkEmbed ? (
            /* Placeholder until section enters viewport */
            <div className={`post-thumb-inner ${thumbClass}`} style={{ borderRadius: 'inherit', width: '100%', height: '100%' }}>
              {shapes.map((s) => (
                <div key={s} className={`thumb-shape ${s}`} aria-hidden="true" />
              ))}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <TkIcon />
              </div>
            </div>
          ) : (
            <div
              className={`post-thumb-inner ${thumbClass}`}
              style={{ borderRadius: 'inherit', width: '100%', height: '100%' }}
            >
              {shapes.map((s) => (
                <div key={s} className={`thumb-shape ${s}`} aria-hidden="true" />
              ))}
            </div>
          )}
          <PlayOverlay />
        </div>
      </article>

    </>
  )
}
