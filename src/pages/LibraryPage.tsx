import { Card } from '../components/Card'

const librarySections = [
  {
    title: 'Filosofía, literatura y ensayo',
    description:
      'Textos que preguntan qué significa amar, desear, cuidar y convertir a otra persona en destinataria de nuestras expectativas.',
    references: [
      'Erich Fromm · El arte de amar',
      'bell hooks · Todo sobre el amor',
      'Fernando de Rojas · La Celestina',
      'Rainer Maria Rilke · Cartas a un joven poeta',
      'Roland Barthes · Fragmentos de un discurso amoroso',
      'Eva Illouz · Por qué duele el amor',
    ],
  },
  {
    title: 'Psicología relacional',
    description:
      'Apego, reparación, comunicación, compromiso y estabilidad de pareja.',
    references: [
      'John Bowlby · Apego y pérdida',
      'Cindy Hazan & Phillip Shaver · Amor romántico como proceso de apego',
      'Sue Johnson · Terapia focalizada en las emociones',
      'John Gottman · Investigación sobre estabilidad de pareja',
      'Robert Sternberg · Teoría triangular del amor',
    ],
  },
  {
    title: 'Ciencia de las relaciones',
    description:
      'Investigación sobre cercanía, predictores relacionales, pasión, compañía y autoexpansión.',
    references: [
      'Finkel, Simpson & Eastwick · The Psychology of Close Relationships',
      'Arthur Aron · Intimidad y autoexpansión',
      'Elaine Hatfield · Amor pasional y amor compañero',
      'Samantha Joel y colaboradores · Predictores de calidad relacional',
    ],
  },
  {
    title: 'Biología del emparejamiento',
    description:
      'Líneas sobre olor, elección de pareja, apego y sistemas de recompensa.',
    references: [
      'Estudios sobre MHC/HLA y olor corporal',
      'Neurobiología del amor romántico',
      'Apego, oxitocina y sistemas de recompensa',
      'Evolución de la elección de pareja',
    ],
  },
  {
    title: 'Fronteras experimentales',
    description:
      'Preguntas emergentes que todavía requieren prudencia, evidencia y colaboración experta.',
    references: [
      'Microbiota y convivencia',
      'Transmisión interpersonal del microbioma',
      'Salud intestinal y vida compartida',
      'Posibles colaboraciones futuras con clínicas',
    ],
  },
]

export function LibraryPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 lg:px-10">
      <header className="max-w-4xl">
        <p className="eyebrow">Lecturas para no simplificar el vínculo</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-forest sm:text-6xl">
          Biblioteca del vínculo
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-muted">
          Filosofía, literatura, psicología y ciencia para entender mejor el
          amor, la compatibilidad y la forma en la que construimos relaciones.
        </p>
      </header>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {librarySections.map((section, index) => (
          <Card
            key={section.title}
            className={index === 0 ? 'lg:col-span-2 lg:p-9' : 'lg:p-8'}
          >
            <span className="text-xs font-semibold text-clay">
              0{index + 1}
            </span>
            <h2 className="mt-4 font-serif text-3xl text-forest">
              {section.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
              {section.description}
            </p>
            {index === 0 && (
              <p className="mt-5 max-w-4xl rounded-2xl bg-ivory/80 p-5 text-sm leading-7 text-ink">
                <strong>La Celestina</strong> interesa aquí como una obra sobre
                mediación, deseo, persuasión e intereses cruzados. No ofrece un
                modelo de amor: permite observar qué ocurre cuando el
                emparejamiento se manipula y las personas se convierten en
                medios para alcanzar un fin.
              </p>
            )}
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {section.references.map((reference) => (
                <li
                  key={reference}
                  className="rounded-xl border border-line/80 bg-white/45 px-4 py-3 text-sm leading-5 text-ink"
                >
                  {reference}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-white/45 p-6 text-sm leading-7 text-muted">
        Esta biblioteca combina obras filosóficas, literarias, psicología
        relacional y ciencia. No todas las referencias tienen el mismo nivel
        de evidencia: algunas son marcos consolidados; otras, líneas emergentes
        o interpretaciones culturales.
      </div>
    </div>
  )
}
