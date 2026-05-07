/**
 * VideoModal
 *
 * Modal with prev/next navigation between posts in the same row.
 * Clean 9:16 container — no phone mockup.
 */

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const TK_W = 325
const TK_H = 740
const TK_CROP_TOP = 52   // oculta header (avatar + botones de TikTok)

function ModalTikTokEmbed({ src, title }) {
  const wrapRef = useRef(null)
  const [scale, setScale] = useState(1)
  const autoSrc = src.includes('?') ? src + '&autoplay=1' : src + '?autoplay=1'

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
        src={autoSrc}
        title={title || 'TikTok'}
        loading="eager"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: TK_W,
          height: TK_H,
          transform: `scale(${scale}) translateY(-${TK_CROP_TOP}px)`,
          transformOrigin: 'top left',
          border: 'none',
        }}
      />
    </div>
  )
}

function ModalIgEmbed({ src, title }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <iframe
        src={src}
        title={title || 'Instagram post'}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        style={{
          position: 'absolute',
          top: '-48px',
          left: '-1px',
          width: 'calc(100% + 2px)',
          height: 'calc(100% + 260px)',
          border: 'none',
        }}
        scrolling="no"
      />
    </div>
  )
}

function NoEmbedPlaceholder({ thumbClass, shapes }) {
  return (
    <div className={`post-thumb-inner ${thumbClass}`} style={{ width: '100%', height: '100%' }}>
      {shapes.map((s) => (
        <div key={s} className={`thumb-shape ${s}`} aria-hidden="true" />
      ))}
      <p style={{
        position: 'absolute', bottom: '24px', left: 0, right: 0,
        textAlign: 'center', color: 'rgba(255,255,255,0.85)',
        fontSize: '0.78rem', fontWeight: 600, padding: '0 16px',
      }}>
        Vista previa no disponible
      </p>
    </div>
  )
}

/* ── Icons for custom video controls ── */
const PauseIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" rx="1"/>
    <rect x="14" y="4" width="4" height="16" rx="1"/>
  </svg>
)
const PlayIconSm = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)
const MuteIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
)
const SoundIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
)

