import {
  humanDesignAuthorities,
  humanDesignTypes,
  mbtiTypes,
  zodiacSigns,
} from '../data/symbolic'
import type { SymbolicProfile } from '../types'
import { SymbolicFileUpload } from './SymbolicFileUpload'

export type SymbolicView =
  | 'astrology'
  | 'personality'
  | 'documents'
  | 'notes'

interface SymbolicLayerStepProps {
  view: SymbolicView
  profile: SymbolicProfile
  onChange: (profile: SymbolicProfile) => void
  onSkip: () => void
}

const selectClass =
  'min-h-11 w-full rounded-xl border border-white/15 bg-[#152321] px-3.5 text-sm text-[#f5f0e5] outline-none transition focus:border-[#c9b987]/65'
const inputClass =
  'min-h-11 w-full rounded-xl border border-white/15 bg-white/[0.045] px-3.5 text-sm text-[#f5f0e5] outline-none transition placeholder:text-white/28 focus:border-[#c9b987]/65'

export function SymbolicLayerStep({
  view,
  profile,
  onChange,
  onSkip,
}: SymbolicLayerStepProps) {
  const update = <Key extends keyof SymbolicProfile>(
    key: Key,
    value: SymbolicProfile[Key],
  ) => onChange({ ...profile, wantsSymbolicLayer: true, [key]: value })

  const skipButton = (
    <div className="mb-3 flex justify-end sm:absolute sm:right-0 sm:top-0 sm:mb-0">
      <button
        type="button"
        onClick={onSkip}
        className="rounded-full border border-[#c9b987]/25 bg-[#101c1b]/55 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-[#d8c78f] backdrop-blur-md transition hover:border-[#c9b987]/55 hover:text-white"
      >
        Omitir dimensión simbólica
      </button>
    </div>
  )

  if (view === 'astrology') {
    return (
      <div className="relative flex h-full flex-col justify-center">
        {skipButton}
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c9b987]">
          Astrología · Una referencia opcional
        </p>
        <h1 className="mt-2 max-w-3xl font-serif text-3xl text-[#f5f0e5] sm:mt-3 sm:text-5xl">
          Empieza por aquello que ya conozcas.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#f5f0e5]/60">
          Puedes completar solo el signo solar, añadir luna y ascendente o no
          responder nada. Esta capa nunca decidirá tu afinidad principal.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {[
            ['sunSign', 'Signo solar'],
            ['moonSign', 'Signo lunar'],
            ['risingSign', 'Ascendente'],
          ].map(([key, label]) => (
            <label
              key={key}
              className="rounded-2xl border border-white/12 bg-white/[0.045] p-4"
            >
              <span className="mb-2 block text-xs text-[#f5f0e5]/60">
                {label}
              </span>
              <select
                value={
                  (profile[key as keyof SymbolicProfile] as
                    | string
                    | undefined) ?? ''
                }
                onChange={(event) =>
                  update(
                    key as 'sunSign' | 'moonSign' | 'risingSign',
                    event.target.value || undefined,
                  )
                }
                className={selectClass}
              >
                <option value="">Sin completar</option>
                {zodiacSigns.map((sign) => (
                  <option key={sign}>{sign}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </div>
    )
  }

  if (view === 'personality') {
    return (
      <div className="relative flex h-full flex-col justify-center">
        {skipButton}
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c9b987]">
          Dimensión simbólica · Mapas personales
        </p>
        <h1 className="mt-3 font-serif text-3xl text-[#f5f0e5] sm:text-5xl">
          Referencias para narrarte, no para encerrarte.
        </h1>
        <div className="mt-2 grid gap-2.5 sm:mt-6 sm:gap-4 lg:grid-cols-[0.7fr_1.3fr]">
          <section className="rounded-2xl border border-white/12 bg-white/[0.045] p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c9b987]">
              MBTI
            </p>
            <p className="mt-2 text-xs leading-5 text-[#f5f0e5]/52">
              Una referencia de autoconocimiento, no una verdad absoluta.
            </p>
            <select
              value={profile.mbtiType ?? ''}
              onChange={(event) =>
                update('mbtiType', event.target.value || undefined)
              }
              className={`${selectClass} mt-4`}
            >
              <option value="">Sin completar</option>
              {mbtiTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </section>

          <section className="rounded-2xl border border-white/12 bg-white/[0.045] p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c9b987]">
              Human Design
            </p>
            <p className="mt-2 text-xs leading-5 text-[#f5f0e5]/52">
              Lenguaje simbólico, nunca diagnóstico.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <select
                aria-label="Tipo de Human Design"
                value={profile.humanDesignType ?? ''}
                onChange={(event) =>
                  update('humanDesignType', event.target.value || undefined)
                }
                className={selectClass}
              >
                <option value="">Tipo</option>
                {humanDesignTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
              <select
                aria-label="Autoridad de Human Design"
                value={profile.humanDesignAuthority ?? ''}
                onChange={(event) =>
                  update(
                    'humanDesignAuthority',
                    event.target.value || undefined,
                  )
                }
                className={selectClass}
              >
                <option value="">Autoridad</option>
                {humanDesignAuthorities.map((authority) => (
                  <option key={authority}>{authority}</option>
                ))}
              </select>
              <input
                aria-label="Perfil de Human Design"
                value={profile.humanDesignProfile ?? ''}
                onChange={(event) =>
                  update('humanDesignProfile', event.target.value)
                }
                placeholder="Perfil, ej. 4/6"
                className={inputClass}
              />
            </div>
          </section>
        </div>
      </div>
    )
  }

  if (view === 'documents') {
    return (
      <div className="relative flex h-full flex-col justify-center">
        {skipButton}
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c9b987]">
          Dimensión simbólica · Documentos
        </p>
        <h1 className="mt-2 font-serif text-2xl text-[#f5f0e5] sm:mt-3 sm:text-5xl">
          Un archivo puede ser otra forma de contar tu mapa.
        </h1>
        <p className="mt-2 max-w-3xl text-[0.7rem] leading-5 text-[#f5f0e5]/55 sm:mt-3 sm:text-sm">
          Puedes subir una carta astral, un documento de Human Design o
          cualquier archivo que ayude a describir esta dimensión. No se envía
          a ningún servidor.
        </p>
        <div className="mt-4">
          <SymbolicFileUpload
            files={profile.uploadedFiles ?? []}
            onChange={(files) => update('uploadedFiles', files)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-full flex-col justify-center">
      {skipButton}
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c9b987]">
        Dimensión simbólica · Notas y privacidad
      </p>
      <h1 className="mt-2 font-serif text-2xl text-[#f5f0e5] sm:mt-3 sm:text-5xl">
        Cierra esta dimensión con tus propias palabras.
      </h1>
      <div className="mt-4">
        <label className="block rounded-2xl border border-white/12 bg-white/[0.045] p-4">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c9b987]">
            Notas simbólicas
          </span>
          <textarea
            value={profile.symbolicNotes ?? ''}
            onChange={(event) => update('symbolicNotes', event.target.value)}
            rows={3}
            placeholder="Símbolos, arquetipos o lenguajes personales importantes para ti..."
            className="mt-3 w-full resize-none rounded-xl border border-white/15 bg-white/[0.045] px-3.5 py-3 text-xs leading-5 text-[#f5f0e5] outline-none placeholder:text-white/28 focus:border-[#c9b987]/65"
          />
        </label>
      </div>
      <p className="mt-3 max-w-4xl rounded-xl border border-[#c9b987]/15 bg-[#c9b987]/5 p-3 text-[0.62rem] leading-4 text-[#f5f0e5]/48 sm:mt-4 sm:text-[0.68rem] sm:leading-5">
        Más adelante, si esta función se activa de verdad, estos documentos
        requerirán consentimiento explícito y protección especial. Por ahora
        solo es una simulación local del prototipo.
      </p>
    </div>
  )
}
