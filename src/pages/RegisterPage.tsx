import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'

interface RegisterPageProps {
  onEnter: () => void
  onLogin: () => void
}

const inputClass =
  'mt-2 min-h-12 w-full rounded-xl border border-line bg-white/75 px-4 text-sm text-ink outline-none transition placeholder:text-muted/55 focus:border-moss focus:bg-white'

export function RegisterPage({ onEnter, onLogin }: RegisterPageProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [intention, setIntention] = useState('')

  return (
    <div className="mx-auto grid min-h-[72vh] max-w-6xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
      <div>
        <p className="eyebrow">Una cuenta para seguir pensando</p>
        <h1 className="mt-4 max-w-xl font-serif text-5xl leading-tight text-forest sm:text-6xl">
          Empieza a construir tu espacio.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-muted">
          En esta fase no se guarda información real en servidor. Los campos
          permiten visualizar el futuro flujo de registro.
        </p>
      </div>

      <Card className="p-7 sm:p-9">
        <h2 className="font-serif text-3xl text-forest">Crear cuenta</h2>
        <div className="mt-7 space-y-5">
          <label className="block text-sm font-medium text-ink">
            Nombre
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Cómo quieres que te llamemos"
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Email de prueba
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nombre@ejemplo.com"
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Intención relacional
            <textarea
              value={intention}
              onChange={(event) => setIntention(event.target.value)}
              rows={3}
              placeholder="Qué te gustaría poder construir con alguien"
              className={`${inputClass} py-3`}
            />
          </label>
        </div>
        <Button onClick={onEnter} fullWidth className="mt-7">
          Crear cuenta de prueba
          <span aria-hidden="true">→</span>
        </Button>
        <p className="mt-4 text-xs leading-5 text-muted">
          No introduzcas datos sensibles, médicos ni credenciales reales.
        </p>
        <button
          type="button"
          onClick={onLogin}
          className="mt-4 w-full text-center text-xs font-semibold text-moss transition hover:text-forest"
        >
          Ya tengo un acceso de prueba
        </button>
      </Card>
    </div>
  )
}
