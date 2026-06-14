import type { ChangeEvent } from 'react'
import type {
  SymbolicFileCategory,
  UploadedSymbolicFile,
} from '../types'

interface SymbolicFileUploadProps {
  files: UploadedSymbolicFile[]
  onChange: (files: UploadedSymbolicFile[]) => void
}

const categories: Array<{
  name: SymbolicFileCategory
  description: string
}> = [
  {
    name: 'Carta astral',
    description: 'Carta, informe astrológico o captura.',
  },
  {
    name: 'Human Design',
    description: 'Gráfico, bodygraph o lectura personal.',
  },
  {
    name: 'Informe de personalidad',
    description: 'MBTI u otro informe de autoconocimiento.',
  },
  {
    name: 'Otro documento simbólico',
    description: 'Cualquier otro archivo que quieras aportar.',
  },
]

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function SymbolicFileUpload({
  files,
  onChange,
}: SymbolicFileUploadProps) {
  const addFiles = (
    category: SymbolicFileCategory,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(event.target.files ?? [])
    const nextFiles = selectedFiles.map((file) => ({
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${file.name}-${file.lastModified}`,
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      category,
    }))

    onChange([...files, ...nextFiles])
    event.target.value = ''
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((category) => {
          const categoryFiles = files.filter(
            (file) => file.category === category.name,
          )

          return (
            <section
              key={category.name}
              className="flex min-h-36 flex-col rounded-2xl border border-white/12 bg-white/[0.045] p-3.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xs font-semibold text-[#e5f1ff]">
                    {category.name}
                  </h2>
                  <p className="mt-1 text-[0.62rem] leading-4 text-[#f7fbff]/42">
                    {category.description}
                  </p>
                </div>
                {categoryFiles.length > 0 && (
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#b8d5ff]/12 text-[0.58rem] font-semibold text-[#c7dcff]">
                    {categoryFiles.length}
                  </span>
                )}
              </div>

              {categoryFiles.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                  {categoryFiles.map((file) => (
                    <li
                      key={file.id}
                      className="flex items-center justify-between gap-3 rounded-lg bg-black/10 px-2.5 py-1.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[0.68rem] text-[#f7fbff]">
                          {file.name}
                        </p>
                        <p className="text-[0.56rem] text-[#f7fbff]/38">
                          {formatSize(file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onChange(
                            files.filter((item) => item.id !== file.id),
                          )
                        }
                        className="shrink-0 text-[0.6rem] text-[#b8d5ff] transition hover:text-white"
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <label className="mt-auto flex min-h-10 cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#b8d5ff]/38 bg-[#b8d5ff]/7 px-3 text-center text-[0.64rem] font-medium text-[#e5f1ff] transition hover:border-[#b8d5ff]/65 hover:bg-[#b8d5ff]/12">
                <span>{categoryFiles.length > 0 ? 'Añadir otro archivo' : 'Subir archivo'}</span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/png,image/jpeg"
                  onChange={(event) => addFiles(category.name, event)}
                  className="sr-only"
                />
              </label>
            </section>
          )
        })}
      </div>

      <p className="mt-2.5 text-[0.62rem] leading-4 text-[#f7fbff]/42">
        En este prototipo los archivos solo se guardan en el estado local de
        esta sesión. No se envían a ningún servidor. No compartas datos médicos
        reales en este prototipo.
      </p>
    </div>
  )
}
