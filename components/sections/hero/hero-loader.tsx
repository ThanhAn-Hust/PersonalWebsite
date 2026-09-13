import type { RefObject } from "react"

type HeroLoaderProps = {
  loaderRef: RefObject<HTMLDivElement | null>
  counterRef: RefObject<HTMLParagraphElement | null>
}

export function HeroLoader({
  loaderRef,
  counterRef,
}: HeroLoaderProps) {
  return (
    <div
      ref={loaderRef}
      className="invisible fixed inset-0 z-[100] flex items-end bg-[#090909] text-white will-change-transform"
      aria-hidden="true"
    >
      <div className="font-heading px-[2.4rem] pb-8 text-[clamp(2.8rem,4vw,5rem)] leading-[0.86] font-bold tracking-[0.005em] uppercase">
        <p className="m-0">This loading screen is here for the aesthetics.</p>
        <p ref={counterRef} className="mt-[1.7rem] mb-0 text-[1.25em]">
          0%
        </p>
      </div>
    </div>
  )
}
