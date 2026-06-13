'use client'

import { motion } from 'framer-motion'
import { EASE, fadeUp, VIEWPORT } from '@/lib/animations'

const recognitions = [
  {
    title: '🥇 Startup Weekend Anápolis · GO · 2026',
    project: 'AutoCare — Ramo automotivo',
    position: '1º lugar',
  },
]

export function Reconhecimentos() {
  return (
    <section className="py-section-sm md:py-section">
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <motion.ul
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="divide-y divide-border border-y border-border"
        >
          {recognitions.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-2 py-6 font-mono text-caption tracking-[0.15em] md:flex-row md:items-center md:justify-between md:gap-4"
            >
              <span className="text-text-secondary">{item.title}</span>
              <span className="text-text-secondary">{item.project}</span>
              <span className="text-silver">{item.position}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