/* ── Custom timeline + play/pause + mute for local videos ── */
function VideoControls({ videoRef }) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration,    setDuration]    = useState(0)
  const [playing,     setPlaying]     = useState(true)
  const [muted,       setMuted]       = useState(true)
  const barRef      = useRef(null)
  const scrubbing   = useRef(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime  = () => setCurrentTime(v.currentTime)
    const onMeta  = () => setDuration(v.duration || 0)
    const onPlay  = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onVol   = () => setMuted(v.muted)
    v.addEventListener('timeupdate',     onTime)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('play',           onPlay)
    v.addEventListener('pause',          onPause)
    v.addEventListener('volumechange',   onVol)
    if (v.duration) setDuration(v.duration)
    setMuted(v.muted)
    setPlaying(!v.paused)
    return () => {
      v.removeEventListener('timeupdate',     onTime)
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('play',           onPlay)
      v.removeEventListener('pause',          onPause)
      v.removeEventListener('volumechange',   onVol)
    }
  }, [])

  const fmt = (s) => {
    if (!isFinite(s) || s < 0) return '0:00'
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
  }

  const seekFrom = (e) => {
    const bar = barRef.current
    const v   = videoRef.current
    if (!bar || !v || !duration) return
    const rect  = bar.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    v.currentTime = ratio * duration
    setCurrentTime(ratio * duration)
  }

  const onPointerDown = (e) => {
    scrubbing.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    seekFrom(e)
  }
  const onPointerMove = (e) => { if (scrubbing.current) seekFrom(e) }
  const onPointerUp   = ()  => { scrubbing.current = false }

  const togglePlay = (e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.paused ? v.play().catch(() => {}) : v.pause()
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    if (!v.muted && v.volume === 0) v.volume = 0.8
  }

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="modal-controls" onClick={(e) => e.stopPropagation()}>
      <button className="modal-ctrl-btn" onClick={togglePlay} aria-label={playing ? 'Pausar' : 'Reproducir'}>
        {playing ? <PauseIcon /> : <PlayIconSm />}
      </button>
      <span className="modal-time">{fmt(currentTime)}</span>
      <div
        ref={barRef}
        className="modal-progress-bar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="modal-progress-fill" style={{ width: `${pct}%` }} />
        <div className="modal-progress-thumb" style={{ left: `${pct}%` }} />
      </div>
      <span className="modal-time">{fmt(duration)}</span>
      <button className="modal-ctrl-btn" onClick={toggleMute} aria-label={muted ? 'Activar sonido' : 'Silenciar'}>
        {muted ? <MuteIcon /> : <SoundIcon />}
      </button>
    </div>
  )
}

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const TkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
)

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const ChevronLeft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default function VideoModal({ posts, index, onNavigate, onClose }) {
  const post = posts[index]
  const { platform, title, embedUrl, postUrl, thumbClass, shapes, videoUrl } = post
  const videoRef = useRef(null)
  const touchStartX = useRef(null)
  const isIg = platform === 'ig'
  const isTk = platform === 'tiktok'

  const canPrev = index > 0
  const canNext = index < posts.length - 1

  const goTo = (i) => onNavigate(i)

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) < 50) return
    if (diff > 0 && canNext) goTo(index + 1)
    else if (diff < 0 && canPrev) goTo(index - 1)
    touchStartX.current = null
  }

  // Fade audio out then close
  const handleClose = () => {
    const v = videoRef.current
    if (!v || v.muted || v.volume === 0) { onClose(); return }
    const start = v.volume
    const startTime = performance.now()
    const fade = (now) => {
      const progress = Math.min((now - startTime) / 350, 1)
      v.volume = start * (1 - progress)
      if (progress < 1) requestAnimationFrame(fade)
      else onClose()
    }
    requestAnimationFrame(fade)
  }

  // Autoplay via DOM (iOS-safe)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')
    const tryPlay = () => v.play().catch(() => {})
    tryPlay()
    const t = setTimeout(tryPlay, 100)
    return () => clearTimeout(t)
  }, [index])

  // Scroll lock + keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     handleClose()
      if (e.key === 'ArrowLeft'  && canPrev) goTo(index - 1)
      if (e.key === 'ArrowRight' && canNext) goTo(index + 1)
    }
    document.addEventListener('keydown', handler)
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.classList.remove('modal-open')
      window.scrollTo(0, scrollY)
    }
  }, [index, canPrev, canNext])

  return createPortal(
    <div
      className="modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button className="modal-close-btn" onClick={handleClose} aria-label="Cerrar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="modal-inner" onClick={(e) => e.stopPropagation()} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {/* Prev arrow */}
        <button
          className={`modal-nav-btn modal-nav-btn--prev${!canPrev ? ' modal-nav-btn--hidden' : ''}`}
          onClick={() => goTo(index - 1)}
          aria-label="Video anterior"
        >
          <ChevronLeft />
        </button>

        <div className={`modal-video-wrap${isTk ? ' modal-video-wrap--tiktok' : ''}`}>
          {videoUrl ? (
            <>
              <video
                key={index}
                ref={videoRef}
                src={videoUrl}
                autoPlay
                playsInline
                onCanPlay={(e) => { e.target.play().catch(() => {}) }}
                style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000', display: 'block' }}
              />
              <VideoControls key={`ctrl-${index}`} videoRef={videoRef} />
            </>
          ) : isTk ? (
            <ModalTikTokEmbed key={index} src={embedUrl} title={title} />
          ) : isIg ? (
            <ModalIgEmbed key={index} src={embedUrl} title={title} />
          ) : (
            <NoEmbedPlaceholder thumbClass={thumbClass} shapes={shapes} />
          )}

          {postUrl && (
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`modal-cta-btn${isTk ? ' modal-cta-btn--tiktok' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              {isIg ? <IgIcon /> : <TkIcon />}
              {isIg ? 'Ver en Instagram' : 'Ver en TikTok'}
              <ExternalIcon />
            </a>
          )}
        </div>

        {/* Next arrow */}
        <button
          className={`modal-nav-btn modal-nav-btn--next${!canNext ? ' modal-nav-btn--hidden' : ''}`}
          onClick={() => goTo(index + 1)}
          aria-label="Video siguiente"
        >
          <ChevronRight />
        </button>
      </div>
    </div>,
    document.body
  )
}
