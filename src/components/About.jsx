import FadeIn from './FadeIn'
import {
  SiAdobepremierepro, SiCanva, SiMeta,
  SiInstagram, SiTiktok, SiAdobephotoshop,
} from 'react-icons/si'
import { LuCalendarClock, LuScissors } from 'react-icons/lu'

// Ordenados: video/diseño primero → plataformas sociales
const tools = [
  { name: 'Premiere Pro',  Icon: SiAdobepremierepro,  color: '#9999FF' },
  { name: 'CapCut',        Icon: LuScissors,          color: '#1C1C1C' },
  { name: 'Photoshop',     Icon: SiAdobephotoshop,    color: '#31A8FF' },
  { name: 'Canva',         Icon: SiCanva,             color: '#00C4CC' },
  { name: 'Instagram',     Icon: SiInstagram,         color: '#E4405F' },
  { name: 'TikTok',        Icon: SiTiktok,            color: '#010101' },
  { name: 'Meta Ads',      Icon: SiMeta,              color: '#0467DF' },
  { name: 'Later',         Icon: LuCalendarClock,     color: '#FF5C35' },
]

export default function About() {
  return (
    <section className="about-section section" id="sobre-mi">
      <div className="about-layout">

        {/* ── Columna izquierda: bio ── */}
        <FadeIn>
          <div className="section-label">Sobre mí</div>
          <h3 className="about-heading">Hola, soy Carmela</h3>
          <div className="about-bio">
            <p>
              Soy Community Manager y editora de video con experiencia creando contenido
              para marcas en Instagram y TikTok. Me apasiona contar historias a través
              del video y construir comunidades que conecten de verdad con las marcas.
            </p>
            <p>
              Creo en el contenido auténtico que genera conversación. Combino estrategia
              y creatividad para que cada pieza tenga propósito y cada publicación sume
              al crecimiento de la marca.
            </p>
          </div>
        </FadeIn>

        {/* ── Columna derecha: herramientas + disponibilidad ── */}
        <FadeIn delay={120}>
          <div className="about-right">
            <div>
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

          </div>
        </FadeIn>

      </div>
    </section>
  )
}
