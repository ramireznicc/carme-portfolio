/**
 * Portfolio posts data.
 *
 * Fields:
 *  id          – unique identifier
 *  platform    – 'ig' | 'tiktok'
 *  type        – 'reel' | 'feed'
 *  thumbClass  – CSS gradient class (thumb-g1 … thumb-g9)
 *  shapes      – array of shape classes inside the thumbnail
 *  aspectRatio – 'reel' | 'square' | 'landscape'
 *  badgeLabel  – text shown in the platform badge
 *  hasPlay     – show play button?
 *  countIcon   – 'play' | 'heart'
 *  count       – display string for views / likes
 *  client      – client name
 *  title       – post title
 *  tags        – skill tags
 *
 * To replace placeholders with real embeds in the future:
 *  - Add an `embedUrl` field (Instagram post URL or TikTok URL)
 *  - Update PostCard to render the embed when `embedUrl` is present
 */

export const posts = [
  {
    id: 1,
    platform: 'ig',
    type: 'reel',
    thumbClass: 'thumb-g2',
    shapes: ['thumb-shape-1', 'thumb-shape-2'],
    aspectRatio: 'reel',
    badgeLabel: 'REEL',
    hasPlay: true,
    countIcon: 'play',
    count: '124K',
    client: 'Marca de Skincare',
    title: 'Rutina de mañana — Tutorial con transiciones',
    tags: ['Edición', 'Guión', 'Transiciones'],
    embedUrl: 'https://www.instagram.com/p/DSnIfqPDrlH/embed/',
  },
  {
    id: 2,
    platform: 'ig',
    type: 'reel',
    thumbClass: 'thumb-g3',
    shapes: ['thumb-shape-1', 'thumb-shape-3'],
    aspectRatio: 'reel',
    badgeLabel: 'REEL',
    hasPlay: true,
    countIcon: 'play',
    count: '312K',
    client: 'Restaurante Gourmet',
    title: 'Behind the scenes — Preparación del menú de temporada',
    tags: ['Filmación', 'Edición', 'Trending audio'],
    embedUrl: 'https://www.instagram.com/reel/DEDuqiUvQvW/embed/',
  },
  {
    id: 3,
    platform: 'ig',
    type: 'feed',
    thumbClass: 'thumb-g6',
    shapes: ['thumb-shape-2', 'thumb-shape-3'],
    aspectRatio: 'square',
    badgeLabel: 'CARRUSEL',
    hasPlay: false,
    countIcon: 'heart',
    count: '2,847',
    client: 'Marca de Ropa',
    title: 'Carrusel educativo — Guía de tallas y combinaciones',
    tags: ['Diseño', 'Copy', 'Estrategia'],
  },
  {
    id: 4,
    platform: 'tiktok',
    type: 'reel',
    thumbClass: 'thumb-g5',
    shapes: ['thumb-shape-1', 'thumb-shape-2'],
    aspectRatio: 'reel',
    badgeLabel: 'TikTok',
    hasPlay: true,
    countIcon: 'play',
    count: '89K',
    client: 'Estudio de Yoga',
    title: 'POV: Tu primera clase de yoga — Storytelling',
    tags: ['Concepto', 'Edición', 'Storytelling'],
    embedUrl: 'https://www.tiktok.com/embed/v2/7522254044040105222',
  },
  {
    id: 5,
    platform: 'ig',
    type: 'reel',
    thumbClass: 'thumb-g1',
    shapes: ['thumb-shape-3', 'thumb-shape-2'],
    aspectRatio: 'reel',
    badgeLabel: 'REEL',
    hasPlay: true,
    countIcon: 'play',
    count: '56K',
    client: 'Cafetería Artesanal',
    title: 'Proceso de latte art — Slow motion edit',
    tags: ['Edición', 'Slow-mo', 'ASMR'],
  },
  {
    id: 6,
    platform: 'ig',
    type: 'feed',
    thumbClass: 'thumb-g8',
    shapes: ['thumb-shape-1', 'thumb-shape-3'],
    aspectRatio: 'square',
    badgeLabel: 'POST',
    hasPlay: false,
    countIcon: 'heart',
    count: '1,523',
    client: 'Tienda de Plantas',
    title: 'Tips de cuidado — Infografía con identidad de marca',
    tags: ['Diseño gráfico', 'Copy'],
  },
  {
    id: 7,
    platform: 'tiktok',
    type: 'reel',
    thumbClass: 'thumb-g7',
    shapes: ['thumb-shape-2', 'thumb-shape-1'],
    aspectRatio: 'reel',
    badgeLabel: 'TikTok',
    hasPlay: true,
    countIcon: 'play',
    count: '478K',
    client: 'Marca Personal',
    title: 'Un día conmigo — Vlog estilo editorial',
    tags: ['Vlog', 'Color grading', 'Música'],
  },
  {
    id: 8,
    platform: 'ig',
    type: 'reel',
    thumbClass: 'thumb-g4',
    shapes: ['thumb-shape-3', 'thumb-shape-1'],
    aspectRatio: 'reel',
    badgeLabel: 'REEL',
    hasPlay: true,
    countIcon: 'play',
    count: '203K',
    client: 'Peluquería',
    title: 'Transformación capilar — Before & After con beat sync',
    tags: ['Edición', 'Beat sync', 'B&A'],
  },
  {
    id: 9,
    platform: 'ig',
    type: 'feed',
    thumbClass: 'thumb-g9',
    shapes: ['thumb-shape-2', 'thumb-shape-3'],
    aspectRatio: 'landscape',
    badgeLabel: 'CARRUSEL',
    hasPlay: false,
    countIcon: 'heart',
    count: '3,291',
    client: 'Agencia de Viajes',
    title: 'Destinos de verano — Grilla visual con identidad',
    tags: ['Dirección de arte', 'Grilla', 'Copy'],
  },
]
