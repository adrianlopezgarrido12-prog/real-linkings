interface ReflectionQuoteProps {
  text: string
  context?: string
  className?: string
}

export function ReflectionQuote({
  text,
  context,
  className = '',
}: ReflectionQuoteProps) {
  return (
    <aside
      className={`relative overflow-hidden rounded-[1.5rem] border border-line/75 bg-paper/70 px-6 py-7 shadow-[0_16px_45px_rgba(38,55,47,0.05)] sm:px-8 sm:py-8 ${className}`}
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sage/20 via-moss/65 to-clay/30" />
      <p className="max-w-3xl font-serif text-xl italic leading-8 text-forest sm:text-2xl sm:leading-9">
        “{text}”
      </p>
      {context && (
        <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
          {context}
        </p>
      )}
    </aside>
  )
}
