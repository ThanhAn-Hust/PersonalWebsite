"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePathname } from "next/navigation"
import { setPageScroller } from "@/lib/page-scroll"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  const pathname = usePathname()
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ anchors: true, duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9 })
      setPageScroller(lenis)
      lenis.on("scroll", ScrollTrigger.update)
      const animate = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(animate)
      return () => {
        setPageScroller(null)
        gsap.ticker.remove(animate)
        lenis.destroy()
      }
    })
    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => {
      disposed = true
      media.revert()
    }
  }, [pathname])

  return null
}
