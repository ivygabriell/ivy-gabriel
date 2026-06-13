'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const WAVE_CONFIG = [
  {
    opacity:   0.45,
    color:     '180, 180, 200',
    blur:      '1px',
    duration:  8000,
    amplitude: 40,
    offsetY:   0.35,
    lineWidth: 1.2,
  },
  {
    opacity:   0.28,
    color:     '200, 200, 220',
    blur:      '1px',
    duration:  11000,
    amplitude: 30,
    offsetY:   0.55,
    lineWidth: 0.8,
  },
  {
    opacity:   0.18,
    color:     '160, 160, 180',
    blur:      '0.5px',
    duration:  14000,
    amplitude: 22,
    offsetY:   0.45,
    lineWidth: 0.6,
  },
]

export function WaveDivider() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const animRef      = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const reduced      = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ratio = window.devicePixelRatio || 1
    const W     = window.innerWidth
    const H     = 180

    canvas.width        = W * ratio
    canvas.height       = H * ratio
    canvas.style.width  = `${W}px`
    canvas.style.height = `${H}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(ratio, ratio)

    startTimeRef.current = performance.now()

    function draw(now: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)

      const elapsed = now - startTimeRef.current

      WAVE_CONFIG.forEach((wave) => {
        const t    = (elapsed % wave.duration) / wave.duration
        const ease = 0.5 - 0.5 * Math.cos(t * Math.PI * 2)

        const baseY = H * wave.offsetY
        const cp1x  = W * 0.25
        const cp1y  = baseY - wave.amplitude + ease * wave.amplitude * 2
        const cp2x  = W * 0.75
        const cp2y  = baseY + wave.amplitude - ease * wave.amplitude * 2

        ctx.beginPath()
        ctx.moveTo(-20, baseY)
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, W + 20, baseY)
        ctx.strokeStyle = `rgba(${wave.color}, ${wave.opacity})`
        ctx.lineWidth   = wave.lineWidth
        ctx.filter      = `blur(${wave.blur})`
        ctx.stroke()
        ctx.filter      = 'none'
      })

      animRef.current = requestAnimationFrame(draw)
    }

    if (reduced) {
      draw(startTimeRef.current)
    } else {
      animRef.current = requestAnimationFrame(draw)
    }

    return () => cancelAnimationFrame(animRef.current)
  }, [reduced])

  return (
    <div
      aria-hidden="true"
      style={{
        position:      'relative',
        width:         '100%',
        height:        '180px',
        marginTop:     '-90px',
        marginBottom:  '-90px',
        pointerEvents: 'none',
        zIndex:        20,
        overflow:      'visible',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  )
}
