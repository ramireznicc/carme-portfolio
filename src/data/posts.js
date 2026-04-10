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
    navLabel: 'CM/Edición',
    accent: '#f962b2',
    rows: [
      {
        id: 'cm-ig',
        platform: 'Instagram',
        description:
          'Trabajé como cm del perfil de la diputada Lucila De Ponti, escribiendo copys, produciendo y editando videos, creando guiones, planificando estrategias de contenido y evaluando las métricas y el rendimiento de las diferentes redes sociales según el lenguaje de cada una. Trabajos pre producidos y guionados y edición de notas o entrevistas en vivo, o de intervenciones políticas.',
        posts: [
          { ...ph('cm-ig-1',  3, 2, 3), videoUrl: '/videos/lucila1.mp4',  embedUrl: 'https://www.instagram.com/p/DWZRBknjyAr/embed/',    postUrl: 'https://www.instagram.com/p/DWZRBknjyAr/' },
          { ...ph('cm-ig-2',  9, 1, 3), videoUrl: '/videos/lucila2.mp4',  embedUrl: 'https://www.instagram.com/p/DVGxfQXjm7J/embed/',    postUrl: 'https://www.instagram.com/p/DVGxfQXjm7J/' },
          { ...ph('cm-ig-3',  1, 2, 1), videoUrl: '/videos/lucila3.mp4',  embedUrl: 'https://www.instagram.com/p/DShsL1aDpRD/embed/',    postUrl: 'https://www.instagram.com/p/DShsL1aDpRD/' },
          { ...ph('cm-ig-4',  8, 2, 1), videoUrl: '/videos/lucila4.mp4',  embedUrl: 'https://www.instagram.com/p/DLFsM95OtQ_/embed/',    postUrl: 'https://www.instagram.com/p/DLFsM95OtQ_/' },
          { ...ph('cm-ig-5',  1, 3, 2), videoUrl: '/videos/lucila5.mp4',  embedUrl: 'https://www.instagram.com/p/DQC5XZbEmAy/embed/',    postUrl: 'https://www.instagram.com/p/DQC5XZbEmAy/' },
          { ...ph('cm-ig-6',  5, 1, 2), videoUrl: '/videos/lucila6.mp4',  embedUrl: 'https://www.instagram.com/p/DFxVb5wOW9m/embed/',    postUrl: 'https://www.instagram.com/p/DFxVb5wOW9m/' },
          { ...ph('cm-ig-7',  2, 3, 1), videoUrl: '/videos/lucila7.mp4',  embedUrl: 'https://www.instagram.com/p/DQZVOy9Dr_D/embed/',    postUrl: 'https://www.instagram.com/p/DQZVOy9Dr_D/' },
          { ...ph('cm-ig-8',  7, 3, 1), videoUrl: '/videos/lucila8.mp4',  embedUrl: 'https://www.instagram.com/p/DPCrFgugScl/embed/',    postUrl: 'https://www.instagram.com/p/DPCrFgugScl/' },
          { ...ph('cm-ig-9',  6, 2, 3), videoUrl: '/videos/lucila9.mp4',  embedUrl: 'https://www.instagram.com/p/DOBaigfjggp/embed/',    postUrl: 'https://www.instagram.com/p/DOBaigfjggp/' },
          { ...ph('cm-ig-10', 4, 2, 3), videoUrl: '/videos/lucila10.mp4', embedUrl: 'https://www.instagram.com/p/DD5bV5gPGs4/embed/',    postUrl: 'https://www.instagram.com/p/DD5bV5gPGs4/' },
          { ...ph('cm-ig-11', 3, 1, 2), videoUrl: '/videos/lucila11.mp4', embedUrl: 'https://www.instagram.com/p/DOld5GRjpA1/embed/',    postUrl: 'https://www.instagram.com/p/DOld5GRjpA1/' },
        ],
      },
      {
        id: 'cm-tt',
        platform: 'TikTok',
        description:
          'Contenido más informal, muestra un lado más cercano de la persona dando lugar al humor siempre cuidando la imagen y contextos.',
        posts: [
          { ...ph('cm-tt-1',  5, 1, 2, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7542577738884910341', postUrl: 'https://www.tiktok.com/@luciladeponti/video/7542577738884910341' },
          { ...ph('cm-tt-3',  9, 3, 1, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7600894253476220168', postUrl: 'https://www.tiktok.com/@luciladeponti/video/7600894253476220168' },
          { ...ph('cm-tt-4',  4, 1, 3, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7605609054257450258', postUrl: 'https://www.tiktok.com/@luciladeponti/video/7605609054257450258' },
          { ...ph('cm-tt-5',  2, 2, 1, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7417090306748763398', postUrl: 'https://www.tiktok.com/@luciladeponti/video/7417090306748763398' },
          { ...ph('cm-tt-6',  6, 3, 2, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7507292020428295480', postUrl: 'https://www.tiktok.com/@luciladeponti/video/7507292020428295480' },
          { ...ph('cm-tt-7',  8, 1, 3, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7621933708236410120', postUrl: 'https://www.tiktok.com/@luciladeponti/video/7621933708236410120' },
          { ...ph('cm-tt-8',  3, 2, 1, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7484011291586219270', postUrl: 'https://www.tiktok.com/@luciladeponti/video/7484011291586219270' },
          { ...ph('cm-tt-9',  1, 3, 2, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7420940237913869573', postUrl: 'https://www.tiktok.com/@luciladeponti/video/7420940237913869573' },
          { ...ph('cm-tt-10', 7, 1, 2, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7535141953877347589', postUrl: 'https://www.tiktok.com/@luciladeponti/video/7535141953877347589' },
          { ...ph('cm-tt-11', 5, 3, 1, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7576825080873897223', postUrl: 'https://www.tiktok.com/@luciladeponti/video/7576825080873897223' },
          { ...ph('cm-tt-12', 9, 2, 3, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7620995801854053652', postUrl: 'https://www.tiktok.com/@luciladeponti/video/7620995801854053652' },
        ],
      },
    ],
  },
  {
    id: 'medios',
    title: 'Comunicación en medios',
    navLabel: 'Medios',
    accent: '#c02dd7',
    rows: [
      {
        id: 'medios-ig',
        platform: 'Instagram',
        description: '',
        posts: [
          { ...ph('med-ig-1',  4, 1, 2), noMeta: true, embedUrl: 'https://www.instagram.com/p/DV9pyOijgc7/embed/',  postUrl: 'https://www.instagram.com/p/DV9pyOijgc7/' },
          { ...ph('med-ig-2',  9, 2, 3), noMeta: true, embedUrl: 'https://www.instagram.com/p/DV1kqS5D-WB/embed/',  postUrl: 'https://www.instagram.com/p/DV1kqS5D-WB/' },
          { ...ph('med-ig-3',  2, 3, 1), noMeta: true, embedUrl: 'https://www.instagram.com/p/DPUsa9IjzGx/embed/',  postUrl: 'https://www.instagram.com/p/DPUsa9IjzGx/' },
          { ...ph('med-ig-4',  6, 1, 3), noMeta: true, embedUrl: 'https://www.instagram.com/p/DJVGvn-vjsK/embed/',  postUrl: 'https://www.instagram.com/p/DJVGvn-vjsK/' },
          { ...ph('med-ig-5',  3, 2, 1), noMeta: true, embedUrl: 'https://www.instagram.com/p/DSIItG7DgdY/embed/',  postUrl: 'https://www.instagram.com/p/DSIItG7DgdY/' },
          { ...ph('med-ig-7',  5, 3, 2), noMeta: true, embedUrl: 'https://www.instagram.com/p/DGeIfweSIuL/embed/',  postUrl: 'https://www.instagram.com/p/DGeIfweSIuL/' },
          { ...ph('med-ig-8',  1, 2, 3), noMeta: true, embedUrl: 'https://www.instagram.com/p/DQwV5dnjiN8/embed/',  postUrl: 'https://www.instagram.com/p/DQwV5dnjiN8/' },
          { ...ph('med-ig-10', 4, 3, 1), noMeta: true, embedUrl: 'https://www.instagram.com/p/DGqVsbxRVVJ/embed/',  postUrl: 'https://www.instagram.com/p/DGqVsbxRVVJ/' },
          { ...ph('med-ig-11', 6, 2, 3), noMeta: true, embedUrl: 'https://www.instagram.com/p/DFsvTUiOv67/embed/',  postUrl: 'https://www.instagram.com/p/DFsvTUiOv67/' },
          { ...ph('med-ig-12', 2, 1, 2), noMeta: true, embedUrl: 'https://www.instagram.com/p/DJaCq05vIWd/embed/',  postUrl: 'https://www.instagram.com/p/DJaCq05vIWd/' },
          { ...ph('med-ig-13', 9, 3, 2), noMeta: true, embedUrl: 'https://www.instagram.com/p/DGBjx1gRMrT/embed/',  postUrl: 'https://www.instagram.com/p/DGBjx1gRMrT/' },
        ],
      },
      {
        id: 'medios-tt',
        platform: 'TikTok',
        description: '',
        posts: [
          { ...ph('med-tt-1', 5, 1, 2, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7564771871359503633', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7564771871359503633' },
          { ...ph('med-tt-2', 7, 2, 3, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7556627096043326776', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7556627096043326776' },
          { ...ph('med-tt-3', 3, 3, 1, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7532297760905645368', postUrl: 'https://www.tiktok.com/@brindistv/video/7532297760905645368' },
          { ...ph('med-tt-4', 8, 1, 3, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7507061115755515141', postUrl: 'https://www.tiktok.com/@brindistv/video/7507061115755515141' },
          { ...ph('med-tt-6', 6, 3, 2, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7511421687150185746', postUrl: 'https://www.tiktok.com/@brindistv/video/7511421687150185746' },
          { ...ph('med-tt-7', 4, 1, 2, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7536007820513234232', postUrl: 'https://www.tiktok.com/@brindistv/video/7536007820513234232' },
          { ...ph('med-tt-8', 9, 2, 3, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7533033212461829382', postUrl: 'https://www.tiktok.com/@brindistv/video/7533033212461829382' },
        ],
      },
    ],
  },
  {
    id: 'marcas',
    title: 'Reseñas / Contenido para marcas',
    navLabel: 'Reseñas/marcas',
    accent: '#00d4aa',
    rows: [
      {
        id: 'marcas-1',
        platform: 'TikTok',
        description: '',
        posts: [
          { ...ph('mar-1', 1, 2, 1, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7615726114677296401', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7615726114677296401' },
          { ...ph('mar-2', 6, 1, 2, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7602412619282107665', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7602412619282107665' },
          { ...ph('mar-3', 3, 3, 2, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7571647934668819728', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7571647934668819728' },
          { ...ph('mar-4', 8, 2, 3, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7510406919639567621', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7510406919639567621' },
          { ...ph('mar-5', 5, 1, 3, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7338151024949038342', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7338151024949038342' },
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
        platform: 'TikTok',
        description: '',
        posts: [
          { ...ph('pro-1', 7, 1, 3, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7602374461920251152', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7602374461920251152' },
          { ...ph('pro-2', 5, 2, 1, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7567882978697727249', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7567882978697727249' },
          { ...ph('pro-3', 2, 3, 2, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7558093028368469260', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7558093028368469260' },
          { ...ph('pro-4', 9, 1, 2, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7532315897633967366', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7532315897633967366' },
          { ...ph('pro-5', 4, 2, 3, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7415015123552570630', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7415015123552570630' },
          { ...ph('pro-6', 6, 3, 1, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7523371998160981253', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7523371998160981253' },
          { ...ph('pro-7', 1, 1, 3, 'tiktok'), embedUrl: 'https://www.tiktok.com/embed/v2/7518099410115448069', postUrl: 'https://www.tiktok.com/@carsi_carmela/video/7518099410115448069' },
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
