import type { ReactNode } from 'react'
import type { StageAtmosphereName } from '../types'

interface StageAtmosphereProps {
  atmosphere: StageAtmosphereName
  children: ReactNode
}

const atmosphereClasses: Record<StageAtmosphereName, string> = {
  clear:
    'border-[#e4ded2] bg-[linear-gradient(145deg,rgba(255,253,248,0.96),rgba(244,239,229,0.82))]',
  earth:
    'border-[#d8c7ae] bg-[linear-gradient(145deg,rgba(244,235,220,0.96),rgba(229,218,198,0.78))]',
  structure:
    'border-[#bfcdbf] bg-[linear-gradient(145deg,rgba(239,244,237,0.96),rgba(215,226,216,0.82))]',
  depth:
    'border-[#c9c3b6] bg-[linear-gradient(145deg,rgba(239,235,224,0.97),rgba(216,214,197,0.82))]',
  warm:
    'border-[#dfc6b8] bg-[linear-gradient(145deg,rgba(248,235,226,0.97),rgba(237,211,197,0.82))]',
  honest:
    'border-[#bdcec5] bg-[linear-gradient(145deg,rgba(237,244,239,0.97),rgba(209,225,215,0.82))]',
  delicate:
    'border-[#e1c7c3] bg-[linear-gradient(145deg,rgba(250,239,235,0.97),rgba(239,217,212,0.82))]',
  silent:
    'border-[#cbc9c0] bg-[linear-gradient(145deg,rgba(239,238,232,0.97),rgba(216,215,207,0.84))]',
  poetic:
    'border-[#d7c5c0] bg-[radial-gradient(circle_at_82%_12%,rgba(182,108,82,0.16),transparent_20rem),linear-gradient(145deg,rgba(248,241,237,0.97),rgba(227,218,222,0.82))]',
  mature:
    'border-[#aec1b3] bg-[linear-gradient(145deg,rgba(231,240,233,0.97),rgba(197,216,203,0.84))]',
  night:
    'border-[#8f8464]/30 bg-[radial-gradient(circle_at_82%_8%,rgba(143,132,100,0.18),transparent_22rem),linear-gradient(145deg,#111d1d,#172826_58%,#171a25)] text-[#f5f0e5] shadow-[0_30px_80px_rgba(16,25,25,0.22)]',
  summary:
    'border-sage/55 bg-[radial-gradient(circle_at_80%_10%,rgba(184,200,188,0.42),transparent_22rem),linear-gradient(145deg,rgba(255,253,248,0.98),rgba(229,237,230,0.86))]',
}

const accentClasses: Record<StageAtmosphereName, [string, string]> = {
  clear: ['bg-[#dce7df]', 'bg-[#ead9ce]'],
  earth: ['bg-[#c7a97e]', 'bg-[#e7d8bd]'],
  structure: ['bg-[#9db09f]', 'bg-[#d8e1d7]'],
  depth: ['bg-[#8d927a]', 'bg-[#d8c9ae]'],
  warm: ['bg-[#c98469]', 'bg-[#efd0bf]'],
  honest: ['bg-[#7e9c8b]', 'bg-[#cee0d4]'],
  delicate: ['bg-[#cc928b]', 'bg-[#eed5d0]'],
  silent: ['bg-[#979991]', 'bg-[#deddd5]'],
  poetic: ['bg-[#b88980]', 'bg-[#d9c9d3]'],
  mature: ['bg-[#708c78]', 'bg-[#c4d5c8]'],
  night: ['bg-[#a89a6c]', 'bg-[#334c49]'],
  summary: ['bg-[#8ea595]', 'bg-[#dce6dc]'],
}

export function StageAtmosphere({
  atmosphere,
  children,
}: StageAtmosphereProps) {
  return (
    <div
      className={`grain relative min-h-[68vh] overflow-hidden rounded-[2.4rem] border p-5 shadow-[0_28px_90px_rgba(38,55,47,0.10)] sm:p-9 lg:p-14 ${atmosphereClasses[atmosphere]}`}
    >
      <span
        aria-hidden="true"
        className={`absolute -right-24 -top-24 size-72 rounded-full opacity-25 blur-3xl ${accentClasses[atmosphere][0]}`}
      />
      <span
        aria-hidden="true"
        className={`absolute -bottom-24 -left-20 size-64 rounded-full opacity-20 blur-3xl ${accentClasses[atmosphere][1]}`}
      />
      <span
        aria-hidden="true"
        className="absolute right-8 top-8 size-24 rounded-full border border-current opacity-[0.06] sm:size-36"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
