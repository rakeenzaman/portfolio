const INTRO = ['H', 'i', ',', ' ', 'I', "'", 'm', ' ']
const NAME = ['R', 'a', 'k', 'e', 'e', 'n', '.']
const INTRO_DELAY_MS = 1000
const LETTER_STAGGER_MS = 95

// violet -> blue, interpolated per letter across the name
const lerpColor = (t: number) => {
  const c = (a: number, b: number) => Math.round(a + (b - a) * t)
  return `rgb(${c(139, 90)}, ${c(124, 200)}, ${c(255, 255)})`
}

interface HeroProps {
  introComplete: boolean
  onIntroComplete: () => void
}

export default function Hero({ introComplete, onIntroComplete }: HeroProps) {
  return (
    <header className={`hero ${introComplete ? 'intro-complete' : ''}`}>
      <h1 className="hero-title" aria-label="Hi, I'm Rakeen.">
        {INTRO.map((letter, i) => (
          <span
            key={`i${i}`}
            aria-hidden="true"
            className={`hero-letter ${letter === ' ' ? 'space' : ''}`}
            style={{ animationDelay: `${INTRO_DELAY_MS + i * LETTER_STAGGER_MS}ms` }}
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
              animationDelay: `${INTRO_DELAY_MS + (INTRO.length + i) * LETTER_STAGGER_MS}ms`,
              color: lerpColor(i / (NAME.length - 1)),
            }}
            onAnimationEnd={i === NAME.length - 1 ? onIntroComplete : undefined}
          >
            {letter}
          </span>
        ))}
      </h1>
    </header>
  )
}
