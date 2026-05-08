import { useEffect } from 'react'
import Navbar           from './components/Navbar'
import Hero             from './components/Hero'
import About            from './components/About'
import Portfolio        from './components/Portfolio'
import Contact          from './components/Contact'
import Footer           from './components/Footer'

function useSectionSnap() {
  useEffect(() => {
    let locked = false

    const onWheel = (e) => {
      if (window.innerWidth < 900) return
      if (e.target.closest('.swiper')) return

      // Bloquear todo durante la animación para no interferir
      if (locked) { e.preventDefault(); return }

      const dir      = e.deltaY > 0 ? 1 : -1
      const vh       = window.innerHeight
      const sections = [...document.querySelectorAll('.section')]
      if (!sections.length) return

      // Sección actual: la última cuyo top ya cruzó el borde superior del viewport
      let idx = 0
      sections.forEach((s, i) => {
        if (s.getBoundingClientRect().top <= 0) idx = i
      })

      const cur  = sections[idx]
      const rect = cur.getBoundingClientRect()

      // Portfolio y About: scroll libre mientras haya contenido que ver
      if (cur.id === 'portfolio' || cur.id === 'sobre-mi') {
        if (dir > 0 && rect.bottom > vh + 50) return
        if (dir < 0 && rect.top  < -50)       return
      }

      // Última sección: scroll libre para ver el final de la página
      if (dir > 0 && idx === sections.length - 1) return

      const next = Math.max(0, Math.min(sections.length - 1, idx + dir))
      if (next === idx) return

      e.preventDefault()
      locked = true
      sections[next].scrollIntoView({ behavior: 'smooth', block: 'start' })
      const fallback = setTimeout(() => { locked = false }, 1500)
      window.addEventListener('scrollend', () => {
        clearTimeout(fallback)
        setTimeout(() => { locked = false }, 500)
      }, { once: true })
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])
}

export default function App() {
  useSectionSnap()
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
