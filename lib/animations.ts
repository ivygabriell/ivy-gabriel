import type { Variants } from 'framer-motion'

/** Easing padrão do projeto — cubic-bezier(0.22, 1, 0.36, 1). */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Configuração de viewport para animações de scroll (dispara uma vez). */
export const VIEWPORT = { once: true, margin: '-80px' } as const

/** Entrada padrão das seções: fade + translateY(12px → 0). */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}
