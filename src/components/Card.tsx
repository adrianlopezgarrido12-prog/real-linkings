import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  tone?: 'paper' | 'sage' | 'forest' | 'transparent'
}

const tones = {
  paper: 'border-line/80 bg-paper/90 text-ink',
  sage: 'border-sage/60 bg-[#e8f3fc] text-forest',
  forest: 'border-forest bg-forest text-paper',
  transparent: 'border-line/70 bg-white/30 text-ink',
}

export function Card({
  children,
  tone = 'paper',
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-[1.6rem] border p-6 shadow-soft backdrop-blur-sm ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
