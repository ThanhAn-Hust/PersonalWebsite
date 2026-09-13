const wordsPerGroup = 18

const rows = [
  "animate-[marquee-left_25s_linear_infinite]",
  "animate-[marquee-right_28s_linear_infinite]",
  "animate-[marquee-left_25s_linear_infinite]",
]

function MarqueeGroup() {
  return (
    <span className="flex flex-none">
      {Array.from({ length: wordsPerGroup }).map((_, index) => (
        <span
          className="font-heading inline-block flex-none pr-[0.14em] text-[clamp(12rem,17vw,20rem)] leading-[0.78] font-bold tracking-[-0.0035em] uppercase"
          key={index}
        >
          GOAT
        </span>
      ))}
    </span>
  )
}

export function HeroMarquee() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-[15vh] bottom-[6vh] grid grid-rows-3"
      aria-hidden="true"
    >
      {rows.map((animation, index) => (
        <div
          className={`relative flex min-w-0 items-center overflow-hidden ${
            index === 1 ? "z-10 text-primary" : "z-30 text-black"
          }`}
          data-intro-row
          key={index}
        >
          <div
            className={`flex w-max flex-none will-change-transform motion-reduce:paused ${animation}`}
          >
            <MarqueeGroup />
            <MarqueeGroup />
          </div>
        </div>
      ))}
    </div>
  )
}
