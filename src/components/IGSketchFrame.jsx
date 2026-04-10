/**
 * IGSketchFrame
 * Hand-drawn / illustrated Instagram-style overlay for video previews.
 * Sits on top of the video — header with profile info + bottom action icons.
 * viewBox is 180×320 (exactly 9:16) so it fills the VideoCard without gaps.
 */

export default function IGSketchFrame({ avatarUrl, name, handle }) {
  return (
    <svg
      viewBox="0 0 180 320"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="none"
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
      <rect x="0" y="0" width="180" height="38" fill="rgba(255,255,255,0.95)" />

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
      <rect x="0" y="284" width="180" height="36" fill="rgba(255,255,255,0.95)" />

      {/* Heart — animated pulse */}
      <g className="ig-sk-heart" filter="url(#igsk)">
        <path
          d="M18,300 C18,296 13,294 11,297 C9,300 13,305 18,310 C23,305 27,300 25,297 C23,294 18,296 18,300 Z"
          fill="#ff4060" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"
        />
      </g>

      {/* Comment bubble */}
      <g filter="url(#igsk)">
        <path
          d="M36,294 Q36,291 39,291 L52,291 Q55,291 55,294 L55,304 Q55,307 52,307 L42,307 L37,311 L38,307 Q36,307 36,304 Z"
          fill="none" stroke="rgba(0,0,0,0.75)" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </g>

      {/* Bookmark */}
      <g filter="url(#igsk)">
        <path
          d="M155,292 L166,292 L166,310 L160.5,306 L155,310 Z"
          fill="none" stroke="rgba(0,0,0,0.75)" strokeWidth="1.7"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
