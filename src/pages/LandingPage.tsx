import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { ReflectionQuote } from '../components/ReflectionQuote'
import { reflections } from '../data/reflections'

interface LandingPageProps {
  onStart: () => void
  onPricing: () => void
  onLogin?: () => void
  onRegister?: () => void
}

const values = [
  {
    number: '01',
    title: 'Una lectura de cómo amas',
    text: 'Pon palabras a tus necesidades, tus formas de protegerte y aquello que ya no quieres repetir.',
  },
  {
    number: '02',
    title: 'Afinidad con contexto',
    text: 'Miramos valores, proyecto vital, comunicación, intimidad y capacidad de estar presente.',
  },
  {
    number: '03',
    title: 'Pocas posibilidades, bien miradas',
    text: 'Sin catálogos infinitos. Solo encuentros que merecen tiempo, preguntas y atención.',
  },
]

const foundations = [
  {
    number: '01',
    title: 'Filosofía y literatura del amor',
    text: 'Autores como Erich Fromm recuerdan que amar no es poseer ni consumir, sino practicar cuidado, respeto, responsabilidad y conocimiento. La literatura añade conflictos, deseo y ambivalencia.',
    references: [
      'Erich Fromm · El arte de amar',
      'bell hooks · Todo sobre el amor',
      'Fernando de Rojas · La Celestina',
      'Rainer Maria Rilke · Cartas a un joven poeta',
      'Roland Barthes · Fragmentos de un discurso amoroso',
    ],
  },
  {
    number: '02',
    title: 'Psicología del vínculo',
    text: 'El mapa relacional se inspira en ideas de apego adulto, comunicación, reparación, compromiso, intimidad y disponibilidad emocional.',
    references: [
      'John Bowlby · Apego y pérdida',
      'Cindy Hazan & Phillip Shaver · Apego adulto',
      'Sue Johnson · Terapia focalizada en las emociones',
      'John Gottman · Investigación sobre parejas',
    ],
  },
  {
    number: '03',
    title: 'Ciencia de la compatibilidad',
    text: 'La compatibilidad no se reduce a gustos. También incluye proyecto vital, valores, conflicto, sexualidad, contexto, estrés, compromiso y capacidad de reparar.',
    references: [
      'Finkel, Simpson & Eastwick · Close Relationships',
      'Robert Sternberg · Teoría triangular del amor',
      'Elaine Hatfield · Pasión y amor compañero',
      'Arthur Aron · Cercanía y autoexpansión',
    ],
  },
  {
    number: '04',
    title: 'Biología y fronteras experimentales',
    text: 'Existen investigaciones sobre olor corporal, MHC/HLA, sistemas inmunológicos, microbiota y convivencia. Son preguntas interesantes, no promesas de compatibilidad.',
    references: [
      'Estudios sobre MHC/HLA y elección de pareja',
      'Microbioma y convivencia',
      'Neurobiología del apego',
      'Futuras colaboraciones con expertos',
    ],
  },
]

