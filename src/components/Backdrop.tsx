import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  alpha: number
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
    let frame = 0
    let x = 0
    let y = 0

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (frame) return

      frame = requestAnimationFrame(() => {
        frame = 0
        root.style.setProperty('--mx', `${x}px`)
        root.style.setProperty('--my', `${y}px`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  // twinkling starfield
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let stars: Star[] = []

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
        alpha: 0.12 + Math.random() * 0.32,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const star of stars) {
        ctx.globalAlpha = star.alpha
        ctx.fillStyle = star.color
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const onResize = () => {
      resize()
      draw()
    }

    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
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
