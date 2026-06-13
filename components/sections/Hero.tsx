'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { siGithub, siInstagram, siWhatsapp } from 'simple-icons'
import { VoronoiBackground } from '@/components/ui/VoronoiBackground'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const LABEL_FULL = 'Olá, me chamo'
const TYPING_SPEED = 60

type HeroPhase = 'label' | 'name' | 'content' | 'done'

// simple-icons removeu o LinkedIn (v16) — path oficial mantido inline
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

const socialLinks = [
  {
    path: siGithub.path,
    href: 'https://github.com/ivygabriell',
    label: 'GitHub',
  },
  {
    path: LINKEDIN_PATH,
    href: 'https://www.linkedin.com/in/ivygabriel/',
    label: 'LinkedIn',
  },
  {
    path: siInstagram.path,
    href: 'https://www.instagram.com/ivygabriell_/',
    label: 'Instagram',
  },
  {
    path: siWhatsapp.path,
    href: 'https://wa.me/5562995024778',
    label: 'WhatsApp',
  },
]

export function Hero() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<HeroPhase>('label')
  const [labelText, setLabelText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  // Reduced motion — tudo visível instantaneamente, sem sequência
  useEffect(() => {
    if (!reduced) return
    setLabelText(LABEL_FULL)
    setShowCursor(false)
    setPhase('done')
  }, [reduced])

  // 1. Typewriter da label "Olá, me chamo"
  useEffect(() => {
    if (reduced || phase !== 'label') return

    let i = 0
    const interval = setInterval(() => {
      i++
      setLabelText(LABEL_FULL.slice(0, i))
      if (i >= LABEL_FULL.length) {
        clearInterval(interval)
        // Pequena pausa antes de avançar
        setTimeout(() => {
          setShowCursor(false)
          setPhase('name')
        }, 400)
      }
    }, TYPING_SPEED)

    return () => clearInterval(interval)
  }, [reduced, phase])

  // 2. Cursor piscante durante o typewriter
  useEffect(() => {
    if (reduced || phase !== 'label') return
    const interval = setInterval(() => {
      setShowCursor((v) => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [reduced, phase])

  // 3. Avançar de name para content (após a animação de blur do nome)
  useEffect(() => {
    if (phase !== 'name') return
    const timer = setTimeout(() => setPhase('content'), 900)
    return () => clearTimeout(timer)
  }, [phase])

  // 4. Avançar de content para done (700ms base + 4 × 150ms stagger)
  useEffect(() => {
    if (phase !== 'content') return
    const timer = setTimeout(() => setPhase('done'), 1300)
    return () => clearTimeout(timer)
  }, [phase])

  const nameVisible = phase === 'name' || phase === 'content' || phase === 'done'
  const contentVisible = phase === 'content' || phase === 'done'

  // Entrada em sequência do bloco de conteúdo — stagger por índice
  const contentEnter = (index: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 10 },
    animate: contentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    transition: {
      duration: reduced ? 0 : 0.7,
      delay: reduced ? 0 : index * 0.15,
      ease: EASE,
    },
  })

  return (
    <section
      aria-label="Apresentação"
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden"
    >
      <VoronoiBackground />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-content items-center px-6 lg:px-12">
        {/* Coluna esquerda */}
        <div className="flex w-full flex-col gap-6 py-20 md:w-[60%]">
          {/* Label — typewriter */}
          <motion.p
            aria-live="polite"
            className="font-mono text-caption uppercase tracking-[0.2em]"
            style={{ color: '#F0F0FF' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {labelText}
            {phase === 'label' && (
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '0.8em',
                  background: '#F0F0FF',
                  marginLeft: '2px',
                  verticalAlign: 'middle',
                  opacity: showCursor ? 1 : 0,
                  transition: 'opacity 0.1s',
                }}
              />
            )}
          </motion.p>

          {/* Nome — blur → sharp */}
          <motion.h1
            className="font-display font-black leading-[0.95] tracking-[-0.03em] text-text-primary"
            style={{ fontSize: 'clamp(56px, 8vw, 96px)' }}
            initial={reduced ? {} : { opacity: 0, filter: 'blur(12px)' }}
            animate={
              nameVisible
                ? { opacity: 1, filter: 'blur(0px)' }
                : { opacity: 0, filter: 'blur(12px)' }
            }
            transition={{ duration: reduced ? 0 : 0.9, ease: EASE }}
          >
            Ivy Gabriel
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            {...contentEnter(0)}
            className="font-display font-semibold text-silver"
            style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', letterSpacing: '-0.01em' }}
          >
            Full Stack Developer & Mobile
          </motion.p>

          {/* Parágrafo */}
          <motion.p
            {...contentEnter(1)}
            className="max-w-[480px] font-body leading-relaxed text-text-secondary"
            style={{ fontSize: '15px' }}
          >
            Transformando ideias em produtos digitais escaláveis. Focado em
            performance, interfaces premium e arquiteturas que crescem junto com
            o negócio.
          </motion.p>

          {/* CTAs + Sociais */}
          <motion.div
            className="flex items-center gap-6 flex-wrap"
            initial={reduced ? {} : { opacity: 0, y: 10 }}
            animate={
              contentVisible
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{
              duration: reduced ? 0 : 0.7,
              delay:    reduced ? 0 : 0.30,
              ease:     EASE,
            }}
          >
            {/* Botão */}
            <Link
              href="/projetos"
              className="border border-silver px-8 py-3.5 font-mono text-[12px] tracking-[0.1em] text-silver hover:border-chrome hover:text-chrome transition-all duration-300 flex-shrink-0"
            >
              Ver Projetos →
            </Link>

            {/* Separador vertical */}
            <div className="w-px h-5 bg-border flex-shrink-0" />

            {/* Ícones sociais */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-text-secondary hover:text-silver transition-colors duration-300"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    width={18}
                    height={18}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
