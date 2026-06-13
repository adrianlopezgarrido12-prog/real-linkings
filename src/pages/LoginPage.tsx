import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'

interface LoginPageProps {
  onEnter: () => void
  onRegister: () => void
}

const inputClass =
  'mt-2 min-h-12 w-full rounded-xl border border-line bg-white/75 px-4 text-sm text-ink outline-none transition placeholder:text-muted/55 focus:border-moss focus:bg-white'

export function LoginPage({ onEnter, onRegister }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="mx-auto grid min-h-[72vh] max-w-6xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
      <div>
        <p className="eyebrow">Acceso de demostración</p>
        <h1 className="mt-4 max-w-xl font-serif text-5xl leading-tight text-forest sm:text-6xl">
          Vuelve a tu espacio relacional.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-muted">
          Este acceso solo simula el recorrido de un usuario. Ninguna
          credencial se valida ni se guarda en un servidor.
        </p>
      </div>

      <Card className="p-7 sm:p-9">
        <h2 className="font-serif text-3xl text-forest">Iniciar sesión</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Autenticación simulada para esta fase del prototipo.
        </p>
        <div className="mt-7 space-y-5">
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
            Contraseña de prueba
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="No se comprobará ni almacenará"
              className={inputClass}
            />
          </label>
        </div>
        <Button onClick={onEnter} fullWidth className="mt-7">
          Entrar al prototipo
          <span aria-hidden="true">→</span>
        </Button>
        <button
          type="button"
          onClick={onRegister}
          className="mt-5 w-full text-center text-xs font-semibold text-moss transition hover:text-forest"
        >
          Crear una cuenta de prueba
        </button>
      </Card>
    </div>
  )
}
