import { useCallback, useEffect, useRef, useState } from 'react'

export function useActiveSection(ids: string[], enabled = true) {
  const [active, setActive] = useState(ids[0])
  const navigationTarget = useRef<string | null>(null)
  const navigationTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const navigateToSection = useCallback((id: string) => {
    navigationTarget.current = id
    setActive(id)
    clearTimeout(navigationTimer.current)
    navigationTimer.current = setTimeout(() => {
      navigationTarget.current = null
    }, 2000)
  }, [])

  useEffect(() => {
    if (!enabled) return

    let frame: number | null = null
    let disposed = false
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    let bounds: Array<{ id: string; top: number; bottom: number }> = []

    const measure = () => {
      bounds = sections.map((section) => {
        const rect = section.getBoundingClientRect()
        return {
          id: section.id,
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        }
      })
    }

    const update = () => {
      frame = null
      if (navigationTarget.current) return

      const viewportAnchor = window.scrollY + window.innerHeight * 0.28
      let nextId = bounds[0]?.id ?? ids[0]
      for (const section of bounds) {
        if (section.top > viewportAnchor) break
        nextId = section.id
      }

      setActive((current) => (current === nextId ? current : nextId))
    }

    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(update)
    }

    const scheduleMeasure = () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        frame = null
        measure()
        update()
      })
    }

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === 'min-height') scheduleMeasure()
    }

    const onScrollEnd = () => {
      if (!navigationTarget.current) return
      navigationTarget.current = null
      clearTimeout(navigationTimer.current)
    }

    measure()
    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleMeasure)
    window.addEventListener('transitionend', onTransitionEnd)
    window.addEventListener('scrollend', onScrollEnd)
    document.fonts?.ready.then(() => {
      if (!disposed) scheduleMeasure()
    })

    return () => {
      disposed = true
      if (frame !== null) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleMeasure)
      window.removeEventListener('transitionend', onTransitionEnd)
      window.removeEventListener('scrollend', onScrollEnd)
      clearTimeout(navigationTimer.current)
    }
  }, [ids, enabled])

  return { active, navigateToSection }
}

export function useAtTopOfWindow(threshold = 120) {
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    let current = window.scrollY < threshold
    setAtTop(current)
    const onScroll = () => {
      const next = window.scrollY < threshold
      if (next === current) return
      current = next
      setAtTop(next)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return atTop
}
