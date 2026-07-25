import { ChevronsIcon } from './Icons'

const INTRO = ['H', 'i', ',', ' ', 'I', "'", 'm', ' ']
const NAME = ['R', 'a', 'k', 'e', 'e', 'n', '.']

// violet -> blue, interpolated per letter across the name
const lerpColor = (t: number) => {
  const c = (a: number, b: number) => Math.round(a + (b - a) * t)
  return `rgb(${c(139, 90)}, ${c(124, 200)}, ${c(255, 255)})`
}

export default function Hero({ atTop }: { atTop: boolean }) {
  return (
    <header className="hero">
      <h1 className="hero-title" aria-label="Hi, I'm Rakeen.">
        {INTRO.map((letter, i) => (
          <span
            key={`i${i}`}
            aria-hidden="true"
            className={`hero-letter ${letter === ' ' ? 'space' : ''}`}
            style={{ animationDelay: `${120 + i * 45}ms` }}
          >
            {letter === ' ' ? ' ' : letter}
          </span>
        ))}
        {NAME.map((letter, i) => (
          <span
            key={`n${i}`}
            aria-hidden="true"
            className="hero-letter"
            style={{
              animationDelay: `${120 + (INTRO.length + i) * 45}ms`,
              color: lerpColor(i / (NAME.length - 1)),
            }}
          >
            {letter}
          </span>
        ))}
      </h1>

      <div className={`scroll-cue ${atTop ? 'visible' : ''}`}>
        <ChevronsIcon />
        Scroll Down
        <ChevronsIcon />
      </div>
    </header>
  )
}
