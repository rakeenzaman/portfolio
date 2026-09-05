interface RailProps {
  sections: { id: string; label: string }[]
  active: string
  visible: boolean
  onNavigate: (id: string) => void
}

export default function Rail({ sections, active, visible, onNavigate }: RailProps) {
  const scrollTo = (id: string) => {
    onNavigate(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={`rail ${visible ? 'visible' : ''}`} aria-label="Sections">
      {sections.map((s, i) => (
        <button
          key={s.id}
          className={`rail-item ${active === s.id ? 'active' : ''}`}
          onClick={() => scrollTo(s.id)}
        >
          <span className="rail-num">{String(i + 1).padStart(2, '0')}</span>
          <span className="rail-tick" aria-hidden="true" />
          <span className="rail-label">{s.label}</span>
        </button>
      ))}
    </nav>
  )
}
