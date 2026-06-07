import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { hasSymbolicData } from '../data/symbolic'
import type { AnswerValue, SymbolicProfile } from '../types'
import { generateRelationshipMap } from '../utils/relationshipMap'

interface RelationshipMapPageProps {
  answers: Record<string, AnswerValue>
  symbolicProfile: SymbolicProfile
  onViewMatches: () => void
}

export function RelationshipMapPage({
  answers,
  symbolicProfile,
  onViewMatches,
}: RelationshipMapPageProps) {
  const relationshipMap = generateRelationshipMap(answers)
  const showSymbolicLayer = hasSymbolicData(symbolicProfile)
  const symbolicItems = [
    symbolicProfile.sunSign && `Sol en ${symbolicProfile.sunSign}`,
    symbolicProfile.moonSign && `Luna en ${symbolicProfile.moonSign}`,
    symbolicProfile.risingSign &&
      `Ascendente en ${symbolicProfile.risingSign}`,
    symbolicProfile.mbtiType && `MBTI: ${symbolicProfile.mbtiType}`,
    symbolicProfile.humanDesignType &&
      `Human Design: ${symbolicProfile.humanDesignType}${
        symbolicProfile.humanDesignAuthority
          ? ` · Autoridad ${symbolicProfile.humanDesignAuthority.toLowerCase()}`
          : ''
      }${
        symbolicProfile.humanDesignProfile
          ? ` · Perfil ${symbolicProfile.humanDesignProfile}`
          : ''
      }`,
    symbolicProfile.uploadedFiles?.length &&
      `${symbolicProfile.uploadedFiles.length} documento${
        symbolicProfile.uploadedFiles.length === 1 ? '' : 's'
      } simbólico${symbolicProfile.uploadedFiles.length === 1 ? '' : 's'}`,
  ].filter(Boolean) as string[]

  return (
    <div className="mx-auto max-w-7xl px-5 pb-10 pt-10 sm:px-8 lg:px-10">
      <header className="mx-auto max-w-3xl text-center animate-reveal">
        <p className="eyebrow">Una lectura, no una etiqueta</p>
        <h1 className="mt-4 font-serif text-5xl text-forest sm:text-6xl">
          Tu mapa relacional
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">
          Esta lectura nace de tus respuestas y del momento que has descrito.
          No define quién eres: organiza señales para que puedas elegir con más
          conciencia.
        </p>
      </header>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-2 lg:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8eee9] font-serif text-lg text-forest">
              01
            </span>
            <div>
              <p className="eyebrow">Cómo buscas vincularte</p>
              <p className="mt-4 font-serif text-2xl leading-relaxed text-forest sm:text-3xl">
                {relationshipMap.bondingStyle}
              </p>
            </div>
          </div>
        </Card>

        <Card tone="sage" className="lg:p-8">
          <p className="eyebrow">Disponibilidad estimada</p>
          <div className="mt-5 flex items-end gap-2">
            <span className="font-serif text-6xl text-forest">
              {relationshipMap.availabilityLevel}
            </span>
            <span className="mb-2 text-sm text-muted">/ 100</span>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-forest/10">
            <div
              className="h-full rounded-full bg-forest"
              style={{ width: `${relationshipMap.availabilityLevel}%` }}
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-forest/75">
            {relationshipMap.availabilityLabel}
          </p>
        </Card>

        <Card className="lg:p-8">
          <span className="font-serif text-xl italic text-clay">02</span>
          <p className="eyebrow mt-7">Para sentirte seguro/a</p>
          <p className="mt-4 text-sm leading-7 text-muted">
            {relationshipMap.safetyNeeds}
          </p>
        </Card>

        <Card tone="forest" className="lg:col-span-2 lg:p-8">
          <span className="font-serif text-xl italic text-sage">03</span>
          <p className="eyebrow mt-7 !text-sage">
            La relación que quieres construir
          </p>
          <p className="mt-4 max-w-2xl font-serif text-2xl leading-relaxed text-paper sm:text-3xl">
            {relationshipMap.desiredRelationship}
          </p>
        </Card>

        <Card
          tone="transparent"
          className="relative overflow-hidden md:col-span-2 lg:col-span-3 lg:p-9"
        >
          <div className="absolute -right-12 -top-20 size-48 rounded-full border border-moss/10" />
          <div className="grid gap-7 lg:grid-cols-[0.38fr_1.62fr] lg:items-start">
            <div>
              <span className="font-serif text-xl italic text-clay">04</span>
              <p className="eyebrow mt-6">Lectura interior</p>
              <p className="mt-3 text-xs leading-5 text-muted">
                Lo que parece haber debajo de tus preferencias.
              </p>
            </div>
            <p className="relative max-w-4xl font-serif text-2xl leading-relaxed text-forest sm:text-3xl">
              {relationshipMap.innerReading}
            </p>
          </div>
        </Card>

        <Card className="lg:p-8">
          <p className="eyebrow">Zonas sensibles</p>
          <ul className="mt-5 space-y-5">
            {relationshipMap.sensitiveAreas.map((area) => (
              <li key={area} className="flex gap-3 text-sm leading-6 text-muted">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                {area}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-2 lg:p-8">
          <p className="eyebrow">Fortalezas que aportas</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {relationshipMap.strengths.map((strength, index) => (
              <div
                key={strength}
                className="rounded-2xl border border-line bg-ivory/65 p-5"
              >
                <span className="font-serif text-lg text-moss">
                  0{index + 1}
                </span>
                <p className="mt-5 text-sm leading-6 text-ink">{strength}</p>
              </div>
            ))}
          </div>
        </Card>

        {relationshipMap.gazeReading && (
          <Card
            tone="transparent"
            className="md:col-span-2 lg:col-span-3 lg:p-8"
          >
            <div className="grid gap-5 lg:grid-cols-[0.38fr_1.62fr] lg:items-center">
              <div>
                <span className="font-serif text-xl italic text-clay">05</span>
                <p className="eyebrow mt-5">Mirada y presencia</p>
              </div>
              <p className="font-serif text-xl leading-8 text-forest sm:text-2xl">
                {relationshipMap.gazeReading}
              </p>
            </div>
          </Card>
        )}

        {showSymbolicLayer && (
          <Card
            tone="forest"
            className="grain relative overflow-hidden md:col-span-2 lg:col-span-3 lg:p-9"
          >
            <div className="grid gap-8 lg:grid-cols-[0.52fr_1.48fr]">
              <div>
                <span className="font-serif text-xl italic text-[#d8cda8]">
                  {relationshipMap.gazeReading ? '06' : '05'}
                </span>
                <p className="eyebrow mt-6 !text-[#c9b987]">
                  Dimensión simbólica
                </p>
                <p className="mt-3 text-xs leading-5 text-paper/48">
                  Una capa narrativa que has elegido añadir.
                </p>
              </div>
              <div>
                {symbolicItems.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {symbolicItems.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-paper/78"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
                {symbolicProfile.symbolicNotes && (
                  <p className="mt-5 font-serif text-xl italic leading-8 text-paper/82">
                    “{symbolicProfile.symbolicNotes}”
                  </p>
                )}
                <p className="mt-5 max-w-3xl text-sm leading-7 text-paper/58">
                  Esta capa no define tu afinidad, pero puede aportar un
                  lenguaje adicional para comprender cómo te lees a ti
                  mismo/a y qué símbolos forman parte de tu identidad.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="mt-12 flex flex-col items-center text-center">
        <p className="max-w-lg text-sm leading-6 text-muted">
          El siguiente paso no es ver más personas. Es mirar mejor a aquellas
          cuya forma de estar, cuidar y construir podría encontrarse con la
          tuya.
        </p>
        <Button onClick={onViewMatches} className="mt-6 px-8">
          Ver posibilidades seleccionadas
          <span aria-hidden="true">→</span>
        </Button>
      </div>
    </div>
  )
}
