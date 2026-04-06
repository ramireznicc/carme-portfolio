/**
 * IGSketchFrame
 * Hand-drawn / illustrated Instagram-style overlay for video previews.
 * Sits on top of the video — header with profile info + bottom action icons.
 * Clearly animated so it reads as illustration, not a real screenshot.
 */

export default function IGSketchFrame({ avatarUrl, name, handle }) {
  return (
    <svg
      viewBox="0 0 164 310"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Sketch / hand-drawn wobble filter */}
        <filter id="igsk" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves="4" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4"
            xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Avatar clip */}
        <clipPath id="av-clip">
          <circle cx="22" cy="23" r="12" />
        </clipPath>
      </defs>

      {/* ── Top bar ── */}
      <rect x="0" y="0" width="164" height="38" fill="rgba(255,255,255,0.95)" />

      {/* Avatar */}
      {avatarUrl
        ? <image href={avatarUrl} x="9" y="7" width="24" height="24" clipPath="url(#av-clip)" />
        : <circle cx="22" cy="19" r="12" fill="#444" filter="url(#igsk)" />
      }
      {/* Avatar ring — sketch style */}
      <circle cx="22" cy="19" r="12" fill="none"
        stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" filter="url(#igsk)" />

      {/* Name */}
      <text x="40" y="16" fontSize="8.5" fontWeight="700" fill="#1a1a1a"
        fontFamily="DM Sans, sans-serif" filter="url(#igsk)">
        {name}
      </text>
      {/* Handle */}
      <text x="40" y="28" fontSize="7" fill="rgba(0,0,0,0.5)"
        fontFamily="DM Sans, sans-serif" filter="url(#igsk)">
        {handle}
      </text>

      {/* ── Bottom bar ── */}
      <rect x="0" y="274" width="164" height="36" fill="rgba(255,255,255,0.95)" />

      {/* Heart — animated pulse */}
      <g className="ig-sk-heart" filter="url(#igsk)">
        <path
          d="M18,290 C18,286 13,284 11,287 C9,290 13,295 18,300 C23,295 27,290 25,287 C23,284 18,286 18,290 Z"
          fill="#ff4060" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"
        />
      </g>

      {/* Comment bubble */}
      <g filter="url(#igsk)">
        <path
          d="M36,284 Q36,281 39,281 L52,281 Q55,281 55,284 L55,294 Q55,297 52,297 L42,297 L37,301 L38,297 Q36,297 36,294 Z"
          fill="none" stroke="rgba(0,0,0,0.75)" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </g>

      {/* Bookmark */}
      <g filter="url(#igsk)">
        <path
          d="M140,282 L151,282 L151,300 L145.5,296 L140,300 Z"
          fill="none" stroke="rgba(0,0,0,0.75)" strokeWidth="1.7"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
