import { useState, useRef } from 'react'
import FadeIn from './FadeIn'
import { SiInstagram, SiLinkedin } from 'react-icons/si'

const INITIAL = { nombre: '', email: '', servicio: '', mensaje: '' }
const ACCESS_KEY = 'df9853fb-6350-4047-a50e-cae1d9facdcf'

export default function Contact() {
  const [form, setForm]       = useState(INITIAL)
  const [sent, setSent]       = useState(false)
  const [exiting, setExiting] = useState(false)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const exitTimer = useRef(null)

  const handleReset = () => {
    setExiting(true)
    exitTimer.current = setTimeout(() => {
      setSent(false)
      setExiting(false)
    }, 350)
  }

  const validate = () => {
    const e = {}
    if (!form.nombre.trim())  e.nombre  = 'Ingresá tu nombre'
    if (!form.email.trim())   e.email   = 'Ingresá tu email'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email no válido'
    if (!form.mensaje.trim()) e.mensaje = 'Escribí tu mensaje'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }

    setLoading(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: ACCESS_KEY, ...form }),
      })
      if (res.ok) setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-layout">

        {/* ── Encabezado ── */}
        <FadeIn from="left">
          <div className="section-label">Contacto</div>
          <h2 className="contact-title">¿Trabajamos juntos?</h2>
          <p className="contact-desc">
            Contame sobre tu proyecto o idea!<br />
            Estoy disponible para colaboraciones freelance y contrataciones a largo plazo.
          </p>

          <div className="contact-links">
            <a
              href="https://www.linkedin.com/in/carmela-gil/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-item"
            >
              <span className="contact-link-icon"><SiLinkedin size={17} /></span>
              <span className="contact-link-info">
                <span className="contact-link-label">LinkedIn</span>
                <span className="contact-link-text">Carmela Gil</span>
              </span>
            </a>
            <a
              href="https://www.instagram.com/carsi_carmela/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-item"
            >
              <span className="contact-link-icon"><SiInstagram size={17} /></span>
              <span className="contact-link-info">
                <span className="contact-link-label">Instagram</span>
                <span className="contact-link-text">@carsi_carmela</span>
              </span>
            </a>
          </div>
        </FadeIn>

        {/* ── Formulario ── */}
        <FadeIn delay={100} from="right">
          {sent ? (
            <div className={`form-success${exiting ? ' form-success-exit' : ''}`}>
              <div className="form-success-icon">🫶</div>
              <h4>¡Gracias por tu mensaje!</h4>
              <p>Te respondo a la brevedad :)</p>
              <button
                className="btn btn-primary"
                style={{ marginTop: 8 }}
                onClick={handleReset}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <Field
                  label="Nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  error={errors.nombre}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>

              <Field label="¿En qué puedo ayudarte?" name="servicio" as="select" value={form.servicio} onChange={handleChange}>
                <option value="">Seleccioná un servicio</option>
                <option value="cm">Community Manager</option>
                <option value="video">Edición de Video</option>
                <option value="contenido">Creación de Contenido</option>
                <option value="ugc">UGC y Colaboraciones</option>
                <option value="conduccion">Conducción/Medios</option>
                <option value="actuacion">Actuación</option>
                <option value="otro">Otros</option>
              </Field>

              <Field
                label="Mensaje"
                name="mensaje"
                as="textarea"
                placeholder="Proyecto, idea o propuesta..."
                value={form.mensaje}
                onChange={handleChange}
                error={errors.mensaje}
              />

              <div className="form-submit">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Enviando…' : 'Enviar mensaje →'}
                </button>
              </div>
            </form>
          )}
        </FadeIn>

      </div>
    </section>
  )
}

/* ── Field helper ── */
function Field({ label, name, as: Tag = 'input', type = 'text', placeholder, value, onChange, error, children }) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <Tag
        id={name}
        name={name}
        type={Tag === 'input' ? type : undefined}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={error ? { borderColor: '#c0616e' } : undefined}
      >
        {children}
      </Tag>
      {error && (
        <span style={{ fontSize: '0.75rem', color: '#c0616e', marginTop: 2 }}>
          {error}
        </span>
      )}
    </div>
  )
}
