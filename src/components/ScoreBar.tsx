interface ScoreBarProps {
  label: string
  score: number
  note?: string
}

export function ScoreBar({ label, score, note }: ScoreBarProps) {
  const tone =
    score >= 82 ? 'bg-moss' : score >= 65 ? 'bg-clay/80' : 'bg-ink/55'

  return (
    <div className="border-b border-line/70 py-4 last:border-0">
      <div className="mb-2 flex items-end justify-between gap-4">
        <div>
          <p className="font-medium text-ink">{label}</p>
          {note && <p className="mt-1 text-xs leading-relaxed text-muted">{note}</p>}
        </div>
        <span className="font-serif text-2xl text-forest">{score}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-forest/8">
        <div
          className={`h-full rounded-full ${tone}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
