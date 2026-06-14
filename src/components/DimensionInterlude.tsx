import type { StageAtmosphereName } from '../types'

interface DimensionInterludeProps {
  dimension: number
  label: string
  title: string
  text: string
  prompt: string
  atmosphere: StageAtmosphereName
}

export function DimensionInterlude({
  dimension,
  label,
  title,
  text,
  prompt,
  atmosphere,
}: DimensionInterludeProps) {
  const dark = atmosphere === 'night'

  return (
    <div className="flex h-full items-center justify-center">
      <article
        className={`relative w-full max-w-4xl overflow-hidden rounded-[2rem] border p-6 backdrop-blur-md sm:p-10 lg:p-12 ${
          dark
            ? 'border-white/15 bg-[#182b1e]/80 text-[#f2ede2]'
            : 'border-white/80 bg-white/68 text-forest shadow-[0_24px_70px_rgba(42,74,58,0.1)]'
        }`}
      >
        <span
          className={`absolute -right-12 -top-16 font-serif text-[9rem] leading-none opacity-[0.055] ${
            dark ? 'text-[#b8d5ff]' : 'text-forest'
          }`}
        >
          {String(dimension).padStart(2, '0')}
        </span>
        <p
          className={`text-xs font-semibold uppercase tracking-[0.16em] ${
            dark ? 'text-[#8ab098]' : 'text-moss'
          }`}
        >
          {label} · Una pausa
        </p>
        <h2 className="mt-5 max-w-3xl text-balance font-serif text-3xl leading-tight sm:text-5xl">
          {title}
        </h2>
        <p
          className={`mt-5 max-w-2xl text-sm leading-7 ${
            dark ? 'text-[#f2ede2]/62' : 'text-muted'
          }`}
        >
          {text}
        </p>
        <div
          className={`mt-7 max-w-2xl border-l pl-5 font-serif text-lg italic leading-7 sm:text-xl ${
            dark
              ? 'border-[#8ab098]/50 text-[#b8d8c0]'
              : 'border-clay/40 text-clay'
          }`}
        >
          {prompt}
        </div>
      </article>
    </div>
  )
}
