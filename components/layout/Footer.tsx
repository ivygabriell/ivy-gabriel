import Link from 'next/link'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/ivygabriell',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ivygabriel/',
    external: true,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ivygabriell_/',
    external: true,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5562995024778',
    external: true,
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border mt-auto">
      <div
        className={[
          'max-w-content mx-auto px-6 lg:px-12 py-8',
          'flex flex-col sm:flex-row items-center',
          'justify-between gap-4',
        ].join(' ')}
      >
        {/* Copyright */}
        <p className="font-mono text-[10px] tracking-[0.15em] text-text-secondary uppercase">
          © {year} Ivy Gabriel
        </p>

        {/* Links sociais */}
        <div className="flex items-center gap-6 flex-wrap justify-center">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'font-mono text-[10px] tracking-[0.1em] uppercase',
                'text-text-secondary hover:text-silver',
                'transition-colors duration-300',
              ].join(' ')}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
