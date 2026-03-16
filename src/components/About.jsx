import FadeIn from './FadeIn'
import {
  SiAdobepremierepro, SiCanva,
  SiInstagram, SiTiktok, SiAdobephotoshop,
} from 'react-icons/si'
import { LuScissors, LuArrowUpRight } from 'react-icons/lu'

const tools = [
  { name: 'Premiere Pro',  Icon: SiAdobepremierepro,  color: '#9999FF' },
  { name: 'Photoshop',     Icon: SiAdobephotoshop,    color: '#31A8FF' },
  { name: 'CapCut',        Icon: LuScissors,          color: '#1C1C1C' },
  { name: 'Canva',         Icon: SiCanva,             color: '#00C4CC' },
  { name: 'Instagram',     Icon: SiInstagram,         color: '#E4405F' },
  { name: 'TikTok',        Icon: SiTiktok,            color: '#010101' },
]

const socials = [
  {
    platform: 'Instagram',
    handle: '@carsi_carmela',
    url: 'https://www.instagram.com/carsi_carmela/',
    Icon: SiInstagram,
    iconBg: 'rgba(220,39,67,0.10)',
    iconColor: '#dc2743',
  },
  {
    platform: 'TikTok',
    handle: '@carsi_carmela',
    url: 'https://www.tiktok.com/@carsi_carmela',
    Icon: SiTiktok,
    iconBg: 'rgba(1,1,1,0.07)',
    iconColor: '#010101',
  },
]

export default function About() {
  return (
    <section className="about-section section" id="sobre-mi">

      {/* Decoración izquierda — cámara de video + play + asterisco */}
      <svg className="about-deco about-deco-left" viewBox="0 0 110 520" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Cámara de video: cuerpo */}
        <path d="M8,50 L68,50 L68,95 L8,95 Z" stroke="#f962b2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="deco-path deco-a1" />
        {/* Cámara de video: visor triangular */}
        <path d="M68,58 L95,42 L95,103 L68,87" stroke="#f962b2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="deco-path deco-a2" />
        {/* Cámara de video: lente */}
        <path d="M25,72 m-14,0 a14,14 0 1,1 28,0 a14,14 0 1,1 -28,0" stroke="#f962b2" strokeWidth="3" strokeLinecap="round" className="deco-path deco-a3" />

        {/* Botón play: círculo */}
        <path d="M45,215 m-26,0 a26,26 0 1,1 52,0 a26,26 0 1,1 -52,0" stroke="#00d4aa" strokeWidth="3" strokeLinecap="round" className="deco-path deco-b1" />
        {/* Botón play: triángulo */}
        <path d="M36,206 L62,215 L36,224 Z" stroke="#00d4aa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="deco-path deco-b2" />

        {/* Asterisco / estrella */}
        <path d="M45,370 L45,400 M30,377 L60,393 M30,393 L60,377" stroke="#e7fe71" strokeWidth="3" strokeLinecap="round" className="deco-path deco-c1" />
      </svg>

      {/* Decoración derecha — cámara de foto + corazón + señal wifi */}
      <svg className="about-deco about-deco-right" viewBox="0 0 110 520" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Cámara de foto: cuerpo */}
        <path d="M5,55 L100,55 L100,105 L5,105 Z" stroke="#c02dd7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="deco-path deco-a1" />
        {/* Cámara de foto: tope */}
        <path d="M30,55 L30,40 L55,40 L55,55" stroke="#c02dd7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="deco-path deco-a2" />
        {/* Cámara de foto: lente */}
        <path d="M35,80 m-18,0 a18,18 0 1,1 36,0 a18,18 0 1,1 -36,0" stroke="#c02dd7" strokeWidth="3" strokeLinecap="round" className="deco-path deco-a3" />
        {/* Cámara de foto: flash */}
        <path d="M75,42 L83,25 L68,35 L76,18" stroke="#c02dd7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="deco-path deco-a4" />

        {/* Corazón */}
        <path d="M52,225 C52,210 30,204 24,218 C18,232 35,250 52,268 C69,250 86,232 80,218 C74,204 52,210 52,225" stroke="#f962b2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="deco-path deco-b1" />

        {/* WiFi / señal: punto */}
        <path d="M49,415 m-5,0 a5,5 0 1,1 10,0 a5,5 0 1,1 -10,0" stroke="#e7fe71" strokeWidth="3" strokeLinecap="round" className="deco-path deco-c1" />
        {/* WiFi: arco 1 */}
        <path d="M36,400 a18,18 0 0,1 36,0" stroke="#e7fe71" strokeWidth="3" strokeLinecap="round" className="deco-path deco-c2" />
        {/* WiFi: arco 2 */}
        <path d="M22,385 a32,32 0 0,1 64,0" stroke="#e7fe71" strokeWidth="3" strokeLinecap="round" className="deco-path deco-c3" />
        {/* WiFi: arco 3 */}
        <path d="M8,370 a46,46 0 0,1 92,0" stroke="#e7fe71" strokeWidth="3" strokeLinecap="round" className="deco-path deco-c4" />
      </svg>

      <div className="about-layout">

        {/* Columna izquierda: bio */}
        <FadeIn from="left" className="about-col-bio">
          <div className="section-label">Sobre mí</div>
          <h3 className="about-heading">Hola, soy Carmela</h3>
          <div className="about-bio">
            <p>
              Soy comunicadora, creadora de contenido digital y community manager. Disfruto
              de investigar tendencias, pensar ideas y crear contenido para redes sociales y
              medios digitales, combinando comunicación, artística, creación audiovisual y
              entretenimiento para generar contenido que conecte con las audiencias.
            </p>
            <p>
              Trabajo produciendo y editando contenido para plataformas como Instagram,
              TikTok y YouTube, siempre buscando adaptar cada pieza al lenguaje de cada red.
            </p>
            <p>
              Me dedico a la gestión de redes sociales y community management: planificación
              de contenido, estrategias para cada plataforma, gestión de comunidades y
              seguimiento del rendimiento de las publicaciones.
            </p>
            <p>
              Actualmente participo en programas de streaming y televisión como conductora
              y panelista, combinando comunicación, entretenimiento y actualidad.
            </p>
            <p>
              Me interesa seguir explorando nuevos formatos de comunicación digital y
              trabajar con marcas creando contenido auténtico para redes, especialmente
              en formatos UGC (User Generated Content).
            </p>
          </div>

          <div className="about-tools-row">
            <p className="about-tools-label">Herramientas</p>
            <div className="about-tools">
              {tools.map(({ name, Icon, color }) => (
                <div key={name} className="tool-item">
                  <Icon size={26} color={color} />
                  <span className="tool-item-name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Columna derecha: tarjetas de perfil */}
        <FadeIn from="right" className="about-col-socials">
          {socials.map(({ platform, handle, url, Icon, iconBg, iconColor }) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-profile-card"
            >
              <div className="social-profile-top" style={{ background: iconBg }}>
                <Icon size={22} color={iconColor} />
              </div>
              <div className="social-profile-body">
                <div className="social-profile-info">
                  <span className="social-profile-platform">{platform}</span>
                  <span className="social-profile-handle">{handle}</span>
                </div>
                <span className="social-profile-cta">
                  Ver perfil <LuArrowUpRight size={14} />
                </span>
              </div>
            </a>
          ))}
        </FadeIn>

      </div>
    </section>
  )
}
