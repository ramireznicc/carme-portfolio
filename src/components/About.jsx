import { useEffect, useRef } from 'react'
import FadeIn from './FadeIn'
import {
  SiAdobepremierepro, SiCanva,
  SiInstagram, SiTiktok, SiAdobephotoshop,
  SiClaude, SiOpenai,
} from 'react-icons/si'
import { LuScissors, LuArrowUpRight } from 'react-icons/lu'

const tools = [
  { name: 'CapCut',        Icon: LuScissors,          color: '#333',    bg: '#efefef' },
  { name: 'Canva',         Icon: SiCanva,             color: '#00aaaf', bg: '#d6f5f6' },
  { name: 'Instagram',     Icon: SiInstagram,         color: '#d63060', bg: '#fde3eb' },
  { name: 'TikTok',        Icon: SiTiktok,            color: '#111',    bg: '#f0f0f0' },
  { name: 'Claude',        Icon: SiClaude,            color: '#d97757', bg: '#fdeee8' },
  { name: 'ChatGPT',       Icon: SiOpenai,            color: '#0ea57a', bg: '#d8f5ed' },
  { name: 'Premiere Pro',  Icon: SiAdobepremierepro,  color: '#7b6ef6', bg: '#edeaff' },
  { name: 'Photoshop',     Icon: SiAdobephotoshop,    color: '#1e90d4', bg: '#dff0ff' },
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
  const outerRef = useRef(null)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll('.about-deco').forEach(d => d.classList.add('deco-visible'))
        io.disconnect()
      }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="about-section section" id="sobre-mi">

      <div className="about-outer" ref={outerRef}>

      <div className="about-deco about-deco-left" aria-hidden="true">
        <img src="/dibujos/celu.png"   alt="" className="about-deco-img" />
        <img src="/dibujos/radio.png"  alt="" className="about-deco-img" />
        <img src="/dibujos/diario.png" alt="" className="about-deco-img" />
        <img src="/dibujos/teatro.png" alt="" className="about-deco-img" />
      </div>

      <div className="about-layout">

        {/* Columna izquierda: bio */}
        <FadeIn from="left" className="about-col-bio">
          <div className="section-label">Sobre mí</div>
          <h3 className="about-heading">Hola! Me llamo Carmela, pero me dicen Carsi...</h3>
          <div className="about-bio">
            {/* imagen 1: top-right — solo mobile */}
            <img src="/dibujos/celu.png" alt="" className="about-bio-deco about-bio-deco--float-r" aria-hidden="true" style={{filter:'saturate(1.35) brightness(0.96)'}} />
            <p>
              Soy <strong>comunicadora, creadora de contenido y community manager</strong>. Me encanta investigar
              las redes y tendencias, planificar estrategias, pensar ideas y crear contenido, fusionando
              comunicación, creación audiovisual y entretenimiento para generar contenido que conecte con
              las audiencias. También tengo experiencia en <strong>comunicación política</strong>.
            </p>
            {/* trio de imágenes en el medio — solo mobile */}
            <div className="about-bio-deco-pair" aria-hidden="true">
              <img src="/dibujos/radio.png"    alt="" style={{filter:'saturate(0.75) opacity(0.8)'}} />
              <img src="/dibujos/diario.png"   alt="" style={{filter:'saturate(0.75) opacity(0.8)'}} />
              <img src="/dibujos/calendar.png" alt="" style={{filter:'saturate(0.75) opacity(0.8)'}} />
            </div>
            <img src="/dibujos/cine2.png" alt="" className="about-bio-deco about-bio-deco--float-l" aria-hidden="true" style={{filter:'saturate(1.35) brightness(0.96)'}} />
            <p>
              Actualmente participo en programas de <strong>streaming y televisión</strong> como{' '}
              <strong>conductora y panelista.</strong> Disfruto de entretener, informar, hacer reir,
              generar algo distintivo en el oyente/espectador.
            </p>
            <p>
              También tengo mi lado artístico: <strong>soy actriz y bailarina.</strong> Amo poder
              explotarlo y combinarlo con el de comunicación y redes para potenciar mis ideas lo más que pueda.
            </p>
            {/* imagen float-right párrafo producción — solo mobile */}
            <p>
              <img src="/dibujos/teatro.png" alt="" className="about-bio-deco about-bio-deco--float-r" aria-hidden="true" style={{width:'100px', marginLeft:'6px', marginTop:'-30px'}} />
              Trabajo <strong>produciendo y editando</strong> contenido para plataformas como Instagram,
              TikTok y YouTube, siempre buscando adaptar cada pieza al lenguaje de cada red.
            </p>
            <img src="/dibujos/smile.png" alt="" className="about-bio-deco about-bio-deco--float-l" aria-hidden="true" style={{filter:'saturate(1.35) brightness(0.96)'}} />
            <img src="/dibujos/idea.png" alt="" className="about-bio-deco about-bio-deco--float-r" aria-hidden="true" style={{marginTop:'28px'}} />
            <p style={{marginTop:'16px', paddingRight:'6px'}}>
              Algo en lo que me interesa seguir explorando son los nuevos formatos de comunicación digital
              y <strong>trabajar con marcas</strong> creando contenido auténtico para redes, lo que
              conocemos como <strong>formatos UGC</strong> (User Generated Content).
            </p>
            <p style={{clear:'both', marginTop:'8px', textAlign:'center'}}>
              Seguí deslizando para ver más sobre mis <span style={{whiteSpace:'nowrap'}}>trabajos ↓</span>
            </p>
          </div>

          <div className="about-tools-row">
            <p className="about-tools-label">Herramientas</p>
            <div className="about-tools">
              {tools.map(({ name, Icon, color, bg }) => (
                <div key={name} className="tool-item" style={{ background: bg }}>
                  <span className="tool-icon-wrap">
                    <Icon size={22} color={color} />
                  </span>
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

      <div className="about-deco about-deco-right" aria-hidden="true">
        <img src="/dibujos/smile.png"    alt="" className="about-deco-img" />
        <img src="/dibujos/calendar.png" alt="" className="about-deco-img" />
        <img src="/dibujos/cine2.png"    alt="" className="about-deco-img" />
        <img src="/dibujos/idea.png"     alt="" className="about-deco-img" />
      </div>

      </div>{/* about-outer */}
    </section>
  )
}
