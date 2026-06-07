import type { ReactNode } from 'react'
import type { StageAtmosphereName } from '../types'

interface StageAtmosphereProps {
  atmosphere: StageAtmosphereName
  children: ReactNode
}

const atmosphereClasses: Record<StageAtmosphereName, string> = {
  clear: 'border-line/70 bg-paper/45',
  earth: 'border-[#d9cfbe] bg-[#f1eadf]/62',
  structure: 'border-sage/45 bg-[#e9eee9]/58',
  depth: 'border-[#c9c3b6] bg-[#ede9df]/62',
  warm: 'border-blush bg-[#f3e7df]/58',
  honest: 'border-[#cad3cc] bg-[#edf1ed]/64',
  delicate: 'border-[#e2d2cc] bg-[#f6ebe6]/56',
  silent: 'border-[#d2d0c8] bg-[#eae9e4]/66',
  poetic:
    'border-[#d8cec5] bg-[radial-gradient(circle_at_82%_12%,rgba(182,108,82,0.10),transparent_18rem),rgba(255,253,248,0.5)]',
  mature: 'border-[#becbc1] bg-[#e7ede8]/62',
  night:
    'border-[#8f8464]/30 bg-[radial-gradient(circle_at_82%_8%,rgba(143,132,100,0.18),transparent_22rem),linear-gradient(145deg,#111d1d,#172826_58%,#171a25)] text-[#f5f0e5] shadow-[0_30px_80px_rgba(16,25,25,0.22)]',
  summary:
    'border-sage/55 bg-[radial-gradient(circle_at_80%_10%,rgba(184,200,188,0.30),transparent_22rem),rgba(255,253,248,0.72)]',
}

export function StageAtmosphere({
  atmosphere,
  children,
}: StageAtmosphereProps) {
  return (
    <div
      className={`animate-reveal rounded-[2rem] border p-5 shadow-soft sm:p-8 lg:p-10 ${atmosphereClasses[atmosphere]}`}
    >
      {children}
    </div>
  )
}
