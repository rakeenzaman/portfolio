import { useEffect } from 'react'

/**
 * Marks every [data-reveal] element with data-revealed as it enters the viewport.
 * An attribute (not a class) so React re-renders that rewrite className don't erase it.
 * Elements can set --reveal-delay via data-delay (ms) for stagger.
 */
export function useReveal(refreshKey?: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', '')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => {
      const delay = el.dataset.delay
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [refreshKey])
}
