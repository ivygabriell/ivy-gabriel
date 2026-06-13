'use client'

import { cn } from '@/lib/utils'

interface TechIconProps {
  path: string
  title: string
  className?: string
}

export function TechIcon({ path, title, className }: TechIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="currentColor"
      aria-label={title}
      className={cn('flex-shrink-0', className)}
    >
      <path d={path} />
    </svg>
  )
}
