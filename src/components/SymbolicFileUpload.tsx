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
    <div className="rounded-2xl border border-white/12 bg-white/[0.045] p-4">
      <div className="grid gap-4 sm:grid-cols-[0.6fr_1.4fr] sm:items-end">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#b8d5ff]">
            Categoría
          </span>
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as SymbolicFileCategory)
            }
            className="min-h-11 w-full rounded-xl border border-white/15 bg-[#1b3556] px-3 text-xs text-[#f7fbff] outline-none focus:border-[#b8d5ff]/65"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="flex min-h-11 cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#b8d5ff]/45 bg-[#b8d5ff]/8 px-4 text-center text-xs font-medium text-[#e5f1ff] transition hover:bg-[#b8d5ff]/12">
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
        <ul className="mt-3 max-h-24 divide-y divide-white/10 overflow-y-auto">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center justify-between gap-4 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-sm text-[#f7fbff]">{file.name}</p>
                <p className="mt-1 text-xs text-[#f7fbff]/45">
                  {file.category} · {formatSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onChange(files.filter((item) => item.id !== file.id))
                }
                className="text-xs text-[#b8d5ff] transition hover:text-white"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-3 text-[0.68rem] leading-5 text-[#f7fbff]/42">
        En este prototipo los archivos solo se guardan en el estado local de
        esta sesión. No se envían a ningún servidor.
      </p>
    </div>
  )
}
