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
            ? 'border-[#c9b987]/22 bg-[#101d1c]/76 text-[#f5f0e5]'
            : 'border-white/75 bg-white/60 text-forest shadow-[0_24px_70px_rgba(38,55,47,0.08)]'
        }`}
      >
        <span
          className={`absolute -right-12 -top-16 font-serif text-[9rem] leading-none opacity-[0.055] ${
            dark ? 'text-[#c9b987]' : 'text-forest'
          }`}
        >
          {String(dimension).padStart(2, '0')}
        </span>
        <p
          className={`text-xs font-semibold uppercase tracking-[0.16em] ${
            dark ? 'text-[#c9b987]' : 'text-moss'
          }`}
        >
          {label} · Una pausa
        </p>
        <h2 className="mt-5 max-w-3xl text-balance font-serif text-3xl leading-tight sm:text-5xl">
          {title}
        </h2>
        <p
          className={`mt-5 max-w-2xl text-sm leading-7 ${
            dark ? 'text-[#f5f0e5]/62' : 'text-muted'
          }`}
        >
          {text}
        </p>
        <div
          className={`mt-7 max-w-2xl border-l pl-5 font-serif text-lg italic leading-7 sm:text-xl ${
            dark
              ? 'border-[#c9b987]/40 text-[#d8c78f]'
              : 'border-clay/40 text-clay'
          }`}
        >
          {prompt}
        </div>
      </article>
    </div>
  )
}
