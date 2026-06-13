'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const INFLUENCE_RADIUS = 140
const REPULSION = 0.03

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // O cursor é capturado pela section pai (o container é pointer-events-none)
    const interactiveTarget = container.parentElement

    // Touch / sem hover: menos pontos e sem interação de cursor
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const count = isTouch ? 40 : 80
    const interactive = !isTouch && !!interactiveTarget

    let width = 0
    let height = 0
    let raf = 0
    let frameId = 0
    let mouseTimeout: ReturnType<typeof setTimeout> | undefined
    let observer: ResizeObserver | undefined

    const mouse = { x: 0, y: 0, active: false }
    const particles: Particle[] = []

    const updateSize = () => {
      const { width: w, height: h } = container.getBoundingClientRect()
      width = w
      height = h
      const ratio = window.devicePixelRatio || 1

      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx.fillStyle = 'rgba(180, 180, 180, 0.28)'

      return width > 0 && height > 0
    }

    const init = () => {
      particles.length = 0
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: rand(-0.15, 0.15),
          vy: rand(-0.15, 0.15),
          r: rand(0.8, 1.8),
        })
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Repulsão suave ao redor do cursor (apenas desktop e cursor ativo)
        if (interactive && mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist > 0 && dist < INFLUENCE_RADIUS) {
            const push = (INFLUENCE_RADIUS - dist) * REPULSION
            p.x += (dx / dist) * push
            p.y += (dy / dist) * push
          }
        }

        // Wrap nas bordas
        if (p.x < -p.r) p.x = width + p.r
        else if (p.x > width + p.r) p.x = -p.r
        if (p.y < -p.r) p.y = height + p.r
        else if (p.y > height + p.r) p.y = -p.r

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
      if (mouseTimeout) clearTimeout(mouseTimeout)
      // Cursor parado = pontos voltam ao comportamento normal
      mouseTimeout = setTimeout(() => {
        mouse.active = false
      }, 100)
    }

    const onMouseLeave = () => {
      mouse.active = false
      if (mouseTimeout) clearTimeout(mouseTimeout)
    }

    // Aguarda o próximo frame para garantir que o DOM tem dimensões reais
    frameId = requestAnimationFrame(() => {
      if (!updateSize()) return
      init()
      raf = requestAnimationFrame(tick)

      observer = new ResizeObserver(() => updateSize())
      observer.observe(container)
    })

    if (interactive && interactiveTarget) {
      interactiveTarget.addEventListener('mousemove', onMouseMove)
      interactiveTarget.addEventListener('mouseleave', onMouseLeave)
    }

    return () => {
      cancelAnimationFrame(frameId)
      cancelAnimationFrame(raf)
      observer?.disconnect()
      if (mouseTimeout) clearTimeout(mouseTimeout)
      if (interactive && interactiveTarget) {
        interactiveTarget.removeEventListener('mousemove', onMouseMove)
        interactiveTarget.removeEventListener('mouseleave', onMouseLeave)
      }
    }
  }, [reduceMotion])

  if (reduceMotion) return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  )
}
