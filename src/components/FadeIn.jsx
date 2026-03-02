import { useFadeIn } from '../hooks/useFadeIn'

/**
 * Wraps children in a div that fades in when scrolled into view.
 * @param {string}  className  - extra CSS classes on the wrapper
 * @param {number}  delay      - stagger delay in ms
 * @param {string}  tag        - HTML tag to render ('div' by default)
 */
export default function FadeIn({ children, className = '', delay = 0, tag: Tag = 'div' }) {
  const ref = useFadeIn(delay)
  return (
    <Tag ref={ref} className={`fade-in ${className}`}>
      {children}
    </Tag>
  )
}
