import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { timeline } from '../data'
import type { TimelineEntry } from '../data'
import { BriefcaseIcon, CloseIcon, GradCapIcon, PlusIcon } from './Icons'

const MOBILE_QUERY = '(max-width: 820px)'

// Horizontal reads left (earliest) -> right (present); the data is newest-first.
const chronological = [...timeline].reverse()

// Degrees and the current role are the highlights; other roles are shown smaller.
const isFeatured = (e: TimelineEntry) => e.kind === 'education' || !!e.current

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const on = () => setMobile(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return mobile
}

const icon = (entry: TimelineEntry) =>
  entry.kind === 'education' ? <GradCapIcon /> : <BriefcaseIcon />

function DetailsButton({ entry, onOpen }: { entry: TimelineEntry; onOpen: (e: TimelineEntry) => void }) {
  if (!entry.bullets) return null
  return (
    <button className="t-more" onClick={() => onOpen(entry)}>
      <PlusIcon />
      Details
    </button>
  )
}

function HorizontalEntry({
  entry,
  above,
  onOpen,
}: {
  entry: TimelineEntry
  above: boolean
  onOpen: (e: TimelineEntry) => void
}) {
  const size = isFeatured(entry) ? 'featured' : 'small'
  return (
    <div
      className={`t-col t-item ${entry.kind} ${size} ${entry.current ? 'current' : ''} ${
        above ? 'above' : 'below'
      }`}
    >
      <div className="t-dot">{icon(entry)}</div>
      <div className="t-card">
        <span className="t-dates">{entry.dates}</span>
        <h3 className="t-title">{entry.title}</h3>
        <div className="t-subtitle">{entry.subtitle}</div>
        <div className="t-org">{entry.org}</div>
        <DetailsButton entry={entry} onOpen={onOpen} />
      </div>
    </div>
  )
}

function VerticalEntry({
  entry,
  onOpen,
}: {
  entry: TimelineEntry
  onOpen: (e: TimelineEntry) => void
}) {
  return (
    <article className={`t-entry t-item ${entry.kind} ${entry.current ? 'current' : ''}`}>
      <div className="t-card">
        <div className="t-head">
          <div className="t-dot">{icon(entry)}</div>
          <div className="t-meta">
            <span className="t-dates">{entry.dates}</span>
            <span className="t-org">{entry.org}</span>
          </div>
          <h3 className="t-title">{entry.title}</h3>
          <div className="t-subtitle">{entry.subtitle}</div>
        </div>
        <DetailsButton entry={entry} onOpen={onOpen} />
      </div>
    </article>
  )
}

function DetailsModal({ entry, onClose }: { entry: TimelineEntry; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal ${entry.kind}`}
        role="dialog"
        aria-modal="true"
        aria-label={entry.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
        <div className="modal-icon">{icon(entry)}</div>
        <span className="modal-dates">{entry.dates}</span>
        <h3 className="modal-title">{entry.title}</h3>
        <div className="modal-subtitle">{entry.subtitle}</div>
        <div className="modal-org">{entry.org}</div>
        {entry.bullets && (
          <ul className="modal-bullets">
            {entry.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </div>,
    document.body,
  )
}

export default function Timeline() {
  const mobile = useIsMobile()
  const [active, setActive] = useState<TimelineEntry | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  // Position the line/fill and lit states off the real dot positions.
  // Desktop (horizontal): filled all the way on init — no scroll animation.
  // Mobile (vertical): the fill grows with scroll via a rAF loop while on screen.
  useEffect(() => {
    const track = trackRef.current
    const line = lineRef.current
    const fill = fillRef.current
    if (!track || !line || !fill) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let running = false

    const update = () => {
      const items = Array.from(track.querySelectorAll<HTMLElement>('.t-item'))
      const dots = items.map((item) => item.querySelector<HTMLElement>('.t-dot'))
      if (!items.length || dots.some((d) => !d)) return
      const trackRect = track.getBoundingClientRect()
      const vh = window.innerHeight
      const rects = dots.map((dot) => dot!.getBoundingClientRect())

      if (mobile) {
        // vertical: fill top -> bottom, focus point ~2/3 down the viewport
        const centers = rects.map((r) => r.top + r.height / 2 - trackRect.top)
        const first = centers[0]
        const last = centers[centers.length - 1]
        const focus = reduced ? Infinity : vh * 0.66 - trackRect.top
        const filled = Math.min(last - first, Math.max(0, focus - first))
        line.style.left = line.style.width = ''
        fill.style.left = fill.style.width = ''
        line.style.top = `${first}px`
        line.style.height = `${last - first}px`
        fill.style.top = `${first}px`
        fill.style.height = `${filled}px`
        items.forEach((item, i) => item.toggleAttribute('data-lit', filled + first >= centers[i]))
      } else {
        // horizontal: line is fully filled and every node lit from the start
        const centers = rects.map((r) => r.left + r.width / 2 - trackRect.left)
        const first = centers[0]
        const last = centers[centers.length - 1]
        line.style.top = line.style.height = ''
        fill.style.top = fill.style.height = ''
        line.style.left = `${first}px`
        line.style.width = `${last - first}px`
        fill.style.left = `${first}px`
        fill.style.width = `${last - first}px`
        items.forEach((item) => item.toggleAttribute('data-lit', true))
      }
    }

    const loop = () => {
      update()
      if (running) raf = requestAnimationFrame(loop)
    }

    // Only the mobile fill animates with scroll; desktop just measures once
    // (plus on resize / font load) so the full line lands in the right place.
    const io = new IntersectionObserver(
      ([e]) => {
        if (!mobile || reduced) return
        if (e.isIntersecting && !running) {
          running = true
          raf = requestAnimationFrame(loop)
        } else if (!e.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { rootMargin: '120px 0px' },
    )
    io.observe(track)
    update()
    raf = requestAnimationFrame(update)
    document.fonts?.ready.then(update)
    window.addEventListener('resize', update)

    // Re-measure whenever the track's own box changes — covers scrollbar
    // toggling, subtitle wrapping/reflow, and font swaps. On desktop there's no
    // animation loop, so without this the line length goes stale after mount.
    const ro = new ResizeObserver(update)
    ro.observe(track)

    return () => {
      running = false
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('resize', update)
      cancelAnimationFrame(raf)
    }
  }, [mobile])

  return (
    <section className="section" id="timeline">
      <div className="section-head" data-reveal>
        <span className="section-num">02</span>
        <h2 className="section-title">Experience &amp; Education</h2>
      </div>
      <div className={`timeline ${mobile ? 'vertical' : 'horizontal'}`} ref={trackRef}>
        <div className="t-line" aria-hidden="true" ref={lineRef} />
        <div className="t-line-fill" aria-hidden="true" ref={fillRef} />
        {mobile
          ? timeline.map((entry) => <VerticalEntry key={entry.title} entry={entry} onOpen={setActive} />)
          : chronological.map((entry, i) => (
              <HorizontalEntry key={entry.title} entry={entry} above={i % 2 === 0} onOpen={setActive} />
            ))}
      </div>
      {active && <DetailsModal entry={active} onClose={() => setActive(null)} />}
    </section>
  )
}
