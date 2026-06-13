'use client'

import {
  siTypescript,
  siPython,
  siJavascript,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siFastapi,
  siDjango,
  siNodedotjs,
  siPostgresql,
  siRedis,
  siSqlalchemy,
  siDocker,
  siGit,
} from 'simple-icons'
import { motion } from 'framer-motion'
import { TechIcon } from '@/components/ui/TechIcon'
import { cn } from '@/lib/utils'

const categories = [
  {
    label: 'Linguagens',
    techs: [
      { name: 'TypeScript', icon: siTypescript },
      { name: 'Python',     icon: siPython     },
      { name: 'JavaScript', icon: siJavascript },
    ],
  },
  {
    label: 'Frontend',
    techs: [
      { name: 'React',    icon: siReact      },
      { name: 'Next.js',  icon: siNextdotjs  },
      { name: 'Tailwind', icon: siTailwindcss },
    ],
  },
  {
    label: 'Backend',
    techs: [
      { name: 'FastAPI', icon: siFastapi   },
      { name: 'Django',  icon: siDjango    },
      { name: 'Node.js', icon: siNodedotjs },
    ],
  },
  {
    label: 'Banco de dados',
    techs: [
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'Redis',      icon: siRedis      },
      { name: 'SQLAlchemy', icon: siSqlalchemy },
    ],
  },
  {
    label: 'Infraestrutura',
    techs: [
      { name: 'Docker', icon: siDocker },
      { name: 'Git',    icon: siGit    },
    ],
  },
]

export function StackSection() {
  return (
    <section aria-label="Stack técnica" className="border-t border-border">
      <div className="mx-auto max-w-content px-6 py-section-sm lg:px-12">
        <p className={cn(
          'mb-12 font-mono text-caption uppercase',
          'tracking-[0.15em] text-text-secondary',
        )}>
          Stack
        </p>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: catIndex * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className={cn(
                'mb-4 font-mono text-[10px] uppercase',
                'tracking-[0.15em] text-text-muted',
              )}>
                {category.label}
              </p>

              <ul className="flex flex-col gap-3">
                {category.techs.map((tech) => (
                  <li key={tech.name} className="group flex items-center gap-2.5">
                    <span className="text-text-secondary transition-colors duration-300 group-hover:text-silver">
                      <TechIcon path={tech.icon.path} title={tech.name} />
                    </span>
                    <span className={cn(
                      'font-mono text-[12px] tracking-[0.04em]',
                      'text-text-secondary transition-colors duration-300',
                      'group-hover:text-silver',
                    )}>
                      {tech.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
