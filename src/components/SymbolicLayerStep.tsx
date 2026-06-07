import {
  humanDesignAuthorities,
  humanDesignTypes,
  mbtiTypes,
  zodiacSigns,
} from '../data/symbolic'
import type { SymbolicProfile } from '../types'
import { Button } from './Button'
import { OnboardingStageIntro } from './OnboardingStageIntro'
import { SymbolicFileUpload } from './SymbolicFileUpload'

export type SymbolicView =
  | 'intro'
  | 'astrology'
  | 'personality'
  | 'documents'
  | 'notes'

interface SymbolicLayerStepProps {
  view: SymbolicView
  profile: SymbolicProfile
  onChange: (profile: SymbolicProfile) => void
  onStart: () => void
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
  onStart,
  onSkip,
}: SymbolicLayerStepProps) {
  const update = <Key extends keyof SymbolicProfile>(
    key: Key,
    value: SymbolicProfile[Key],
  ) => onChange({ ...profile, wantsSymbolicLayer: true, [key]: value })

  if (view === 'intro') {
    return (
      <div className="flex h-full flex-col justify-center">
        <OnboardingStageIntro
          room="Dimensión 11 de 12 · Opcional"
          title="Dimensión simbólica"
          subtitle="Una capa narrativa, nunca un veredicto."
          description="Algunas personas también se comprenden a través de símbolos, arquetipos o mapas personales. Si este lenguaje forma parte de ti, puedes añadirlo aquí. Si no, puedes saltarlo sin que afecte al núcleo de tu mapa relacional."
          dark
        />

        <div className="max-w-3xl rounded-2xl border border-[#c9b987]/20 bg-white/[0.045] p-5 sm:p-6">
          <p className="text-sm leading-6 text-[#f5f0e5]/68">
            Esta dimensión es opcional. Tu compatibilidad principal se
            construirá desde tus respuestas prácticas, emocionales y
            relacionales.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button
              className="!bg-[#c9b987] !text-[#14211f] hover:!bg-[#dbcda6]"
              onClick={onStart}
            >
              Entrar en esta dimensión
            </Button>
            <Button
              variant="ghost"
              className="!text-[#eee6d3] hover:!bg-white/8"
              onClick={onSkip}
            >
              Omitir dimensión simbólica
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'astrology') {
    return (
      <div className="flex h-full flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c9b987]">
          Dimensión simbólica · Astrología
        </p>
        <h1 className="mt-2 font-serif text-2xl text-[#f5f0e5] sm:mt-3 sm:text-5xl">
          Tres referencias, solo si hablan tu lenguaje.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#f5f0e5]/60">
          Puedes añadir solo tu signo solar o completar también luna y
          ascendente si los conoces.
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
      <div className="flex h-full flex-col justify-center">
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
      <div className="flex h-full flex-col justify-center">
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
    <div className="flex h-full flex-col justify-center">
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
