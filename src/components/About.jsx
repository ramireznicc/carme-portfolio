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

        <FadeIn from="left">
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

          <p className="about-tools-label" style={{ marginTop: '32px' }}>Herramientas</p>
          <div className="about-tools">
            {tools.map(({ name, Icon, color }) => (
              <div key={name} className="tool-item">
                <Icon size={26} color={color} />
                <span className="tool-item-name">{name}</span>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
