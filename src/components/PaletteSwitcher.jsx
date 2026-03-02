import { useState } from 'react'
import { palettes } from '../data/palettes'

function applyPalette(palette) {
  const root = document.documentElement
  Object.entries(palette.tokens).forEach(([prop, value]) => {
    root.style.setProperty(prop, value)
  })
}

export default function PaletteSwitcher() {
  const [idx, setIdx] = useState(0)

  const prev = () => {
    const next = (idx - 1 + palettes.length) % palettes.length
    setIdx(next)
    applyPalette(palettes[next])
  }

  const next = () => {
    const n = (idx + 1) % palettes.length
    setIdx(n)
    applyPalette(palettes[n])
  }

  const current = palettes[idx]

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 9998,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 12px',
      background: 'rgba(255,255,255,0.75)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: 100,
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      border: '1px solid rgba(0,0,0,0.08)',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '0.75rem',
      color: '#333',
      userSelect: 'none',
    }}>
      {/* Flecha izquierda */}
      <button onClick={prev} style={arrowStyle} title="Paleta anterior">‹</button>

      {/* Swatches */}
      <div style={{ display: 'flex', gap: 4 }}>
        {current.colors.map((c) => (
          <span key={c} style={{
            width: 14, height: 14,
            borderRadius: '50%',
            background: c,
            border: '1px solid rgba(0,0,0,0.12)',
            display: 'inline-block',
          }} />
        ))}
      </div>

      {/* Nombre */}
      <span style={{ fontWeight: 600, whiteSpace: 'nowrap', fontSize: '0.72rem', color: '#444' }}>
        {idx + 1}/{palettes.length} · {current.name}
      </span>

      {/* Flecha derecha */}
      <button onClick={next} style={arrowStyle} title="Siguiente paleta">›</button>
    </div>
  )
}

const arrowStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.1rem',
  lineHeight: 1,
  padding: '0 2px',
  color: '#555',
  fontFamily: 'inherit',
}
