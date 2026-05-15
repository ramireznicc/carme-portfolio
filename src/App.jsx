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
      if (e.deltaY <= 0) return  // solo al bajar

      const sections = [...document.querySelectorAll('.section')]
      if (sections.length < 2) return

      // Solo snap si el Hero todavía está en el viewport (top >= -50px)
      if (sections[0].getBoundingClientRect().top < -50) return

      // Prevenir doble-snap durante la animación
      if (locked) { e.preventDefault(); return }

      e.preventDefault()
      locked = true
      sections[1].scrollIntoView({ behavior: 'smooth', block: 'start' })
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
