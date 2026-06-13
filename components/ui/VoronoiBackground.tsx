'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const POINT_COUNT_DESKTOP = 80
const POINT_COUNT_MOBILE = 40
const MAX_EDGE_DIST = 180 // distância máxima para traçar aresta
const MOVE_SPEED = 0.18 // velocidade base dos pontos
const CURSOR_RADIUS = 160 // raio de influência do cursor
const CURSOR_STRENGTH = 55 // força de repulsão (px)
const RETURN_SPEED = 0.04 // lerp de retorno à base
const LINE_OPACITY_BASE = 0.12 // opacidade base das arestas
const LINE_WIDTH = 0.4 // espessura das linhas
const DOT_RADIUS = 1.2 // raio dos pontos nas interseções
const DOT_OPACITY = 0.18 // opacidade dos pontos

const SYMBOL = '</>'
const SYMBOL_OPACITY = 0.07
const SYMBOL_SCALE = 0.30 // 30% da altura do canvas

// Interatividade mobile
const GYRO_STRENGTH = 0.4 // força do giroscópio (drift por frame)
const GYRO_SMOOTH = 0.06 // suavização do movimento do giroscópio
const TOUCH_RADIUS = 120 // raio de influência do toque
const TOUCH_STRENGTH = 2.2 // força de repulsão do toque

interface VPoint {
  bx: number // posição base x
  by: number // posição base y
  cx: number // posição atual x
  cy: number // posição atual y
  vx: number // velocidade x
  vy: number // velocidade y
}

