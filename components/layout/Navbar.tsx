'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/projetos', label: 'Projetos' },
  { href: '/sobre',    label: 'Sobre'    },
  { href: '/contato',  label: 'Contato'  },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-500 ease-smooth',
        scrolled
          ? 'bg-void/90 backdrop-blur-sm border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-content mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className={cn(
            'font-display font-black text-sm tracking-[0.08em]',
            'text-text-primary hover:text-chrome',
            'transition-colors duration-300'
          )}
        >
          IVY GABRIEL
        </Link>

        {/* Links — desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-body text-[12px] tracking-[0.06em]',
                'transition-colors duration-300',
                pathname.startsWith(link.href)
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-silver'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Badge Disponível */}
        <div className="hidden md:flex items-center">
          <span
            className={cn(
              'flex items-center gap-2',
              'border border-border px-4 py-2',
              'font-mono text-[11px] tracking-[0.1em] text-silver',
              'hover:border-border-strong hover:text-chrome',
              'transition-all duration-300'
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-silver animate-pulse" />
            Disponível
          </span>
        </div>

        {/* Botão mobile */}
        <button
          className={cn(
            'md:hidden font-mono text-[11px] tracking-[0.1em]',
            'text-text-secondary hover:text-text-primary',
            'transition-colors duration-300'
          )}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕ fechar' : '☰ menu'}
        </button>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-border px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-body text-[14px] tracking-[0.04em]',
                'transition-colors duration-300',
                pathname.startsWith(link.href)
                  ? 'text-text-primary'
                  : 'text-text-secondary'
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-silver animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.1em] text-silver">
              Disponível
            </span>
          </div>
        </div>
      )}
    </header>
  )
}
