"use client"

import { useLayoutEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePageReady } from "@/components/motion/page-transition"

gsap.registerPlugin(ScrollTrigger)

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const pageReady = usePageReady()
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!pageReady) return
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(ref.current, {
        y: 48,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 92%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        },
      })
    })
    return () => media.revert()
  }, [pageReady])

  return <div ref={ref} className={className}>{children}</div>
}

export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const pageReady = usePageReady()
  const ref = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    if (!pageReady) return
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(ref.current!.querySelectorAll("[data-word]"), { opacity: 0.18 }, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true },
      })
    })
    return () => media.revert()
  }, [pageReady])

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, index) => <span key={index} data-word>{word} </span>)}
      </span>
    </p>
  )
}
