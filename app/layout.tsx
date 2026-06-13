import type { Metadata } from 'next'
import { Syne, Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Ivy Gabriel',
    default: 'Ivy Gabriel — Full Stack Developer',
  },
  description:
    'Não é a tecnologia que muda o seu negócio. É quem está no comando dela.',
  keywords: [
    'full stack developer',
    'desenvolvimento web',
    'React',
    'Next.js',
    'Anápolis',
    'Goiás',
  ],
  authors: [{ name: 'Ivy Gabriel' }],
  creator: 'Ivy Gabriel',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Ivy Gabriel',
    title: 'Ivy Gabriel — Full Stack Developer',
    description:
      'Não é a tecnologia que muda o seu negócio. É quem está no comando dela.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ivy Gabriel — Full Stack Developer',
    description:
      'Não é a tecnologia que muda o seu negócio. É quem está no comando dela.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`
        ${syne.variable}
        ${inter.variable}
        ${jetbrainsMono.variable}
      `}
    >
      <body className="bg-void text-text-primary font-body antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
