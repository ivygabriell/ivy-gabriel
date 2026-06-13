'use client'

import { motion, type Variants } from 'framer-motion'
import { EASE, VIEWPORT } from '@/lib/animations'

const LINE_1 = 'Tecnologia não é o diferencial. Nunca foi.'
const LINE_2 = 'O diferencial é quem está com ela —'
const LINE_3 = 'e até onde vai para dominá-la.'

const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: { opacity: 1, filter: 'blur(0px)' },
}

export function PontoDeVista() {
  return (
    <section className="py-section-sm md:py-section">
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <div className="max-w-text">
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-h1 font-display font-bold text-text-secondary"
          >
            {LINE_1}
          </motion.p>

          <motion.div
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          >
            <p className="chrome-text text-h1 font-display font-bold">{LINE_2}</p>
            <p className="chrome-text text-h1 font-display font-bold">{LINE_3}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
