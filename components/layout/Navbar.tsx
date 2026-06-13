'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/',         label: 'Início'   },
  { href: '/projetos', label: 'Projetos' },
  { href: '/sobre',    label: 'Sobre'    },
  { href: '/contato',  label: 'Contato'  },
]

export function Navbar() {
  const pathname                = usePathname()
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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">

      {/* Container flutuante */}
      <div
        className={cn(
          'flex items-center gap-2',
          'rounded-full border border-border',
          'px-2 py-2',
          'transition-all duration-500 ease-smooth',
          scrolled
            ? 'bg-void/90 backdrop-blur-md border-border'
            : 'bg-void/70 backdrop-blur-sm border-border'
        )}
      >
        {/* Iniciais IG */}
        <Link
          href="/"
          className={cn(
            'flex items-center justify-center',
            'w-9 h-9 rounded-full',
            'bg-elevated border border-border',
            'font-display font-black text-[13px]',
            'tracking-[0.05em] text-text-primary',
            'hover:text-chrome hover:border-border-strong',
            'transition-all duration-300',
            'flex-shrink-0'
          )}
        >
          IG
        </Link>

        {/* Separador */}
        <div className="w-px h-5 bg-border mx-1 flex-shrink-0" />

        {/* Links — desktop */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-1.5 rounded-full',
                'font-body text-[12px] tracking-[0.04em]',
                'transition-all duration-300',
                isActive(link.href)
                  ? 'bg-elevated border border-border text-text-primary'
                  : 'text-text-secondary hover:text-silver'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Separador */}
        <div className="hidden md:block w-px h-5 bg-border mx-1 flex-shrink-0" />

        {/* Botão de idioma */}
        <button
          className={cn(
            'hidden md:flex items-center justify-center',
            'w-9 h-9 rounded-full',
            'border border-border',
            'font-mono text-[10px] tracking-[0.08em]',
            'text-text-secondary',
            'hover:text-silver hover:border-border-strong',
            'transition-all duration-300',
            'flex-shrink-0'
          )}
          aria-label="Mudar idioma"
          title="Em breve: EN / PT"
        >
          PT
        </button>

        {/* Botão mobile */}
        <button
          className={cn(
            'md:hidden flex items-center justify-center',
            'w-9 h-9 rounded-full border border-border',
            'font-mono text-[10px] text-text-secondary',
            'hover:text-silver transition-colors duration-300'
          )}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menu mobile — dropdown abaixo do container */}
      {menuOpen && (
        <div
          className={cn(
            'absolute top-[72px] left-4 right-4',
            'bg-void/95 backdrop-blur-md',
            'border border-border rounded-2xl',
            'px-4 py-4 flex flex-col gap-2',
            'md:hidden'
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2.5 rounded-xl',
                'font-body text-[14px]',
                'transition-all duration-300',
                isActive(link.href)
                  ? 'bg-elevated text-text-primary'
                  : 'text-text-secondary'
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-border mt-2 pt-3 flex items-center justify-between px-4">
            <span className="font-mono text-[10px] text-text-secondary tracking-[0.08em]">
              Disponível
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-silver animate-pulse" />
          </div>
        </div>
      )}
    </header>
  )
}
