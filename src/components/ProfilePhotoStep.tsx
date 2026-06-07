import { useState, type ChangeEvent, type DragEvent } from 'react'
import type { UploadedProfilePhoto } from '../types'

interface ProfilePhotoStepProps {
  photos: UploadedProfilePhoto[]
  onChange: (photos: UploadedProfilePhoto[]) => void
  onSkip: () => void
}

const MAX_PHOTOS = 6
const MAX_FILE_SIZE = 10 * 1024 * 1024

const photoIdeas = [
  'Tu rostro con luz natural',
  'Una imagen de cuerpo entero',
  'Haciendo algo que disfrutas',
  'Un momento cotidiano y reciente',
]

function createPhoto(file: File): UploadedProfilePhoto {
  return {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${file.name}-${file.lastModified}-${Math.random()}`,
    name: file.name,
    type: file.type,
    size: file.size,
    previewUrl: URL.createObjectURL(file),
  }
}

export function ProfilePhotoStep({
  photos,
  onChange,
  onSkip,
}: ProfilePhotoStepProps) {
  const [message, setMessage] = useState('')

  const addFiles = (files: File[]) => {
    const availableSlots = MAX_PHOTOS - photos.length
    const validFiles = files.filter(
      (file) => file.type.startsWith('image/') && file.size <= MAX_FILE_SIZE,
    )
    const selectedFiles = validFiles.slice(0, availableSlots)

    if (selectedFiles.length > 0) {
      onChange([...photos, ...selectedFiles.map(createPhoto)])
    }

    if (files.some((file) => file.size > MAX_FILE_SIZE)) {
      setMessage('Cada imagen debe pesar menos de 10 MB.')
    } else if (validFiles.length === 0 && files.length > 0) {
      setMessage('Selecciona archivos de imagen.')
    } else if (validFiles.length > availableSlots) {
      setMessage(`Puedes añadir un máximo de ${MAX_PHOTOS} fotos.`)
    } else {
      setMessage('')
    }
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(event.target.files ?? []))
    event.target.value = ''
  }

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    addFiles(Array.from(event.dataTransfer.files))
  }

  const removePhoto = (photo: UploadedProfilePhoto) => {
    URL.revokeObjectURL(photo.previewUrl)
    onChange(photos.filter((item) => item.id !== photo.id))
    setMessage('')
  }

  const skipPhotos = () => {
    photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl))
    onChange([])
    onSkip()
  }

  return (
    <div className="relative flex h-full flex-col justify-center">
      <div className="mb-2 flex justify-end sm:absolute sm:right-0 sm:top-0 sm:mb-0">
        <button
          type="button"
          onClick={skipPhotos}
          className="shrink-0 rounded-full border border-forest/15 bg-white/45 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-moss transition hover:border-forest/35 hover:text-forest"
        >
          Omitir fotos
        </button>
      </div>

      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-moss sm:text-xs">
        Tu presencia · Fotos opcionales
      </p>
      <h1 className="mt-1 max-w-3xl font-serif text-2xl leading-tight text-forest sm:mt-2 sm:text-5xl">
        Fotos en las que se te pueda encontrar.
      </h1>

      <p className="mt-2 max-w-3xl text-xs leading-5 text-muted sm:mt-3 sm:text-sm sm:leading-6">
        No busques seis versiones perfectas de ti. Elige imágenes recientes,
        variadas y naturales que permitan reconocer cómo miras, cómo te mueves
        y qué clase de vida habitas.
      </p>

      <div className="mt-3 grid grid-cols-2 gap-1.5 sm:mt-4 sm:flex sm:flex-wrap sm:gap-2">
        {photoIdeas.map((idea) => (
          <span
            key={idea}
            className="rounded-full border border-white/80 bg-white/48 px-2 py-1 text-center text-[0.56rem] text-forest/72 shadow-sm sm:px-3 sm:py-1.5 sm:text-[0.66rem]"
          >
            {idea}
          </span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1.5 sm:mt-5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
        {photos.map((photo, index) => (
          <figure
            key={photo.id}
            className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/80 bg-white/45 shadow-[0_12px_28px_rgba(38,55,47,0.08)] sm:rounded-2xl"
          >
            <img
              src={photo.previewUrl}
              alt={`Foto seleccionada ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-1 bg-gradient-to-t from-forest/80 to-transparent p-1.5 pt-5 text-paper sm:gap-2 sm:p-2.5 sm:pt-8">
              <span className="hidden truncate text-[0.62rem] sm:inline">
                Foto {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removePhoto(photo)}
                aria-label={`Quitar foto ${index + 1}`}
                className="ml-auto flex size-6 items-center justify-center rounded-full bg-paper/18 text-sm leading-none backdrop-blur-sm transition hover:bg-paper/28 sm:h-auto sm:w-auto sm:px-2 sm:py-1 sm:text-[0.58rem] sm:font-semibold sm:uppercase sm:tracking-[0.08em]"
              >
                <span aria-hidden="true" className="sm:hidden">
                  ×
                </span>
                <span className="hidden sm:inline">Quitar</span>
              </button>
            </figcaption>
          </figure>
        ))}

        {photos.length < MAX_PHOTOS && (
          <label
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-moss/38 bg-white/38 px-4 text-center transition hover:border-forest/55 hover:bg-white/58 ${
              photos.length === 0
                ? 'col-span-4 min-h-28 sm:col-span-3 sm:min-h-36 lg:col-span-6'
                : 'aspect-[4/5]'
            }`}
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-moss/25 bg-paper/70 font-serif text-xl text-forest">
              +
            </span>
            <span className="mt-1 text-[0.56rem] font-medium leading-3 text-forest sm:mt-2 sm:text-xs sm:leading-normal">
              {photos.length === 0
                ? 'Seleccionar fotos del dispositivo'
                : 'Añadir otra foto'}
            </span>
            <span className="mt-1 hidden text-[0.62rem] leading-4 text-muted sm:inline">
              JPG, PNG o WEBP · máximo 10 MB
            </span>
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleInput}
              className="sr-only"
            />
          </label>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 text-[0.56rem] leading-4 text-muted sm:mt-4 sm:text-[0.64rem] sm:leading-5">
        <p>
          Recomendación: entre 3 y 6 fotos. En este prototipo permanecen solo
          en tu sesión y no se envían a ningún servidor.
        </p>
        <span className="shrink-0 font-semibold text-moss">
          {photos.length}/{MAX_PHOTOS}
        </span>
      </div>
      {message && <p className="mt-1 text-xs text-clay">{message}</p>}
    </div>
  )
}
