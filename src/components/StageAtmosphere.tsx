import type { ReactNode } from 'react'
import type { StageAtmosphereName } from '../types'

interface StageAtmosphereProps {
  atmosphere: StageAtmosphereName
  children: ReactNode
}

const atmosphereClasses: Record<StageAtmosphereName, string> = {
  clear:
    'border-[#ddd7ca] bg-[linear-gradient(135deg,#fffdf8_0%,#f3eee3_58%,#e9eee9_100%)]',
  earth:
    'border-[#cbae82] bg-[linear-gradient(135deg,#f2dfbd_0%,#dec39d_54%,#c9aa7e_100%)]',
  structure:
    'border-[#93ad97] bg-[linear-gradient(135deg,#e4eee4_0%,#bfd4c1_55%,#92b09a_100%)]',
  depth:
    'border-[#93917f] bg-[linear-gradient(135deg,#e9e2cf_0%,#c7c2a6_55%,#999b80_100%)]',
  warm:
    'border-[#d48d70] bg-[linear-gradient(135deg,#f7dfd0_0%,#e9b59c_55%,#cf8064_100%)]',
  honest:
    'border-[#73a291] bg-[linear-gradient(135deg,#e4f1e9_0%,#add2c0_55%,#6b9f8e_100%)]',
  delicate:
    'border-[#d49a9d] bg-[linear-gradient(135deg,#f8e5e1_0%,#e9bfc0_55%,#d28e95_100%)]',
  silent:
    'border-[#9da09c] bg-[linear-gradient(135deg,#ececea_0%,#c7cac6_55%,#9da29e_100%)]',
  poetic:
    'border-[#ad829f] bg-[radial-gradient(circle_at_82%_12%,rgba(255,232,218,0.6),transparent_20rem),linear-gradient(135deg,#eee0e8_0%,#d5b4cd_55%,#a87b9d_100%)]',
  mature:
    'border-[#668d70] bg-[linear-gradient(135deg,#dcebdd_0%,#a9c6ae_55%,#62896c_100%)]',
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
      className={`onboarding-panel grain relative h-full overflow-x-hidden overflow-y-auto rounded-[2rem] border p-4 shadow-[0_24px_70px_rgba(38,55,47,0.10)] sm:rounded-[2.4rem] sm:p-7 lg:p-9 ${atmosphereClasses[atmosphere]}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      >
        <span
          className={`absolute -right-24 -top-24 size-72 rounded-full opacity-25 blur-3xl ${accentClasses[atmosphere][0]}`}
        />
        <span
          className={`absolute -bottom-24 -left-20 size-64 rounded-full opacity-20 blur-3xl ${accentClasses[atmosphere][1]}`}
        />
        <span className="absolute right-8 top-8 size-24 rounded-full border border-current opacity-[0.06] sm:size-36" />
      </div>
      <div className="stage-content relative z-10 h-full">{children}</div>
    </div>
  )
}
