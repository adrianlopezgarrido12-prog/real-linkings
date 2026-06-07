interface ProgressBarProps {
  value: number
  label?: string
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div>
      {label && (
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted">
          <span>{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <div className="h-1.5 overflow-hidden rounded-full bg-forest/10">
        <div
          className="h-full rounded-full bg-forest transition-[width] duration-500"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  )
}
