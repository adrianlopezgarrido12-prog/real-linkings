import { useState, type ChangeEvent } from 'react'
import type {
  SymbolicFileCategory,
  UploadedSymbolicFile,
} from '../types'

interface SymbolicFileUploadProps {
  files: UploadedSymbolicFile[]
  onChange: (files: UploadedSymbolicFile[]) => void
}

const categories: SymbolicFileCategory[] = [
  'Carta astral',
  'Human Design',
  'Informe de personalidad',
  'Otro documento simbólico',
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
  const [category, setCategory] =
    useState<SymbolicFileCategory>('Carta astral')

  const addFiles = (event: ChangeEvent<HTMLInputElement>) => {
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
    <div className="rounded-2xl border border-white/12 bg-white/[0.045] p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-[0.6fr_1.4fr] sm:items-end">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#c9b987]">
            Categoría
          </span>
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as SymbolicFileCategory)
            }
            className="min-h-12 w-full rounded-xl border border-white/15 bg-[#152321] px-4 text-sm text-[#f5f0e5] outline-none focus:border-[#c9b987]/65"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#c9b987]/45 bg-[#c9b987]/8 px-5 text-center text-sm font-medium text-[#eee6d3] transition hover:bg-[#c9b987]/12">
          Seleccionar archivos del dispositivo
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/png,image/jpeg"
            onChange={addFiles}
            className="sr-only"
          />
        </label>
      </div>

      {files.length > 0 && (
        <ul className="mt-5 divide-y divide-white/10">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm text-[#f5f0e5]">{file.name}</p>
                <p className="mt-1 text-xs text-[#f5f0e5]/45">
                  {file.category} · {formatSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onChange(files.filter((item) => item.id !== file.id))
                }
                className="text-xs text-[#c9b987] transition hover:text-white"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-5 text-xs leading-5 text-[#f5f0e5]/42">
        En este prototipo los archivos solo se guardan en el estado local de
        esta sesión. No se envían a ningún servidor.
      </p>
    </div>
  )
}
