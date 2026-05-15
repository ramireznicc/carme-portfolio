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
      const sections = [...document.querySelectorAll('.section')]
      if (!sections.length) return

      // Sección actual: la última cuyo top ya cruzó el borde superior del viewport
      let idx = 0
      sections.forEach((s, i) => {
        if (s.getBoundingClientRect().top <= 0) idx = i
      })

      // Solo snap en la transición Hero (idx=0) ↔ About (idx=1)
      const isHeroToAbout = idx === 0 && dir === 1
      const isAboutToHero = idx === 1 && dir === -1
      if (!isHeroToAbout && !isAboutToHero) return

      const next = idx + dir

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
