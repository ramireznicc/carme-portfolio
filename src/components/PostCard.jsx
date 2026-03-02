/**
 * PostCard
 *
 * Renders a single portfolio card.
 * Ready for future embed integration: add an `embedUrl` field to the post
 * object and conditionally render an <iframe> instead of the gradient placeholder.
 */

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

export default function PostCard({ post }) {
  const {
    platform, aspectRatio, thumbClass, shapes,
    badgeLabel, hasPlay, countIcon, count,
    client, title, tags,
    // embedUrl,  // future: use this to render real embeds
  } = post

  return (
    <article className="post-card">
      {/* ── Thumbnail ── */}
      <div className={`post-thumb ${aspectRatio}`}>
        <div className={`post-thumb-inner ${thumbClass}`}>
          {/* Decorative shapes */}
          {shapes.map((s) => (
            <div key={s} className={`thumb-shape ${s}`} aria-hidden="true" />
          ))}

          {/* Platform badge */}
          <span className={`platform-badge ${platform === 'ig' ? 'badge-ig' : 'badge-tiktok'}`}>
            {platform === 'tiktok' && <span aria-hidden="true">♪</span>}
            {badgeLabel}
          </span>

          {/* Play button (videos only) */}
          {hasPlay && <div className="play-btn" aria-label="Reproducir video" />}

          {/* Views / likes counter */}
          <div className="views-overlay" aria-label={`${count} ${countIcon === 'play' ? 'views' : 'likes'}`}>
            {countIcon === 'play' ? <PlayIcon /> : <HeartIcon />}
            {count}
          </div>
        </div>
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
