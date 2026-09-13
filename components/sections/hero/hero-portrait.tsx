import Image from "next/image"

export function HeroPortrait() {
  return (
    <div
      className="absolute top-[var(--hero-portrait-top)] left-1/2 z-20 h-[var(--hero-portrait-height)] w-[var(--hero-portrait-width)] -translate-x-1/2 overflow-hidden bg-[#d7d7d4] [will-change:clip-path]"
      data-intro-portrait
    >
      <Image
        src="/images/luca-doncic.jpeg"
        alt="Luka Doncic seated courtside"
        fill
        priority
        sizes="370px"
        className="object-cover object-center"
      />
    </div>
  )
}
