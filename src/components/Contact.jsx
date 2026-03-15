import { useState } from 'react'
import FadeIn from './FadeIn'
import { LuMail } from 'react-icons/lu'
import { SiInstagram, SiLinkedin, SiTiktok } from 'react-icons/si'

const INITIAL = { nombre: '', email: '', servicio: '', mensaje: '' }
const ACCESS_KEY = 'df9853fb-6350-4047-a50e-cae1d9facdcf'

export default function Contact() {
  const [form, setForm]       = useState(INITIAL)
  const [sent, setSent]       = useState(false)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

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
            Contame sobre tu proyecto y te respondo en menos de 24 horas.
            Estoy disponible para colaboraciones freelance y proyectos de larga duración.
          </p>

          <div className="contact-links">
            <a href="mailto:carmela@email.com" className="contact-link-item">
              <span className="contact-link-icon"><LuMail size={18} strokeWidth={1.8} /></span>
              <span className="contact-link-info">
                <span className="contact-link-label">Email</span>
                <span className="contact-link-text">carmela@email.com</span>
              </span>
            </a>
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
            <a
              href="https://www.tiktok.com/@carsi_carmela"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-item"
            >
              <span className="contact-link-icon"><SiTiktok size={16} /></span>
              <span className="contact-link-info">
                <span className="contact-link-label">TikTok</span>
                <span className="contact-link-text">@carsi_carmela</span>
              </span>
            </a>
          </div>
        </FadeIn>

        {/* ── Formulario ── */}
        <FadeIn delay={100} from="right">
          {sent ? (
            <div className="form-success">
              <div className="form-success-icon">🌸</div>
              <h4>¡Mensaje enviado!</h4>
              <p>Te respondo a la brevedad. ¡Gracias por escribirme!</p>
              <button
                className="btn btn-outline"
                style={{ marginTop: 8 }}
                onClick={() => { setSent(false); setForm(INITIAL) }}
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
                <option value="video">Edición de video</option>
                <option value="cm">Community Management</option>
                <option value="estrategia">Estrategia de contenido</option>
                <option value="copy">Copywriting</option>
                <option value="otro">Otro</option>
              </Field>

              <Field
                label="Mensaje"
                name="mensaje"
                as="textarea"
                placeholder="Contame sobre tu proyecto, marca y lo que buscás…"
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
