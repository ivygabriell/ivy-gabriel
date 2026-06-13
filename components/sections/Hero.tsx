'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ParticleBackground } from '@/components/ui/ParticleBackground'

const HERO_LINE_1 = 'Não é a tecnologia que muda o seu negócio.'
const HERO_LINE_2 = 'É quem está no comando dela.'
const TYPING_SPEED = 48

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Phase = 'idle' | 'line1' | 'typing' | 'done'

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const [typed, setTyped] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)

  // Orquestração das fases
  useEffect(() => {
    if (reduceMotion) return

    const toLine1 = setTimeout(() => setPhase('line1'), 400)
    const toTyping = setTimeout(() => setPhase('typing'), 1500)

    return () => {
      clearTimeout(toLine1)
      clearTimeout(toTyping)
    }
  }, [reduceMotion])

  // Typewriter da linha 2 — 48ms por caractere
  useEffect(() => {
    if (phase !== 'typing') return

    if (typed.length < HERO_LINE_2.length) {
      const next = setTimeout(() => {
        setTyped(HERO_LINE_2.slice(0, typed.length + 1))
      }, TYPING_SPEED)
      return () => clearTimeout(next)
    }

    const finish = setTimeout(() => setPhase('done'), 300)
    return () => clearTimeout(finish)
  }, [phase, typed])

  // Piscar do cursor durante a digitação
  useEffect(() => {
    if (phase !== 'typing') return

    const blink = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 530)

    return () => clearInterval(blink)
  }, [phase])

  // Estados derivados — sob reduced motion tudo já nasce no estado final
  const showLine1 = reduceMotion || phase !== 'idle'
  const showDone = reduceMotion || phase === 'done'
  const line2Text = reduceMotion ? HERO_LINE_2 : typed
  const showCursor = !reduceMotion && phase === 'typing'

  return (
    <section
      aria-label="Apresentação"
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6 lg:px-12"
    >
      <ParticleBackground />

      <div className="relative z-10 mx-auto w-full max-w-content">
        {/* Label */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: showLine1 ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE }}
          className="mb-6 font-mono text-caption uppercase tracking-[0.2em] text-text-secondary"
        >
          Full Stack Developer
        </motion.p>

        {/* Headlines */}
        <div className="space-y-1">
          <motion.h1
            initial={
              reduceMotion ? false : { opacity: 0, y: 6, filter: 'blur(8px)' }
            }
            animate={{
              opacity: showLine1 ? 1 : 0,
              y: showLine1 ? 0 : 6,
              filter: showLine1 ? 'blur(0px)' : 'blur(8px)',
            }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE }}
            className="text-hero font-display text-text-muted"
          >
            {HERO_LINE_1}
          </motion.h1>

          <div
            role="status"
            aria-live="polite"
            className="min-h-[1.1em] text-hero font-display chrome-text"
          >
            {line2Text}
            {showCursor && (
              <span
                aria-hidden="true"
                className={cn(
                  'relative top-[-1px] ml-px inline-block h-[0.75em] w-[3px] bg-chrome align-middle transition-opacity duration-100',
                  cursorVisible ? 'opacity-100' : 'opacity-0'
                )}
              />
            )}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: showDone ? 1 : 0, y: showDone ? 0 : 8 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
          className="mt-12"
        >
          <Link
            href="/projetos"
            className="group inline-flex items-center gap-3 border border-border px-8 py-4 font-mono text-[12px] tracking-[0.1em] text-silver transition-colors duration-300 ease-smooth hover:border-border-strong hover:text-chrome"
          >
            Ver projetos
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Localização */}
      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: showDone ? 0.35 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE }}
        className="absolute bottom-8 right-6 z-10 font-mono text-caption text-text-secondary lg:right-12"
      >
        Anápolis, GO — 2026
      </motion.div>
    </section>
  )
}
