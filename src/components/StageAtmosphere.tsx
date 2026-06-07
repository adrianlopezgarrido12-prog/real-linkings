import type { ReactNode } from 'react'

interface StageAtmosphereProps {
  children: ReactNode
}

export function StageAtmosphere({ children }: StageAtmosphereProps) {
  return (
    <div className="onboarding-panel relative h-full overflow-x-hidden overflow-y-auto px-4 py-3 sm:px-7 sm:py-5 lg:px-10 lg:py-7">
      <div className="stage-content relative z-10 h-full">{children}</div>
    </div>
  )
}
