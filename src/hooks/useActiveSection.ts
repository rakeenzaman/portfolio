import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[], enabled = true) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (!enabled) return

    let frame: number | null = null

    const update = () => {
      frame = null
      const viewportCenter = window.innerHeight / 2
      let closestId = ids[0]
      let closestDistance = Number.POSITIVE_INFINITY

      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return

        const rect = el.getBoundingClientRect()
        const distance =
          viewportCenter < rect.top
            ? rect.top - viewportCenter
            : viewportCenter > rect.bottom
              ? viewportCenter - rect.bottom
              : 0

        if (distance < closestDistance) {
          closestId = id
          closestDistance = distance
        }
      })

      setActive((current) => (current === closestId ? current : closestId))
    }

    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [ids, enabled])

  return active
}

export function useAtTopOfWindow(threshold = 120) {
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return atTop
}
