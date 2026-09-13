type HeroMetaProps = {
  localTime: string
}

const metaClassName =
  "absolute bottom-4 z-50 flex items-center gap-[0.45rem] text-sm font-[320] tracking-[-0.015em] uppercase"

export function HeroMeta({ localTime }: HeroMetaProps) {
  return (
    <>
      <div
        className={`${metaClassName} left-10`}
        data-intro-meta
      >
        <span>Based in Hanoi</span>
        <span aria-hidden="true">•</span>
        <time>{localTime}</time>
      </div>

      <div
        className={`${metaClassName} right-10`}
        data-intro-meta
      >
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inset-0 animate-[status-pulse_2s_linear_infinite] rounded-full bg-[#34b85a]/70 will-change-transform motion-reduce:animate-none" />
          <span className="relative size-full rounded-full bg-[#34b85a]" />
        </span>
        <span>Open to work</span>
      </div>
    </>
  )
}
