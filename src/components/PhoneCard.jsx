/**
 * PhoneCard
 *
 * Portfolio card styled as a phone mockup.
 * Shows the post thumbnail inside the phone screen.
 * On click → opens VideoModal with the real embed + link to IG/TikTok.
 */

import { useState } from 'react'
import VideoModal from './VideoModal'

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

export default function PhoneCard({ post }) {
  const [modalOpen, setModalOpen] = useState(false)
  const {
    platform, thumbClass, shapes,
    badgeLabel, hasPlay, countIcon, count,
    client, title, tags,
  } = post

  return (
    <>
      <article className="phone-card" onClick={() => setModalOpen(true)} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setModalOpen(true)}
        aria-label={`Ver ${title}`}
      >
        {/* ── Phone mockup ── */}
        <div className="phone-mockup">
          {/* Dynamic island */}
          <div className="phone-island" />

          {/* Screen content */}
          <div className="phone-screen">
            <div className={`post-thumb-inner phone-screen-inner ${thumbClass}`}>
              {shapes.map((s) => (
                <div key={s} className={`thumb-shape ${s}`} aria-hidden="true" />
              ))}

              {/* Platform badge */}
              <span className={`platform-badge ${platform === 'ig' ? 'badge-ig' : 'badge-tiktok'}`}>
                {platform === 'tiktok' && <span aria-hidden="true">♪</span>}
                {badgeLabel}
              </span>

              {/* Stats overlay */}
              <div className="views-overlay" aria-label={`${count} ${countIcon === 'play' ? 'views' : 'likes'}`}>
                {countIcon === 'play' ? <SmallPlayIcon /> : <HeartIcon />}
                {count}
              </div>

              {/* Tap hint — visible on hover */}
              <div className="phone-tap-hint" aria-hidden="true">
                {hasPlay ? <PlayIcon /> : <span style={{ fontSize: '1.5rem' }}>👆</span>}
              </div>
            </div>
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