export function VoronoiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const pointsRef = useRef<VPoint[]>([])
  const symbolPosRef = useRef({ x: 0, y: 0, size: 0 })
  const gyroRef = useRef({ x: 0, y: 0 })
  const touchesRef = useRef<{ x: number; y: number }[]>([])
  const gyroPermissionRef = useRef<'pending' | 'granted' | 'denied'>('pending')
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = !window.matchMedia('(hover: hover)').matches
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const count = isMobile ? POINT_COUNT_MOBILE : POINT_COUNT_DESKTOP

    let w = 0
    let h = 0
    let resizeObserver: ResizeObserver | undefined
    const points = pointsRef.current

    // Dimensiona o canvas respeitando devicePixelRatio (telas retina)
    const setSize = () => {
      const rect = container.getBoundingClientRect()
      w = rect.width
      h = rect.height
      const ratio = window.devicePixelRatio || 1

      canvas.width = w * ratio
      canvas.height = h * ratio
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      // Reatribuir width/height reseta o contexto — reaplicar a escala
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    // Posição única — calculada uma vez, recalculada no resize
    const initSymbolPos = () => {
      symbolPosRef.current = {
        x: w * 0.68,
        y: h * 0.50,
        size: Math.floor(h * SYMBOL_SCALE),
      }
    }

    const initPoints = () => {
      points.length = 0
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        points.push({
          bx: x,
          by: y,
          cx: x,
          cy: y,
          vx: (Math.random() - 0.5) * MOVE_SPEED,
          vy: (Math.random() - 0.5) * MOVE_SPEED,
        })
      }
    }

    let time = 0
    const loop = () => {
      time++

      // 1. Fade suave para criar profundidade
      ctx.fillStyle = 'rgba(8, 8, 8, 0.35)'
      ctx.fillRect(0, 0, w, h)

      // 2. </> grande — atrás do Voronoi, distorce com o scroll
      const scrollProgress = Math.min(window.scrollY / window.innerHeight, 1)
      const skewAmount = scrollProgress * 65 // graus
      const scaleYAmount = 1 - scrollProgress * 0.72

      const pulse = 0.5 + 0.5 * Math.sin(time * 0.018)
      const symbolAlpha = 0.04 + pulse * 0.06

      ctx.save()
      ctx.translate(symbolPosRef.current.x, symbolPosRef.current.y)
      ctx.transform(
        1, // scaleX
        Math.tan((skewAmount * Math.PI) / 180), // skewY
        Math.tan((skewAmount * Math.PI) / 180), // skewX
        scaleYAmount, // scaleY
        0,
        0
      )
      ctx.fillStyle = `rgba(240, 240, 255, ${symbolAlpha})`
      ctx.font = `bold ${symbolPosRef.current.size}px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(SYMBOL, 0, 0) // 0,0 porque já foi translate
      ctx.restore()

      const mouse = mouseRef.current

      // 3. Atualizar posição de cada ponto
      points.forEach((p) => {
        const dx = p.cx - mouse.x
        const dy = p.cy - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < CURSOR_RADIUS && dist > 0) {
          // Influência do cursor — distorção
          const force = 1 - dist / CURSOR_RADIUS
          const targetX = p.bx + (dx / dist) * CURSOR_STRENGTH * force
          const targetY = p.by + (dy / dist) * CURSOR_STRENGTH * force
          p.cx += (targetX - p.cx) * 0.12
          p.cy += (targetY - p.cy) * 0.12
        } else {
          // Movimento autônomo + retorno à base
          p.bx += p.vx
          p.by += p.vy

          // Giroscópio (mobile) — desloca a base na direção da inclinação
          if (isMobile) {
            p.bx += gyroRef.current.x * GYRO_STRENGTH
            p.by += gyroRef.current.y * GYRO_STRENGTH
          }

          // Bounce nas bordas (base)
          if (p.bx < 0 || p.bx > w) p.vx *= -1
          if (p.by < 0 || p.by > h) p.vy *= -1
          p.bx = Math.max(0, Math.min(w, p.bx))
          p.by = Math.max(0, Math.min(h, p.by))

          // Lerp posição atual em direção à base
          p.cx += (p.bx - p.cx) * RETURN_SPEED
          p.cy += (p.by - p.cy) * RETURN_SPEED
        }

        // Toque (mobile) — repele os pontos ao redor de cada dedo.
        // Empurra a posição renderizada (cx/cy); ao soltar, o lerp de
        // retorno à base traz os pontos de volta ao fluxo normal.
        if (isMobile && touchesRef.current.length > 0) {
          touchesRef.current.forEach((touch) => {
            const tdx = p.cx - touch.x
            const tdy = p.cy - touch.y
            const tdist = Math.sqrt(tdx * tdx + tdy * tdy)

            if (tdist < TOUCH_RADIUS && tdist > 0) {
              const force = (1 - tdist / TOUCH_RADIUS) * TOUCH_STRENGTH
              p.cx += (tdx / tdist) * force
              p.cy += (tdy / tdist) * force
            }
          })
        }
      })

      // 4. Desenhar arestas entre pontos próximos
      ctx.lineWidth = LINE_WIDTH
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i]
          const b = points[j]
          const dx = a.cx - b.cx
          const dy = a.cy - b.cy
          const d = Math.sqrt(dx * dx + dy * dy)

          if (d > MAX_EDGE_DIST) continue

          // Opacidade diminui com a distância
          const alpha = LINE_OPACITY_BASE * (1 - d / MAX_EDGE_DIST)

          ctx.beginPath()
          ctx.moveTo(a.cx, a.cy)
          ctx.lineTo(b.cx, b.cy)
          ctx.strokeStyle = `rgba(180, 180, 180, ${alpha})`
          ctx.stroke()
        }
      }

      // 5. Desenhar pontos nas posições atuais
      ctx.fillStyle = `rgba(180, 180, 180, ${DOT_OPACITY})`
      points.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.cx, p.cy, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fill()
      })

      animRef.current = requestAnimationFrame(loop)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    // --- Giroscópio (mobile) ---
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (!isMobile) return

      // beta:  inclinação frente/trás | gamma: esquerda/direita
      const beta = e.beta ?? 0
      const gamma = e.gamma ?? 0

      // Normalizar para -1 a 1 (beta neutro ≈ 45°, telefone em uso)
      const normalX = Math.max(-1, Math.min(1, gamma / 45))
      const normalY = Math.max(-1, Math.min(1, (beta - 45) / 45))

      // Suavizar via lerp
      gyroRef.current.x += (normalX - gyroRef.current.x) * GYRO_SMOOTH
      gyroRef.current.y += (normalY - gyroRef.current.y) * GYRO_SMOOTH
    }

    const setupGyro = async () => {
      if (!isMobile) return

      type DOEWithPermission = typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<'granted' | 'denied'>
      }
      const DOE = DeviceOrientationEvent as DOEWithPermission

      // iOS 13+ exige permissão explícita; demais plataformas não
      if (isIOS && typeof DOE.requestPermission === 'function') {
        try {
          const permission = await DOE.requestPermission()
          if (permission === 'granted') {
            gyroPermissionRef.current = 'granted'
            window.addEventListener('deviceorientation', onOrientation)
          } else {
            gyroPermissionRef.current = 'denied'
          }
        } catch {
          gyroPermissionRef.current = 'denied'
        }
      } else {
        gyroPermissionRef.current = 'granted'
        window.addEventListener('deviceorientation', onOrientation)
      }
    }

    // --- Toque (mobile) ---
    const updateTouches = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      touchesRef.current = Array.from(e.touches).map((t) => ({
        x: t.clientX - rect.left,
        y: t.clientY - rect.top,
      }))
    }

    const onTouchStart = (e: TouchEvent) => {
      if (!isMobile) return
      // iOS só concede a permissão do giroscópio sob gesto do usuário
      if (gyroPermissionRef.current === 'pending') setupGyro()
      updateTouches(e)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isMobile) return
      e.preventDefault() // evita scroll durante a interação no canvas
      updateTouches(e)
    }

    const onTouchEnd = () => {
      touchesRef.current = []
    }

    // Aguarda o próximo frame para garantir dimensões reais do DOM
    const frameId = requestAnimationFrame(() => {
      setSize()
      if (w <= 0 || h <= 0) return
      initSymbolPos()
      initPoints()
      animRef.current = requestAnimationFrame(loop)

      resizeObserver = new ResizeObserver(() => {
        setSize()
        initSymbolPos()
      })
      resizeObserver.observe(container)
    })

    if (!isMobile) {
      // Desktop: rastreamento do mouse
      window.addEventListener('mousemove', onMouseMove, { passive: true })
      canvas.addEventListener('mouseleave', onMouseLeave)
    } else {
      // Mobile: giroscópio + toque.
      // O container tem pointer-events:none — reabilitar no canvas para
      // que os eventos de toque cheguem (o conteúdo z-10 continua acima).
      canvas.style.pointerEvents = 'auto'
      setupGyro()
      canvas.addEventListener('touchstart', onTouchStart, { passive: true })
      canvas.addEventListener('touchmove', onTouchMove, { passive: false })
      canvas.addEventListener('touchend', onTouchEnd, { passive: true })
    }

    return () => {
      cancelAnimationFrame(animRef.current)
      cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)

      if (isMobile) {
        window.removeEventListener('deviceorientation', onOrientation)
        canvas.removeEventListener('touchstart', onTouchStart)
        canvas.removeEventListener('touchmove', onTouchMove)
        canvas.removeEventListener('touchend', onTouchEnd)
      }
    }
  }, [reduceMotion])

  if (reduceMotion) return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  )
}
