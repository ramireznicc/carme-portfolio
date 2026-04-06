/**
 * Portfolio categories.
 * Each category has one or more rows (sub-sections).
 * Each row has a platform label (optional), description, and posts.
 * Replace thumbClass/shapes with real embedUrl when available.
 */

const ph = (id, g, s1, s2, platform = 'ig') => ({
  id,
  platform,
  thumbClass: `thumb-g${g}`,
  shapes: [`thumb-shape-${s1}`, `thumb-shape-${s2}`],
  aspectRatio: 'reel',
  badgeLabel: platform === 'tiktok' ? 'TikTok' : 'REEL',
  hasPlay: true,
  countIcon: 'play',
  count: '—',
  client: '',
  title: '',
  tags: [],
})

export const categories = [
  {
    id: 'cm',
    title: 'Community Manager / Edición',
    accent: '#f962b2',
    rows: [
      {
        id: 'cm-ig',
        platform: 'Instagram',
        description:
          'Trabajé como cm del perfil de la diputada Lucila De Ponti, escribiendo copys, produciendo y editando videos, creando guiones, planificando estrategias de contenido y evaluando las métricas y el rendimiento de las diferentes redes sociales según el lenguaje de cada una. Trabajos pre producidos y guionados y edición de notas o entrevistas en vivo, o de intervenciones políticas.',
        posts: [
          { ...ph('cm-ig-1',  2, 1, 2), videoUrl: '/videos/lucila.mp4',   embedUrl: 'https://www.instagram.com/reel/DUyvjkrjt4t/embed/', postUrl: 'https://www.instagram.com/reel/DUyvjkrjt4t/' },
          { ...ph('cm-ig-2',  3, 2, 3), videoUrl: '/videos/lucila2.mp4',  embedUrl: 'https://www.instagram.com/p/DWZRBknjyAr/embed/',    postUrl: 'https://www.instagram.com/p/DWZRBknjyAr/' },
          { ...ph('cm-ig-3',  6, 1, 3), videoUrl: '/videos/lucila3.mp4',  embedUrl: 'https://www.instagram.com/p/DGO50UXShMG/embed/',    postUrl: 'https://www.instagram.com/p/DGO50UXShMG/' },
          { ...ph('cm-ig-4',  1, 3, 2), videoUrl: '/videos/lucila4.mp4',  embedUrl: 'https://www.instagram.com/p/DQC5XZbEmAy/embed/',    postUrl: 'https://www.instagram.com/p/DQC5XZbEmAy/' },
          { ...ph('cm-ig-5',  8, 2, 1), videoUrl: '/videos/lucila5.mp4',  embedUrl: 'https://www.instagram.com/p/DLFsM95OtQ_/embed/',    postUrl: 'https://www.instagram.com/p/DLFsM95OtQ_/' },
          { ...ph('cm-ig-6',  5, 1, 2), videoUrl: '/videos/lucila6.mp4',  embedUrl: 'https://www.instagram.com/p/DFxVb5wOW9m/embed/',    postUrl: 'https://www.instagram.com/p/DFxVb5wOW9m/' },
          { ...ph('cm-ig-7',  7, 3, 1), videoUrl: '/videos/lucila7.mp4',  embedUrl: 'https://www.instagram.com/p/DPCrFgugScl/embed/',    postUrl: 'https://www.instagram.com/p/DPCrFgugScl/' },
          { ...ph('cm-ig-8',  4, 2, 3), videoUrl: '/videos/lucila8.mp4',  embedUrl: 'https://www.instagram.com/p/DD5bV5gPGs4/embed/',    postUrl: 'https://www.instagram.com/p/DD5bV5gPGs4/' },
          { ...ph('cm-ig-9',  9, 1, 3), videoUrl: '/videos/lucila9.mp4',  embedUrl: 'https://www.instagram.com/p/DVGxfQXjm7J/embed/',    postUrl: 'https://www.instagram.com/p/DVGxfQXjm7J/' },
          { ...ph('cm-ig-10', 2, 3, 1), videoUrl: '/videos/lucila10.mp4', embedUrl: 'https://www.instagram.com/p/DQZVOy9Dr_D/embed/',    postUrl: 'https://www.instagram.com/p/DQZVOy9Dr_D/' },
          { ...ph('cm-ig-11', 6, 2, 3), videoUrl: '/videos/lucila11.mp4', embedUrl: 'https://www.instagram.com/p/DOBaigfjggp/embed/',    postUrl: 'https://www.instagram.com/p/DOBaigfjggp/' },
          { ...ph('cm-ig-12', 3, 1, 2), videoUrl: '/videos/lucila12.mp4', embedUrl: 'https://www.instagram.com/p/DOld5GRjpA1/embed/',    postUrl: 'https://www.instagram.com/p/DOld5GRjpA1/' },
          { ...ph('cm-ig-13', 8, 3, 2), videoUrl: '/videos/lucila13.mp4', embedUrl: 'https://www.instagram.com/p/DJKHBNvOyZS/embed/',    postUrl: 'https://www.instagram.com/p/DJKHBNvOyZS/' },
          { ...ph('cm-ig-14', 1, 2, 1), videoUrl: '/videos/lucila14.mp4', embedUrl: 'https://www.instagram.com/p/DShsL1aDpRD/embed/',    postUrl: 'https://www.instagram.com/p/DShsL1aDpRD/' },
        ],
      },
      {
        id: 'cm-tt',
        platform: 'TikTok',
        description:
          'Contenido más informal, muestra un lado más cercano de la persona dando lugar al humor siempre cuidando la imagen y contextos.',
        posts: [
          ph('cm-tt-1', 5, 1, 2, 'tiktok'),
          ph('cm-tt-2', 7, 2, 3, 'tiktok'),
          ph('cm-tt-3', 9, 3, 1, 'tiktok'),
          ph('cm-tt-4', 4, 1, 3, 'tiktok'),
        ],
      },
    ],
  },
  {
    id: 'medios',
    title: 'Comunicación en medios',
    accent: '#c02dd7',
    rows: [
      {
        id: 'medios-1',
        platform: null,
        description: 'Perfiles de brindis y moda.',
        posts: [
          ph('med-1', 4, 1, 2),
          ph('med-2', 9, 2, 3),
          ph('med-3', 2, 3, 1),
          ph('med-4', 6, 1, 3),
        ],
      },
    ],
  },
  {
    id: 'marcas',
    title: 'Reseñas / Contenido para marcas',
    accent: '#00d4aa',
    rows: [
      {
        id: 'marcas-1',
        platform: null,
        description: '',
        posts: [
          ph('mar-1', 1, 2, 1),
          ph('mar-2', 6, 1, 2),
          ph('mar-3', 3, 3, 2),
          ph('mar-4', 8, 2, 3),
        ],
      },
    ],
  },
  {
    id: 'propio',
    title: 'Contenido propio',
    accent: '#e7fe71',
    rows: [
      {
        id: 'propio-1',
        platform: null,
        description: '',
        posts: [
          ph('pro-1', 7, 1, 3),
          ph('pro-2', 5, 2, 1),
          ph('pro-3', 2, 3, 2),
          ph('pro-4', 9, 1, 2),
        ],
      },
    ],
  },
  {
    id: 'actuacion',
    title: 'Actuación',
    accent: '#ff3562',
    rows: [
      {
        id: 'act-1',
        platform: null,
        description: '',
        posts: [
          ph('act-1', 4, 2, 3),
          ph('act-2', 1, 1, 2),
          ph('act-3', 8, 3, 1),
          ph('act-4', 6, 2, 1),
        ],
      },
    ],
  },
]

/* ── Legacy export (used nowhere after portfolio rewrite) ── */
export const posts = []
