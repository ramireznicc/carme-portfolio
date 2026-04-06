/**
 * PhoneCard
 *
 * Portfolio card styled as a phone mockup.
 * Shows the post thumbnail inside the phone screen.
 * On click → opens VideoModal with the real embed + link to IG/TikTok.
 */

import { useState } from 'react'
import VideoModal from './VideoModal'
import IGSketchFrame from './IGSketchFrame'

const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const HeartIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const SmallPlayIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

/* Scale constants for the IG embed preview inside the small phone screen */
const IG_EMBED_W = 326
const PHONE_SCREEN_W = 164
const IG_SCALE = PHONE_SCREEN_W / IG_EMBED_W
const IG_EMBED_H = Math.round((PHONE_SCREEN_W * 17 / 9 + 50) / IG_SCALE)

export default function PhoneCard({ post }) {
  const [modalOpen, setModalOpen] = useState(false)
  const {
    platform, thumbClass, shapes,
    badgeLabel, hasPlay, countIcon, count,
    client, title, tags, embedUrl,
  } = post

  const hasVideoUrl = !!post.videoUrl
  const hasIgEmbed  = embedUrl && platform === 'ig' && !hasVideoUrl

  return (
    <>
      <article className="phone-card" onClick={() => setModalOpen(true)} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setModalOpen(true)}
        aria-label={`Ver ${title || 'post'}`}
      >
        {/* ── Phone mockup ── */}
        <div className="phone-mockup">
          {/* Dynamic island */}
          <div className="phone-island" />

          {/* Screen content */}
          <div className="phone-screen">
            {hasVideoUrl ? (
              /* Direct video URL → autoplay muted + sketch IG frame overlay */
              <div className="phone-embed-preview">
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
                <div className="phone-tap-hint" aria-hidden="true"><PlayIcon /></div>
              </div>
            ) : hasIgEmbed ? (
              /* Instagram embed preview — scaled down, non-interactive */
              <div className="phone-embed-preview">
                <iframe
                  src={embedUrl}
                  loading="lazy"
                  scrolling="no"
                  tabIndex={-1}
                  title={title || 'Instagram post'}
                  style={{
                    position: 'absolute',
                    top: '-44px',
                    left: 0,
                    width: IG_EMBED_W,
                    height: IG_EMBED_H,
                    transform: `scale(${IG_SCALE})`,
                    transformOrigin: 'top left',
                    border: 'none',
                    pointerEvents: 'none',
                  }}
                />
                <div className="phone-tap-hint" aria-hidden="true">
                  <PlayIcon />
                </div>
              </div>
            ) : (
              /* Gradient placeholder */
              <div className={`post-thumb-inner phone-screen-inner ${thumbClass}`}>
                {shapes.map((s) => (
                  <div key={s} className={`thumb-shape ${s}`} aria-hidden="true" />
                ))}
                <span className={`platform-badge ${platform === 'ig' ? 'badge-ig' : 'badge-tiktok'}`}>
                  {platform === 'tiktok' && <span aria-hidden="true">♪</span>}
                  {badgeLabel}
                </span>
                <div className="views-overlay" aria-label={`${count} ${countIcon === 'play' ? 'views' : 'likes'}`}>
                  {countIcon === 'play' ? <SmallPlayIcon /> : <HeartIcon />}
                  {count}
                </div>
                <div className="phone-tap-hint" aria-hidden="true">
                  {hasPlay ? <PlayIcon /> : <span style={{ fontSize: '1.5rem' }}>👆</span>}
                </div>
              </div>
            )}
          </div>

          {/* Home indicator */}
          <div className="phone-home-bar" />
        </div>

      </article>

      {modalOpen && (
        <VideoModal post={post} onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}
