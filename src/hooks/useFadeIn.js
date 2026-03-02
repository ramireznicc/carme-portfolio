import { useEffect, useRef } from 'react'

/**
 * Returns a ref to attach to a DOM element.
 * When the element enters the viewport it gets the 'visible' class
 * (paired with the .fade-in / .fade-in.visible CSS rules).
 *
 * @param {number} delay - extra delay in ms (for stagger effects)
 */
export function useFadeIn(delay = 0) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return ref
}
