import { useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { candidates, mainUser } from '../data/mockUsers'
import { questionsBySection } from '../data/questions'
import type { AnswerValue, CandidateProfile } from '../types'
import { calculateCompatibility } from '../utils/compatibility'
import {
  getCurrentAccessLevel,
  type AccessLevel,
} from '../utils/entitlements'
import { generateRelationshipMap } from '../utils/relationshipMap'

interface UserDashboardPageProps {
  answers: Record<string, AnswerValue>
  onViewMap: () => void
  onEditMap: () => void
  onViewMatches: () => void
  onViewCandidate: (candidate: CandidateProfile) => void
  onViewLibrary: () => void
  onPricing: () => void
}

const dimensions = [
  'Lo visible',
  'Vida práctica',
  'Proyecto vital',
  'Valores',
  'Emocional',
  'Conflicto',
  'Intimidad',
  'Patrones',
  'Anhelo',
  'Disponibilidad',
  'Simbólica',
]

const expertAreas = [
  {
    title: 'Psicología y terapia de pareja',
    items: ['Psicólogos', 'Terapeutas de pareja', 'Apego y comunicación'],
  },
  {
    title: 'Sexualidad e intimidad',
    items: ['Sexólogos', 'Educación sexual', 'Deseo, límites y comunicación'],
  },
  {
    title: 'Salud, microbiota y biología del vínculo',
    items: [
      'Clínicas de microbiota',
      'Salud intestinal',
      'Estudios futuros de compatibilidad biológica',
    ],
    experimental: true,
  },
]

const accessDescriptions: Record<AccessLevel, string> = {
  free: 'Todavía estás en el plan gratuito. Puedes construir tu primer mapa o elegir un proceso de compatibilidad.',
  mapa_completo: 'Tienes activo el Mapa completo.',
  busqueda_compatible: 'Tienes activa la Búsqueda compatible.',
  busqueda_profunda: 'Tienes activa la Búsqueda profunda.',
}

export function UserDashboardPage({
  answers,
  onViewMap,
  onEditMap,
  onViewMatches,
  onViewCandidate,
  onViewLibrary,
  onPricing,
}: UserDashboardPageProps) {
  const [notice, setNotice] = useState('')
  const accessLevel = getCurrentAccessLevel()
  const map = generateRelationshipMap(answers)
  const answered = questionsBySection.reduce(
    (total, section) =>
      total +
      section.questions.filter((question) => {
        const answer = answers[question.id]
        return Array.isArray(answer)
          ? answer.length > 0
          : answer !== undefined && answer !== ''
      }).length,
    0,
  )
  const totalQuestions = questionsBySection.reduce(
    (total, section) => total + section.questions.length,
    0,
  )
  const completedDimensions = questionsBySection.filter((section) =>
    section.questions.some((question) => answers[question.id] !== undefined),
  ).length
  const reports = useMemo(
    () =>
      candidates.map((candidate) => ({
        candidate,
        report: calculateCompatibility(mainUser, candidate),
      })),
    [],
  )

  const showMockNotice = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3200)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 lg:px-10">
      <header className="flex flex-col gap-6 border-b border-line pb-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Tu área privada de prueba</p>
          <h1 className="mt-3 font-serif text-5xl text-forest sm:text-6xl">
            Mi espacio relacional
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Tu mapa, tus posibilidades y las próximas conversaciones que
            merecen atención.
          </p>
        </div>
        <Button variant="secondary" onClick={onViewLibrary}>
          Abrir biblioteca
        </Button>
      </header>

      {notice && (
        <div className="mt-5 rounded-xl border border-sage bg-[#e8f3fc] px-4 py-3 text-sm text-forest">
          {notice}
        </div>
      )}

      <section className="mt-8">
        <Card
          tone="sage"
          className="flex flex-col gap-6 p-7 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <p className="eyebrow">Tu proceso activo</p>
            <h2 className="mt-3 font-serif text-3xl text-forest">
              {accessLevel === 'free'
                ? 'Empieza a tu ritmo'
                : 'Tu acceso está activo'}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-forest/72">
              {accessDescriptions[accessLevel]}
            </p>
          </div>
          <Button onClick={onPricing}>Ver procesos</Button>
        </Card>
      </section>

      <section className="mt-8">
        <Card className="grid gap-8 p-7 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <p className="eyebrow">Resumen del mapa</p>
            <h2 className="mt-3 font-serif text-4xl text-forest">
              Tu mapa relacional
            </h2>
            <p className="mt-5 max-w-2xl font-serif text-xl leading-8 text-ink">
              {map.innerReading}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button onClick={onViewMap}>Ver mi mapa completo</Button>
              <Button variant="secondary" onClick={onEditMap}>
                Editar mi mapa
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Disponibilidad', `${map.availabilityLevel}/100`],
              ['Dimensiones', `${completedDimensions}/10`],
              ['Respuestas', `${answered}/${totalQuestions}`],
              ['Actualización', 'Hoy'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-line bg-ivory/70 p-5"
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
                  {label}
                </p>
                <p className="mt-3 font-serif text-2xl text-forest">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Una selección pequeña</p>
            <h2 className="mt-3 font-serif text-4xl text-forest">
              Posibilidades seleccionadas
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              No necesitas ver cientos de perfiles. Aquí aparecen pocas
              personas con las que merece la pena mirar con más atención.
            </p>
          </div>
          <Button variant="secondary" onClick={onViewMatches}>
            Ver todas
          </Button>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {reports.map(({ candidate, report }) => (
            <Card key={candidate.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-forest">
                    {candidate.name}
                  </h3>
                  <p className="text-sm text-muted">
                    {candidate.age} · {candidate.city}
                  </p>
                </div>
                <span className="font-serif text-3xl text-clay">
                  {report.totalScore}%
                </span>
              </div>
              <div className="mt-5 space-y-4 text-sm leading-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-moss">
                    Fortaleza
                  </p>
                  <p className="mt-1 text-ink">{report.strengths[0].title}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-clay">
                    Zona a conversar
                  </p>
                  <p className="mt-1 text-muted">{report.risks[0].title}</p>
                </div>
              </div>
              <Button
                variant="secondary"
                fullWidth
                className="mt-6"
                onClick={() => onViewCandidate(candidate)}
              >
                Ver informe
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Card className="p-7">
          <p className="eyebrow">Conversaciones pendientes</p>
          <h2 className="mt-3 font-serif text-3xl text-forest">
            Conversaciones que merecen cuidado
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted">
            Aún no has abierto ninguna conversación. Cuando una compatibilidad
            sea mutua, aquí aparecerán preguntas sugeridas para empezar con
            calma.
          </p>
          <Button
            variant="secondary"
            className="mt-6"
            onClick={() =>
              showMockNotice(
                'Las preguntas sugeridas se activarán con una compatibilidad mutua.',
              )
            }
          >
            Ver preguntas sugeridas
          </Button>
        </Card>

        <Card tone="sage" className="p-7">
          <p className="eyebrow">Biblioteca del vínculo</p>
          <h2 className="mt-3 font-serif text-3xl text-forest">
            Seguir comprendiendo
          </h2>
          <p className="mt-5 text-sm leading-7 text-forest/72">
            Lecturas, estudios y referencias sobre filosofía, psicología
            relacional, biología, sexualidad y dimensión simbólica.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              'Filosofía y ensayo',
              'Psicología relacional',
              'Biología',
              'Sexualidad',
              'Dimensión simbólica',
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-forest/12 bg-white/42 px-3 py-1.5 text-xs text-forest"
              >
                {item}
              </span>
            ))}
          </div>
          <Button className="mt-6" onClick={onViewLibrary}>
            Ver biblioteca
          </Button>
        </Card>
      </div>

      <section className="mt-12">
        <p className="eyebrow">Cambiar también es parte del mapa</p>
        <h2 className="mt-3 font-serif text-4xl text-forest">Editar mi mapa</h2>
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {dimensions.map((dimension, index) => (
            <button
              key={dimension}
              type="button"
              onClick={onEditMap}
              className="flex items-center justify-between rounded-xl border border-line bg-white/55 px-4 py-3 text-left text-sm text-ink transition hover:border-moss hover:bg-white"
            >
              <span>
                <span className="mr-2 text-xs text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {dimension}
              </span>
              <span className="text-xs font-semibold text-moss">Revisar</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <p className="eyebrow">Cuando una herramienta no basta</p>
        <h2 className="mt-3 font-serif text-4xl text-forest">
          Consultar con un experto
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          Algunas preguntas necesitan una conversación humana. En el futuro,
          Real Linkings podrá conectar con profesionales que ayuden a leer el
          mapa desde distintas perspectivas.
        </p>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {expertAreas.map((area) => (
            <Card key={area.title} className="p-6">
              <h3 className="font-serif text-2xl text-forest">{area.title}</h3>
              <ul className="mt-5 space-y-2 text-sm text-muted">
                {area.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
              {area.experimental && (
                <p className="mt-5 rounded-xl bg-ivory/80 p-3 text-xs leading-5 text-clay">
                  Área experimental futura. No se usará para prometer
                  compatibilidad ni tomar decisiones automáticas.
                </p>
              )}
              <Button
                variant="secondary"
                fullWidth
                className="mt-6"
                onClick={() =>
                  showMockNotice('La red de expertos estará disponible más adelante.')
                }
              >
                {area.experimental ? 'Próximamente' : 'Explorar expertos'}
              </Button>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-muted">
          No compartas datos médicos reales en este prototipo. Cuando estas
          funciones existan, requerirán consentimiento explícito, protección
          reforzada y revisión legal.
        </p>
      </section>

      <section className="mt-12">
        <Card tone="forest" className="p-7 sm:p-9">
          <p className="eyebrow !text-sage">Privacidad y control de datos</p>
          <div className="mt-4 grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h2 className="font-serif text-3xl">Tu intimidad no es un activo.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-paper/65">
                Tu mapa contiene información íntima. Debes poder decidir qué se
                muestra, qué se guarda y qué quieres eliminar.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {[
                'Configurar privacidad',
                'Exportar mi mapa',
                'Eliminar mis datos',
              ].map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() =>
                    showMockNotice(`${action}: función simulada en este prototipo.`)
                  }
                  className="rounded-full border border-white/18 px-4 py-2 text-xs font-semibold text-paper/82 transition hover:bg-white/8"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
