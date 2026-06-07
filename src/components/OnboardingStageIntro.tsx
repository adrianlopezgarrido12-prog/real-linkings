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
    <header className="mb-12 max-w-4xl sm:mb-16">
      <p className={`eyebrow mb-4 ${dark ? '!text-[#c9b987]' : ''}`}>
        {room}
      </p>
      <h1
        className={`max-w-3xl text-balance font-serif text-4xl leading-[1.05] tracking-[-0.02em] sm:text-6xl ${
          dark ? 'text-[#f5f0e5]' : 'text-forest'
        }`}
      >
        {title}
      </h1>
      <p
        className={`mt-6 max-w-2xl font-serif text-xl italic leading-8 sm:text-2xl ${
          dark ? 'text-[#c9b987]' : 'text-clay'
        }`}
      >
        {subtitle}
      </p>
      <div
        className={`mt-8 max-w-2xl border-l pl-5 sm:pl-7 ${
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
