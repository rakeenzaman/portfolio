interface RailProps {
  sections: { id: string; label: string }[]
  active: string
  visible: boolean
}

export default function Rail({ sections, active, visible }: RailProps) {
  const scrollTo = (id: string) => {
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
          <span className="rail-tick" />
          <span className="rail-label">{s.label}</span>
        </button>
      ))}
    </nav>
  )
}
