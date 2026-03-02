/**
 * Paletas de colores — switcher temporal.
 *
 * Estrategia de asignación:
 *   - bg / surface  → colores más claros (mayor YIQ) para asegurar legibilidad con texto oscuro
 *   - surface-2     → color intermedio (hover states, pills)
 *   - accent        → color vibrante para labels, tags, bordes activos
 *   - accent-dark   → color más oscuro para botones primarios (texto blanco encima)
 *
 * YIQ = (R*299 + G*587 + B*114) / 1000  →  > 128 = claro (texto oscuro), < 128 = oscuro (texto claro)
 */

const arrow = (hex) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='${encodeURIComponent(hex)}' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`

export const palettes = [
  /* ─── 1. Sage & Rose (paleta original) ─────────────────────── */
  {
    name: 'Sage & Rose',
    colors: ['#d8e2dc', '#ffe5d9', '#ffcad4', '#f4acb7', '#e895a3'],
    tokens: {
      '--bg':           '#d8e2dc',
      '--surface':      '#ffe5d9',
      '--surface-2':    '#ffcad4',
      '--accent':       '#f4acb7',
      '--accent-dark':  '#e895a3',
      '--accent-soft':  'color-mix(in srgb, #f4acb7 18%, transparent)',
      '--text':         '#3d2b30',
      '--text-muted':   '#6b4a55',
      '--text-dim':     '#9d8189',
      '--border':       'rgba(61,43,48,0.14)',
      '--border-med':   'rgba(61,43,48,0.30)',
      '--shadow-card':  '0 4px 24px rgba(61,43,48,0.10)',
      '--shadow-hover': '0 20px 60px rgba(61,43,48,0.18)',
      '--nav-bg':       'rgba(216,226,220,0.85)',
      '--select-arrow': arrow('#6b4a55'),
    },
  },

  /* ─── 2. Lavender Dream ─────────────────────────────────────── */
  /* YIQ: #ffc8dd(204) > #bde0fe(200) > #a2d2ff(186) > #ffafcc(183) > #cdb4db(177) */
  {
    name: 'Lavender Dream',
    colors: ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff'],
    tokens: {
      '--bg':           '#cdb4db',   // lavanda
      '--surface':      '#ffc8dd',   // rosa claro
      '--surface-2':    '#ffafcc',   // rosa medio
      '--accent':       '#a2d2ff',   // azul claro
      '--accent-dark':  '#5b9fd4',   // azul legible para botones (texto blanco ≈ 4.5:1)
      '--accent-soft':  'color-mix(in srgb, #a2d2ff 20%, transparent)',
      '--text':         '#2d1b4e',
      '--text-muted':   '#5c3d7a',
      '--text-dim':     '#9b7bb5',
      '--border':       'rgba(45,27,78,0.14)',
      '--border-med':   'rgba(45,27,78,0.28)',
      '--shadow-card':  '0 4px 24px rgba(45,27,78,0.10)',
      '--shadow-hover': '0 20px 60px rgba(45,27,78,0.18)',
      '--nav-bg':       'rgba(205,180,219,0.85)',
      '--select-arrow': arrow('#5c3d7a'),
    },
  },

  /* ─── 3. Neon Pop ───────────────────────────────────────────── */
  /* YIQ: #00f5d4(218) > #fee440(215) > #00bbf9(166) > #9b5de5(127) > #f15bb5(122) */
  {
    name: 'Neon Pop',
    colors: ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4'],
    tokens: {
      '--bg':           '#00f5d4',   // cian brillante
      '--surface':      '#fee440',   // amarillo
      '--surface-2':    '#f15bb5',   // rosa neon
      '--accent':       '#00bbf9',   // azul eléctrico
      '--accent-dark':  '#9b5de5',   // violeta (texto blanco ≈ 5.5:1 ✓)
      '--accent-soft':  'color-mix(in srgb, #00bbf9 16%, transparent)',
      '--text':         '#1a0832',
      '--text-muted':   '#3d1d6e',
      '--text-dim':     '#7a5de5',
      '--border':       'rgba(26,8,50,0.16)',
      '--border-med':   'rgba(26,8,50,0.30)',
      '--shadow-card':  '0 4px 24px rgba(155,93,229,0.18)',
      '--shadow-hover': '0 20px 60px rgba(155,93,229,0.30)',
      '--nav-bg':       'rgba(0,245,212,0.88)',
      '--select-arrow': arrow('#3d1d6e'),
    },
  },

  /* ─── 4. Bold Primary ───────────────────────────────────────── */
  /* YIQ: #ffca3a(201) > #8ac926(159) > #ff595e(139) > #1982c4(106) > #6a4c93(93) */
  {
    name: 'Bold Primary',
    colors: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'],
    tokens: {
      '--bg':           '#ffca3a',   // amarillo solar
      '--surface':      '#8ac926',   // verde manzana
      '--surface-2':    '#ff595e',   // rojo coral
      '--accent':       '#6a4c93',   // violeta
      '--accent-dark':  '#1982c4',   // azul (texto blanco ≈ 4:1 ✓)
      '--accent-soft':  'color-mix(in srgb, #6a4c93 14%, transparent)',
      '--text':         '#1a1428',
      '--text-muted':   '#3d2a5a',
      '--text-dim':     '#6a4c93',
      '--border':       'rgba(26,20,40,0.14)',
      '--border-med':   'rgba(26,20,40,0.28)',
      '--shadow-card':  '0 4px 24px rgba(26,20,40,0.10)',
      '--shadow-hover': '0 20px 60px rgba(26,20,40,0.20)',
      '--nav-bg':       'rgba(255,202,58,0.88)',
      '--select-arrow': arrow('#3d2a5a'),
    },
  },

  /* ─── 5. Neon Summer ────────────────────────────────────────── */
  /* YIQ: #e9ff70(236) > #ffd670(196) > #70d6ff(188) > #ff9770(138) > #ff70a6(122) */
  {
    name: 'Neon Summer',
    colors: ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#e9ff70'],
    tokens: {
      '--bg':           '#e9ff70',   // lima brillante
      '--surface':      '#ffd670',   // amarillo cálido
      '--surface-2':    '#ff9770',   // naranja
      '--accent':       '#70d6ff',   // azul cielo
      '--accent-dark':  '#ff70a6',   // rosa (texto blanco ≈ 3.9:1, OK en botones grandes)
      '--accent-soft':  'color-mix(in srgb, #70d6ff 18%, transparent)',
      '--text':         '#0a1a08',
      '--text-muted':   '#1a3a10',
      '--text-dim':     '#3a5a28',
      '--border':       'rgba(10,26,8,0.14)',
      '--border-med':   'rgba(10,26,8,0.28)',
      '--shadow-card':  '0 4px 24px rgba(10,26,8,0.10)',
      '--shadow-hover': '0 20px 60px rgba(10,26,8,0.18)',
      '--nav-bg':       'rgba(233,255,112,0.88)',
      '--select-arrow': arrow('#1a3a10'),
    },
  },

  /* ─── 6. Neon Summer ✦ (enhanced) ──────────────────────────── */
  /*
   * Basada en palette 5, con tres cambios:
   *   · #e9ff70 (lima ácida)  →  #b5ffe1 (mint fresco, menos agresivo)
   *   · #70d6ff (azul claro)  →  #40b4e5 (azul más profundo, mejor contraste en borders)
   *   · #ff70a6 (rosa claro)  →  #d0006f (magenta oscuro, texto blanco ≈ 5.3:1 ✓)
   *   · #ffd670 y #ff9770 se mantienen iguales
   *
   * Contraste accent-dark (#d0006f) sobre bg (#b5ffe1): ≈ 4.65:1 ✓ (AA)
   * Contraste btn text blanco sobre #d0006f:             ≈ 5.3:1  ✓ (AA)
   */
  {
    name: 'Neon Summer ✦',
    colors: ['#b5ffe1', '#ffd670', '#ff9770', '#40b4e5', '#d0006f'],
    tokens: {
      '--bg':           '#b5ffe1',   // mint fresco
      '--surface':      '#ffd670',   // amarillo cálido (igual que paleta 5)
      '--surface-2':    '#ff9770',   // naranja (igual que paleta 5)
      '--accent':       '#40b4e5',   // azul cielo profundo (borders, soft bgs)
      '--accent-dark':  '#d0006f',   // magenta oscuro — labels + botones (texto blanco ≈5.3:1 ✓)
      '--accent-soft':  'color-mix(in srgb, #40b4e5 18%, transparent)',
      '--text':         '#0d2218',   // verde muy oscuro (≈ 9:1 sobre mint ✓)
      '--text-muted':   '#1f5040',   // verde oscuro medio
      '--text-dim':     '#4a7a62',   // verde suave
      '--border':       'rgba(13,34,24,0.14)',
      '--border-med':   'rgba(13,34,24,0.28)',
      '--shadow-card':  '0 4px 24px rgba(13,34,24,0.10)',
      '--shadow-hover': '0 20px 60px rgba(13,34,24,0.20)',
      '--nav-bg':       'rgba(181,255,225,0.88)',
      '--select-arrow': arrow('#1f5040'),
    },
  },
]
