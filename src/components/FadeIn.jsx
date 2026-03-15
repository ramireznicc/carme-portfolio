import { useFadeIn } from '../hooks/useFadeIn'

/**
 * Wraps children in a div that animates into view on scroll.
 * @param {string}  from       - animation direction: 'up' | 'left' | 'right' | 'scale'
 * @param {string}  className  - extra CSS classes on the wrapper
 * @param {number}  delay      - stagger delay in ms
 * @param {string}  tag        - HTML tag to render ('div' by default)
 */
export default function FadeIn({ children, className = '', delay = 0, from = 'up', tag: Tag = 'div' }) {
  const ref = useFadeIn(delay)
  return (
    <Tag ref={ref} className={`reveal reveal-${from} ${className}`}>
      {children}
    </Tag>
  )
}
