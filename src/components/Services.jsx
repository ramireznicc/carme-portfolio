import FadeIn from './FadeIn'
import { LuClapperboard, LuSmartphone, LuTarget, LuPenLine } from 'react-icons/lu'

const services = [
  {
    Icon: LuClapperboard,
    title: 'Edición de video',
    description:
      'Reels, TikToks y stories con edición profesional. Transiciones, beat sync, color grading y subtítulos.',
  },
  {
    Icon: LuSmartphone,
    title: 'Community Management',
    description:
      'Gestión integral de Instagram y TikTok. Planificación, publicación, interacción con la comunidad y reportes mensuales.',
  },
  {
    Icon: LuTarget,
    title: 'Estrategia de contenido',
    description:
      'Calendarios editoriales, análisis de tendencias, definición de pilares de contenido y línea visual.',
  },
  {
    Icon: LuPenLine,
    title: 'Copywriting',
    description:
      'Textos para posts, guiones de video, captions que convierten y calls to action efectivos.',
  },
]

export default function Services() {
  return (
    <section className="services-section section" id="servicios">
      <FadeIn className="section-header">
        <div className="section-label">Servicios</div>
        <h2 className="section-title">Lo que puedo hacer por tu marca</h2>
      </FadeIn>

      <div className="services-grid">
        {services.map(({ Icon, title, description }, i) => (
          <FadeIn key={title} delay={i * 100} from="scale">
            <div className="service-card">
              <div className="service-icon" aria-hidden="true">
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
