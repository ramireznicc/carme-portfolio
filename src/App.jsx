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

      // Portfolio: scroll libre mientras haya contenido que ver
      if (cur.id === 'portfolio') {
        if (dir > 0 && rect.bottom > vh + 50) return
        if (dir < 0 && rect.top  < -50)       return
      }

      // Última sección: scroll libre para ver el final de la página
      if (dir > 0 && idx === sections.length - 1) return

      e.preventDefault()
      if (locked) return

      const next = Math.max(0, Math.min(sections.length - 1, idx + dir))
      if (next === idx) return

      locked = true
      sections[next].scrollIntoView({ behavior: 'smooth', block: 'start' })
      const release = () => { locked = false }
      window.addEventListener('scrollend', release, { once: true })
      setTimeout(release, 1500)
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
