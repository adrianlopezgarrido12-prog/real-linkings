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
    <header className="mb-7 max-w-4xl sm:mb-9">
      <p className={`eyebrow mb-4 ${dark ? '!text-[#b8d5ff]' : ''}`}>
        {room}
      </p>
      <h1
        className={`max-w-3xl text-balance font-serif text-3xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl ${
          dark ? 'text-[#f7fbff]' : 'text-forest'
        }`}
      >
        {title}
      </h1>
      <p
        className={`mt-4 max-w-2xl font-serif text-lg italic leading-7 sm:text-xl sm:leading-8 ${
          dark ? 'text-[#b8d5ff]' : 'text-clay'
        }`}
      >
        {subtitle}
      </p>
      <div
        className={`mt-5 max-w-2xl border-l pl-5 sm:pl-6 ${
          dark ? 'border-[#b8d5ff]/35' : 'border-moss/35'
        }`}
      >
        <p
          className={`text-sm leading-7 ${
            dark ? 'text-[#f7fbff]/68' : 'text-muted'
          }`}
        >
          {description}
        </p>
      </div>
    </header>
  )
}
