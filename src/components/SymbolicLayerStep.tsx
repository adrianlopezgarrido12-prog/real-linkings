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

interface SymbolicLayerStepProps {
  profile: SymbolicProfile
  onChange: (profile: SymbolicProfile) => void
  onSkip: () => void
}

const selectClass =
  'min-h-12 w-full rounded-xl border border-white/15 bg-[#152321] px-4 text-sm text-[#f5f0e5] outline-none transition focus:border-[#c9b987]/65'
const inputClass =
  'min-h-12 w-full rounded-xl border border-white/15 bg-white/[0.045] px-4 text-sm text-[#f5f0e5] outline-none transition placeholder:text-white/28 focus:border-[#c9b987]/65'

export function SymbolicLayerStep({
  profile,
  onChange,
  onSkip,
}: SymbolicLayerStepProps) {
  const update = <Key extends keyof SymbolicProfile>(
    key: Key,
    value: SymbolicProfile[Key],
  ) => onChange({ ...profile, wantsSymbolicLayer: true, [key]: value })

  if (!profile.wantsSymbolicLayer) {
    return (
      <div>
        <OnboardingStageIntro
          room="Undécima sala · Una habitación nocturna opcional"
          title="Mapa simbólico"
          subtitle="Hay lenguajes que no explican quién eres, pero pueden ayudarte a narrarte."
          description="Más allá de los datos y las respuestas racionales, algunas personas se reconocen también en símbolos, arquetipos y mapas personales. Si este lenguaje forma parte de tu forma de comprenderte, puedes añadirlo aquí. Si no, puedes saltarlo sin que afecte al núcleo de tu mapa relacional."
          dark
        />

        <div className="rounded-2xl border border-[#c9b987]/20 bg-white/[0.045] p-6 sm:p-8">
          <p className="text-sm leading-7 text-[#f5f0e5]/68">
            Esta sección es opcional. Algunas personas encuentran útil
            comprenderse a través de símbolos, arquetipos o lenguajes
            espirituales. Otras no. Tu afinidad principal no dependerá de esta
            parte.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              className="!bg-[#c9b987] !text-[#14211f] hover:!bg-[#dbcda6]"
              onClick={() =>
                onChange({ ...profile, wantsSymbolicLayer: true })
              }
            >
              Abrir la dimensión simbólica
            </Button>
            <Button
              variant="ghost"
              className="!text-[#eee6d3] hover:!bg-white/8"
              onClick={onSkip}
            >
              Omitir esta parte
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <OnboardingStageIntro
        room="Undécima sala · Una habitación nocturna opcional"
        title="Mapa simbólico"
        subtitle="Una capa narrativa, nunca un veredicto."
        description="Puedes completar solo aquello que conozcas o te resulte significativo. Esta información no se considera ciencia, diagnóstico ni criterio decisivo de afinidad."
        dark
      />

      <button
        type="button"
        onClick={onSkip}
        className="mb-8 text-xs font-semibold uppercase tracking-[0.13em] text-[#c9b987] transition hover:text-white"
      >
        Omitir esta parte
      </button>

      <div className="space-y-6">
        <section className="rounded-2xl border border-white/12 bg-white/[0.045] p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c9b987]">
            Astrología
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#f5f0e5]/58">
            Puedes añadir solo tu signo solar o completar también luna y
            ascendente si los conoces.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              ['sunSign', 'Signo solar'],
              ['moonSign', 'Signo lunar'],
              ['risingSign', 'Ascendente'],
            ].map(([key, label]) => (
              <label key={key} className="block">
                <span className="mb-2 block text-xs text-[#f5f0e5]/60">
                  {label}
                </span>
                <select
                  value={profile[key as keyof SymbolicProfile] as string | undefined ?? ''}
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
        </section>

        <section className="rounded-2xl border border-white/12 bg-white/[0.045] p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c9b987]">
            Myers-Briggs · MBTI
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#f5f0e5]/58">
            Si conoces tu tipo, puedes añadirlo como una referencia más de
            autoconocimiento. No se usará como verdad absoluta.
          </p>
          <label className="mt-5 block max-w-sm">
            <span className="mb-2 block text-xs text-[#f5f0e5]/60">
              Tipo MBTI
            </span>
            <select
              value={profile.mbtiType ?? ''}
              onChange={(event) =>
                update('mbtiType', event.target.value || undefined)
              }
              className={selectClass}
            >
              <option value="">Sin completar</option>
              {mbtiTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
        </section>

        <section className="rounded-2xl border border-white/12 bg-white/[0.045] p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c9b987]">
            Human Design
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#f5f0e5]/58">
            Si trabajas con Human Design, puedes añadir tipo, autoridad y
            perfil. Se tratará como lenguaje simbólico, no como diagnóstico.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-xs text-[#f5f0e5]/60">
                Tipo
              </span>
              <select
                value={profile.humanDesignType ?? ''}
                onChange={(event) =>
                  update('humanDesignType', event.target.value || undefined)
                }
                className={selectClass}
              >
                <option value="">Sin completar</option>
                {humanDesignTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs text-[#f5f0e5]/60">
                Autoridad
              </span>
              <select
                value={profile.humanDesignAuthority ?? ''}
                onChange={(event) =>
                  update(
                    'humanDesignAuthority',
                    event.target.value || undefined,
                  )
                }
                className={selectClass}
              >
                <option value="">Sin completar</option>
                {humanDesignAuthorities.map((authority) => (
                  <option key={authority}>{authority}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs text-[#f5f0e5]/60">
                Perfil
              </span>
              <input
                value={profile.humanDesignProfile ?? ''}
                onChange={(event) =>
                  update('humanDesignProfile', event.target.value)
                }
                placeholder="Ej. 4/6"
                className={inputClass}
              />
            </label>
          </div>
        </section>

        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#c9b987]">
            Documentos simbólicos
          </p>
          <p className="mb-5 max-w-3xl text-sm leading-6 text-[#f5f0e5]/58">
            Puedes seleccionar una carta astral, un documento de Human Design
            o cualquier archivo que para ti ayude a describir esta dimensión.
          </p>
          <SymbolicFileUpload
            files={profile.uploadedFiles ?? []}
            onChange={(files) => update('uploadedFiles', files)}
          />
        </section>

        <label className="block rounded-2xl border border-white/12 bg-white/[0.045] p-5 sm:p-7">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c9b987]">
            Notas simbólicas
          </span>
          <textarea
            value={profile.symbolicNotes ?? ''}
            onChange={(event) => update('symbolicNotes', event.target.value)}
            rows={3}
            placeholder="Añade cualquier símbolo, arquetipo o lenguaje personal que sea importante para ti..."
            className="mt-4 w-full resize-none rounded-xl border border-white/15 bg-white/[0.045] px-4 py-3 text-sm leading-6 text-[#f5f0e5] outline-none placeholder:text-white/28 focus:border-[#c9b987]/65"
          />
        </label>

        <div className="rounded-2xl border border-[#c9b987]/18 bg-[#c9b987]/7 p-5 text-xs leading-6 text-[#f5f0e5]/52">
          Más adelante, si esta función se activa de verdad, estos documentos
          requerirán consentimiento explícito y protección especial. Por ahora
          solo es una simulación local del prototipo.
        </div>
      </div>
    </div>
  )
}
