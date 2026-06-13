import type { ReactNode } from 'react'
import type { AppPage } from '../types'

interface AppLayoutProps {
  children: ReactNode
  currentPage: AppPage
  authenticated: boolean
  onNavigate: (page: AppPage) => void
  onLogout: () => void
  minimal?: boolean
}

export function AppLayout({
  children,
  currentPage,
  authenticated,
  onNavigate,
  onLogout,
  minimal = false,
}: AppLayoutProps) {
  return (
    <div className={minimal ? 'h-[100dvh] overflow-hidden' : 'min-h-screen'}>
      <header className={`relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10 ${
        minimal ? 'h-[5.25rem] py-4' : 'py-6'
      }`}>
        <button
          type="button"
          onClick={() => onNavigate('landing')}
          className="group flex items-center gap-3 text-left"
          aria-label="Ir al inicio"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-forest/15 bg-white/60 shadow-[0_8px_24px_rgba(76,122,165,0.1)] backdrop-blur-md">
            <svg
              viewBox="0 0 32 32"
              className="size-5 text-forest"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M9 20c3.5 0 4.5-8 8-8s3.5 7 6 7" />
              <path d="M8 11c2.8 0 4.4 3.2 5.8 6.2C15.2 20.3 16.5 23 20 23" />
              <circle cx="8" cy="11" r="2" />
              <circle cx="23" cy="19" r="2" />
            </svg>
          </span>
          <span>
            <span className="block font-serif text-lg leading-none text-forest">
              Real Linkings
            </span>
            <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              vínculos con sentido
            </span>
          </span>
        </button>

        {!minimal && (
          <nav className="hidden items-center gap-7 text-xs font-medium text-muted md:flex">
            {authenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className={`transition hover:text-forest ${
                    currentPage === 'dashboard' ? 'text-forest' : ''
                  }`}
                >
                  Mi espacio
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('relationship-map')}
                  className={`transition hover:text-forest ${
                    currentPage === 'relationship-map' ? 'text-forest' : ''
                  }`}
                >
                  Mi mapa
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('matches')}
                  className={`transition hover:text-forest ${
                    currentPage === 'matches' ? 'text-forest' : ''
                  }`}
                >
                  Posibilidades
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('library')}
                  className={`transition hover:text-forest ${
                    currentPage === 'library' ? 'text-forest' : ''
                  }`}
                >
                  Biblioteca
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex size-9 items-center justify-center rounded-full bg-forest text-xs font-semibold text-paper"
                  aria-label="Cerrar sesión"
                  title="Cerrar sesión"
                >
                  A
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="transition hover:text-forest"
                >
                  Iniciar sesión
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="rounded-full bg-forest px-5 py-2.5 font-semibold text-paper shadow-[0_10px_25px_rgba(36,75,114,0.16)] transition hover:bg-[#315e8c]"
                >
                  Crear cuenta
                </button>
              </>
            )}
          </nav>
        )}
      </header>

      <main>{children}</main>

      {!minimal && (
        <footer className="mx-auto mt-20 flex max-w-7xl flex-col gap-4 border-t border-line px-5 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>Real Linkings · Menos ruido. Más atención a lo que importa.</p>
          <p>Una herramienta para conocerte y elegir con más conciencia.</p>
        </footer>
      )}
    </div>
  )
}
