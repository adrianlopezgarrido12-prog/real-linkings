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
            ? 'border-[#b8d5ff]/22 bg-[#172f4d]/76 text-[#f7fbff]'
            : 'border-white/80 bg-white/68 text-forest shadow-[0_24px_70px_rgba(66,111,154,0.1)]'
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
            dark ? 'text-[#b8d5ff]' : 'text-moss'
          }`}
        >
          {label} · Una pausa
        </p>
        <h2 className="mt-5 max-w-3xl text-balance font-serif text-3xl leading-tight sm:text-5xl">
          {title}
        </h2>
        <p
          className={`mt-5 max-w-2xl text-sm leading-7 ${
            dark ? 'text-[#f7fbff]/62' : 'text-muted'
          }`}
        >
          {text}
        </p>
        <div
          className={`mt-7 max-w-2xl border-l pl-5 font-serif text-lg italic leading-7 sm:text-xl ${
            dark
              ? 'border-[#b8d5ff]/40 text-[#c7dcff]'
              : 'border-clay/40 text-clay'
          }`}
        >
          {prompt}
        </div>
      </article>
    </div>
  )
}
