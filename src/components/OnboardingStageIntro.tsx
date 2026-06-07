interface OnboardingStageIntroProps {
  room: string
  title: string
  subtitle: string
  description: string
  dark?: boolean
}

export function OnboardingStageIntro({
  room,
  title,
  subtitle,
  description,
  dark = false,
}: OnboardingStageIntroProps) {
  return (
    <header className="mb-12 max-w-3xl">
      <p className={`eyebrow mb-4 ${dark ? '!text-[#c9b987]' : ''}`}>
        {room}
      </p>
      <h1
        className={`max-w-2xl font-serif text-4xl leading-tight sm:text-5xl ${
          dark ? 'text-[#f5f0e5]' : 'text-forest'
        }`}
      >
        {title}
      </h1>
      <p
        className={`mt-5 max-w-2xl font-serif text-xl italic leading-8 ${
          dark ? 'text-[#c9b987]' : 'text-clay'
        }`}
      >
        {subtitle}
      </p>
      <div
        className={`mt-7 max-w-2xl border-l pl-5 ${
          dark ? 'border-[#c9b987]/35' : 'border-moss/35'
        }`}
      >
        <p
          className={`text-sm leading-7 ${
            dark ? 'text-[#f5f0e5]/68' : 'text-muted'
          }`}
        >
          {description}
        </p>
      </div>
    </header>
  )
}
