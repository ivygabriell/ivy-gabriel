'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE, fadeUp, VIEWPORT } from '@/lib/animations'

export function ContactCTA() {
  return (
    <section className="border-t border-border py-section-sm md:py-section">
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className="text-h2 font-display font-bold text-text-primary">
            Vamos construir algo juntos?
          </h2>

          <p className="mt-4 max-w-text text-body-lg text-text-secondary">
            Recrutador, cliente ou parceiro —
            <br />
            se você quer resultado, estamos alinhados.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contato"
              className="border border-silver px-8 py-4 text-center font-mono text-[12px] tracking-[0.1em] text-silver transition-colors duration-300 ease-smooth hover:border-chrome hover:text-chrome"
            >
              Entrar em contato
            </Link>
            <Link
              href="/projetos"
              className="border border-border px-8 py-4 text-center font-mono text-[12px] tracking-[0.1em] text-text-secondary transition-colors duration-300 ease-smooth hover:border-border-strong hover:text-silver"
            >
              Ver projetos
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
