"use client"

import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePageReady } from "@/components/motion/page-transition"

gsap.registerPlugin(ScrollTrigger)

export function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const pageReady = usePageReady()
  const root = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!pageReady) return
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(root.current, { clipPath: "inset(12% 5% 12% 5%)" }, {
        clipPath: "inset(0% 0% 0% 0%)", ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 95%", end: "top 25%", scrub: 0.6 },
      })
      gsap.fromTo(root.current!.querySelector("img"), { scale: 1.15, yPercent: -4 }, {
        scale: 1.05, yPercent: 2, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
      })
    }, root)
    return () => media.revert()
  }, [src, pageReady])

  return <div ref={root} className="relative aspect-[16/10] overflow-hidden bg-primary/5"><Image src={src} alt={alt} fill sizes="100vw" className="object-cover" /></div>
}
