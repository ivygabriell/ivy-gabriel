'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { getFeaturedProjects } from '@/data/projects'
import { EASE, fadeUp, VIEWPORT } from '@/lib/animations'

const projects = getFeaturedProjects()

export function WorkPreview() {
  return (
    <section className="py-section-sm md:py-section">
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 font-mono text-caption uppercase tracking-[0.15em] text-text-secondary"
        >
          Projetos selecionados
        </motion.p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project, i) => {
            const award = project.awards?.[0]

            return (
              <motion.div
                key={project.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className={i === 0 ? 'md:col-span-2' : ''}
              >
                <Link
                  href={`/projetos/${project.id}`}
                  className="group flex h-full flex-col justify-between border border-border p-6 transition-colors duration-300 ease-smooth hover:border-border-strong md:p-8"
                >
                  <div className="flex items-center justify-between font-mono text-caption uppercase tracking-[0.15em] text-text-secondary">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span>{project.type}</span>
                  </div>

                  <div className="mt-12">
                    <h2 className="font-display text-[24px] font-bold text-text-primary">
                      {project.title}
                    </h2>

                    {award && (
                      <p className="mt-2 font-mono text-caption tracking-[0.1em] text-silver">
                        🥇 {award.name} · {award.position}
                      </p>
                    )}

                    <p className="mt-3 text-body-sm text-text-secondary">
                      {project.tagline}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-10"
        >
          <Link
            href="/projetos"
            className="group inline-flex items-center gap-2 font-mono text-caption uppercase tracking-[0.15em] text-text-secondary transition-colors duration-300 hover:text-silver"
          >
            Ver todos os projetos
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
