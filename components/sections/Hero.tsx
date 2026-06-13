'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { siGithub, siInstagram, siWhatsapp } from 'simple-icons'
import { VoronoiBackground } from '@/components/ui/VoronoiBackground'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

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
  const reduceMotion = useReducedMotion()

  // Entrada em sequência (stagger) — anima apenas na montagem
  const enter = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.7,
      delay: reduceMotion ? 0 : delay,
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
          {/* Label */}
          <motion.p
            {...enter(0.1)}
            className="font-mono text-caption uppercase tracking-[0.2em]"
            style={{ color: '#F0F0FF' }}
          >
            Olá, me chamo
          </motion.p>

          {/* Nome */}
          <motion.h1
            {...enter(0.2)}
            className="font-display font-black leading-[0.95] tracking-[-0.03em] text-text-primary"
            style={{ fontSize: 'clamp(56px, 8vw, 96px)' }}
          >
            Ivy Gabriel
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            {...enter(0.32)}
            className="font-display font-semibold text-silver"
            style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', letterSpacing: '-0.01em' }}
          >
            Full Stack Developer & Mobile
          </motion.p>

          {/* Parágrafo */}
          <motion.p
            {...enter(0.44)}
            className="max-w-[480px] font-body leading-relaxed text-text-secondary"
            style={{ fontSize: '15px' }}
          >
            Transformando ideias em produtos digitais escaláveis. Focado em
            performance, interfaces premium e arquiteturas que crescem junto com
            o negócio.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...enter(0.56)}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/projetos"
              className="border border-silver px-8 py-3.5 font-mono text-[12px] tracking-[0.1em] text-silver transition-all duration-300 hover:border-chrome hover:text-chrome"
            >
              Ver Projetos →
            </Link>

          </motion.div>

          {/* Sociais */}
          <motion.div
            {...enter(0.68)}
            className="flex items-center gap-5"
          >
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-text-secondary transition-colors duration-300 hover:text-silver"
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
          </motion.div>
        </div>
      </div>

    </section>
  )
}