export function LandingPage({ onStart, onPricing }: LandingPageProps) {
  return (
    <>
      <section className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 overflow-hidden px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:pt-4">
        <div className="relative z-10 animate-reveal">
          <p className="eyebrow mb-5">
            Autoconocimiento para elegir con más conciencia
          </p>
          <h1 className="max-w-3xl font-serif text-[3.4rem] leading-[0.98] tracking-[-0.03em] text-forest sm:text-7xl lg:text-[5.5rem]">
            Menos matches.
            <span className="mt-2 block italic text-clay">Más vínculo.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Una plataforma para entender cómo amas y encontrar personas con
            las que podrías cuidar una relación honesta y duradera.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button onClick={onStart} className="px-8">
              Descubrir mi mapa relacional
              <span aria-hidden="true">→</span>
            </Button>
            <span className="text-xs text-muted">
              12 dimensiones · una capa simbólica opcional
            </span>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[420px] w-full max-w-lg items-center justify-center lg:min-h-[560px]">
          <div className="absolute size-[23rem] rounded-full border border-forest/10 sm:size-[29rem]" />
          <div className="absolute size-[17rem] rounded-full border border-forest/12 sm:size-[22rem]" />
          <div className="absolute left-[12%] top-[18%] size-3 rounded-full bg-clay shadow-[0_0_0_10px_rgba(182,108,82,0.1)]" />
          <div className="absolute bottom-[18%] right-[14%] size-3 rounded-full bg-moss shadow-[0_0_0_10px_rgba(95,119,107,0.1)]" />

          <svg
            viewBox="0 0 440 440"
            className="absolute inset-0 size-full text-forest/35"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M82 138C144 120 127 229 207 214s53 105 137 74"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="4 7"
            />
            <path
              d="M75 314c70-85 112 8 166-73s85-42 126-99"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>

          <Card className="grain relative w-[78%] rotate-[-2deg] p-7 sm:p-9">
            <div className="mb-8 flex items-center justify-between">
              <span className="eyebrow">Tu mapa relacional</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-[#e5f1fb] text-forest">
                ∿
              </span>
            </div>
            <p className="font-serif text-2xl leading-snug text-forest sm:text-3xl">
              “Quiero sentirme elegido/a sin tener que dejar de ser yo.”
            </p>
            <div className="mt-8 space-y-4">
              {[
                ['Claridad emocional', '88%'],
                ['Proyecto compartido', '92%'],
                ['Espacio propio', '76%'],
              ].map(([label, score], index) => (
                <div key={label}>
                  <div className="mb-1.5 flex justify-between text-xs text-muted">
                    <span>{label}</span>
                    <span>{score}</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-forest/10">
                    <div
                      className="h-full rounded-full bg-moss"
                      style={{ width: score }}
                    />
                  </div>
                  {index === 2 && (
                    <p className="mt-5 text-xs leading-5 text-muted">
                      No buscamos una persona perfecta. Buscamos una relación
                      que ambos puedan cuidar.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
        <div className="grid gap-8 border-y border-line/80 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">Otra forma de buscar el amor</p>
            <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight text-forest sm:text-5xl">
              Una persona no es un perfil que consumir.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-muted">
              Durante años, las aplicaciones de citas nos han acostumbrado a
              mirar personas como opciones o estímulos. Real Linkings parte de
              otra premisa: una relación no debería empezar desde la prisa, la
              validación o el consumo, sino desde la presencia, la claridad y
              la intención.
            </p>
          </div>
          <ReflectionQuote
            text={reflections[0]}
            context="Una premisa para empezar"
          />
        </div>
      </section>

      <section className="bg-forest px-5 py-20 text-paper sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="eyebrow !text-sage">Otra forma de encontrarse</p>
              <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight sm:text-5xl">
                Antes de mirar fuera, empezamos por dentro.
              </h2>
            </div>
            <p className="max-w-2xl self-end text-base leading-7 text-paper/65">
              No se trata de deslizar perfiles, acumular conversaciones ni
              perseguir una chispa instantánea. Se trata de comprender cómo
              amas, qué necesitas y con quién podrías construir una relación
              honesta, recíproca y sostenible.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/10 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.number} className="bg-forest p-7 sm:p-9">
                <span className="font-serif text-xl italic text-sage">
                  {value.number}
                </span>
                <h3 className="mt-8 font-serif text-2xl">{value.title}</h3>
                <p className="mt-4 text-sm leading-6 text-paper/60">
                  {value.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <Card
          tone="sage"
          className="grid gap-10 overflow-hidden p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-12"
        >
          <div>
            <p className="eyebrow">Pago único, procesos definidos</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-forest sm:text-5xl">
              Tu mapa es tuyo. La búsqueda se compra por procesos.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">
              Puedes empezar gratis, desbloquear tu mapa completo o iniciar una
              búsqueda compatible con una selección limitada de perfiles.
            </p>
            <Button onClick={onPricing} className="mt-8">
              Ver procesos de compatibilidad
              <span aria-hidden="true">→</span>
            </Button>
          </div>
          <div className="grid gap-3">
            {[
              ['Gratis', 'Primera lectura del mapa'],
              ['9,99 €', 'Mapa completo'],
              ['29,99 €', 'Búsqueda compatible'],
              ['59,99 €', 'Búsqueda profunda'],
            ].map(([price, label]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl border border-forest/10 bg-white/42 px-5 py-4"
              >
                <span className="text-sm text-forest">{label}</span>
                <span className="font-serif text-xl text-clay">{price}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="eyebrow">Amar también se aprende</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-forest sm:text-5xl">
              Encontrar importa. La capacidad de amar también.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-muted">
              Real Linkings parte de una idea sencilla y exigente: el amor no
              es solo algo que aparece, también es algo que se cultiva. No
              basta con encontrar a alguien compatible; también importa cómo
              miras, cuidas, respondes, respetas y conoces al otro.
            </p>
          </div>
          <div className="rounded-[2rem] border border-sage/70 bg-[#e8f3fc] p-7 shadow-soft sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-moss">
              Una frase propia de Real Linkings
            </p>
            <p className="mt-5 font-serif text-3xl leading-tight text-forest sm:text-4xl">
              “No buscamos solo a quién amar. También miramos desde dónde somos
              capaces de amar.”
            </p>
            <p className="mt-6 text-xs leading-5 text-muted">
              Esta orientación dialoga con ideas de Erich Fromm, sin presentar
              su obra como un método de compatibilidad ni sustituir la
              investigación psicológica.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line/80 bg-white/28 px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-4xl">
            <p className="eyebrow">Fundamentos de Real Linkings</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-forest sm:text-5xl">
              Una base plural para hacer mejores preguntas.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted">
              Este proyecto nace entre la filosofía del amor, la literatura,
              la psicología del vínculo, la ciencia de las relaciones y
              algunas preguntas todavía abiertas sobre la biología del
              emparejamiento.
            </p>
          </header>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {foundations.map((foundation) => (
              <Card key={foundation.title} className="p-7 sm:p-8">
                <span className="text-xs font-semibold text-clay">
                  {foundation.number}
                </span>
                <h3 className="mt-4 font-serif text-3xl text-forest">
                  {foundation.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {foundation.text}
                </p>
                <ul className="mt-6 space-y-2 border-t border-line/75 pt-5">
                  {foundation.references.map((reference) => (
                    <li
                      key={reference}
                      className="text-xs leading-5 text-ink"
                    >
                      {reference}
                    </li>
                  ))}
                </ul>
                {foundation.number === '01' && (
                  <p className="mt-5 rounded-xl bg-ivory/75 p-4 text-xs leading-5 text-muted">
                    En <strong>La Celestina</strong>, el emparejamiento aparece
                    atravesado por mediación, persuasión e intereses. La obra
                    sirve para pensar los riesgos de manipular el deseo, no
                    como modelo de relación.
                  </p>
                )}
              </Card>
            ))}
          </div>

          <p className="mt-8 max-w-4xl text-xs leading-6 text-muted">
            Real Linkings no presenta estas áreas como verdades cerradas ni
            como diagnóstico. Algunas forman parte de ciencia consolidada;
            otras son marcos filosóficos, obras culturales o líneas emergentes
            que deben tratarse con cautela.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
        <p className="eyebrow">No más matches vacíos</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-forest sm:text-6xl">
          La paciencia también puede ser una forma de deseo.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted">
          Empieza por reconocer lo que buscas, lo que hoy puedes ofrecer y las
          conversaciones que no quieres volver a evitar.
        </p>
        <Button onClick={onStart} className="mt-9 px-8">
          Empezar con calma
        </Button>
      </section>
    </>
  )
}
