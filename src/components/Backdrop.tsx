import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  phase: number
  speed: number
  color: string
}

const STAR_COLORS = ['#8b7cff', '#5ac8ff', '#c9c9e8']

export default function Backdrop() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // cursor spotlight position for the bright grid layer
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const onMove = (e: PointerEvent) => {
      root.style.setProperty('--mx', `${e.clientX}px`)
      root.style.setProperty('--my', `${e.clientY}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  // twinkling starfield
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let stars: Star[] = []
    let raf = 0

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      const count = Math.floor((window.innerWidth * window.innerHeight) / 26000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (0.5 + Math.random() * 1.1) * dpr,
        phase: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 1.8,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }))
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const star of stars) {
        const alpha = reduced ? 0.35 : 0.12 + 0.32 * (0.5 + 0.5 * Math.sin(t / 1000 * star.speed + star.phase))
        ctx.globalAlpha = alpha
        ctx.fillStyle = star.color
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (!reduced) raf = requestAnimationFrame(draw)
    }

    resize()
    draw(0)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="backdrop" ref={rootRef} aria-hidden="true">
      <canvas ref={canvasRef} className="stars" />
      <div className="grid-layer" />
      <div className="grid-layer bright" />
      <div className="vignette" />
    </div>
  )
}
