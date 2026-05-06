import { useRef, useEffect, useState } from 'react'
import IGSketchFrame from './IGSketchFrame'

/* ── Scale constants ── */
const IG_EMBED_W = 326
const CARD_W     = 200
const IG_SCALE   = CARD_W / IG_EMBED_W
const IG_EMBED_H = Math.round((CARD_W * 17 / 9 + 50) / IG_SCALE)

/* ── Module-level thumbnail cache (fetched once per session) ── */
const tkThumbCache = {}

/* ─────────────────────────────────────────────────────────────
   Local video card
   Active  → plays muted from frame 0
   Inactive → paused at frame 0 (shows thumbnail naturally)
   ───────────────────────────────────────────────────────────── */
function LocalVideoCard({ post, isActive }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (isActive) {
      v.currentTime = 0
      v.play().catch(() => {})
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [isActive])

  return (
    <>
      <video
        ref={videoRef}
        src={post.videoUrl}
        muted
        playsInline
        loop
        preload="metadata"
        style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      />
      {isActive && (
        <IGSketchFrame
          avatarUrl={post.owner?.avatar ?? '/lucilaPerfil.jpg'}
          name={post.owner?.name ?? 'Lucila De Ponti'}
          handle={post.owner?.handle ?? '@luciladepont1'}
        />
      )}
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   TikTok static thumbnail — fetched via oEmbed, shown as <img>
   Falls back to colored thumb while loading
   ───────────────────────────────────────────────────────────── */
function TikTokStaticThumb({ postUrl, thumbClass, shapes, shouldLoad }) {
  const [thumbUrl, setThumbUrl] = useState(tkThumbCache[postUrl] || null)

  useEffect(() => {
    if (!shouldLoad || !postUrl || thumbUrl) return
    let cancelled = false
    fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(postUrl)}`)
      .then(r => r.json())
      .then(data => {
        if (!cancelled && data.thumbnail_url) {
          tkThumbCache[postUrl] = data.thumbnail_url
          setThumbUrl(data.thumbnail_url)
        }
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [shouldLoad, postUrl])

  if (!thumbUrl) return <StaticThumb thumbClass={thumbClass} shapes={shapes} />

  return (
    <img
      src={thumbUrl}
      alt=""
      style={{
        width: '100%', height: '100%',
        objectFit: 'cover',
        borderRadius: 'inherit',
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}

/* ─────────────────────────────────────────────────────────────
   Fallback colored thumbnail (no embed, no local file)
   ───────────────────────────────────────────────────────────── */
const StaticThumb = ({ thumbClass, shapes }) => (
  <div className={`post-thumb-inner ${thumbClass}`}
    style={{ borderRadius: 'inherit', width: '100%', height: '100%' }}>
    {shapes.map(s => <div key={s} className={`thumb-shape ${s}`} aria-hidden="true" />)}
  </div>
)

const PlayOverlay = () => (
  <div className="video-card-play" aria-hidden="true">
    <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  </div>
)

/* ─────────────────────────────────────────────────────────────
   Main card component
   ───────────────────────────────────────────────────────────── */
export default function VideoCard({ post, onOpen, loadEmbed = true, isActive = false }) {
  const { platform, embedUrl, title, thumbClass, shapes } = post
  const hasVideoUrl = !!post.videoUrl
  const hasIgEmbed  = embedUrl && platform === 'ig'     && !hasVideoUrl
  const hasTkEmbed  = embedUrl && platform === 'tiktok' && !hasVideoUrl
  const igTop = post.noMeta ? '-37px' : '-62px'

  return (
    <article
      className="video-card"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen?.()}
      aria-label={`Ver ${title || 'post'}`}
    >
      <div className="video-card-screen">

        {/* ── Local video (CM Instagram) ── */}
        {hasVideoUrl ? (
          <LocalVideoCard post={post} isActive={isActive} />

        /* ── IG embed: always visible (shows post cover by default) ── */
        ) : hasIgEmbed ? (
          <iframe
            src={embedUrl}
            loading="lazy"
            scrolling="no"
            tabIndex={-1}
            title={title || 'Instagram post'}
            allow="autoplay"
            style={{
              position: 'absolute',
              top: igTop, left: '-1px',
              width: IG_EMBED_W + 2, height: IG_EMBED_H,
              transform: `scale(${IG_SCALE})`,
              transformOrigin: 'top left',
              border: 'none', pointerEvents: 'none',
            }}
          />

        /* ── TikTok: static thumbnail (embed only in modal) ── */
        ) : hasTkEmbed ? (
          <TikTokStaticThumb
            postUrl={post.postUrl}
            thumbClass={thumbClass}
            shapes={shapes}
            shouldLoad={loadEmbed}
          />

        ) : (
          <StaticThumb thumbClass={thumbClass} shapes={shapes} />
        )}

        <PlayOverlay />
      </div>
    </article>
  )
}
