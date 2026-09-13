"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { usePageReady } from "@/components/motion/page-transition"

import { HeroLoader } from "@/components/sections/hero/hero-loader"
import { HeroMarquee } from "@/components/sections/hero/hero-marquee"
import { HeroMeta } from "@/components/sections/hero/hero-meta"
import { HeroPortrait } from "@/components/sections/hero/hero-portrait"

let introHasPlayed = false
const introSessionKey = "portfolio-intro-played"

function formatHanoiTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date())
}

export function Hero() {
  const pageReady = usePageReady()
  const rootRef = useRef<HTMLElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLParagraphElement>(null)
  const [localTime, setLocalTime] = useState("--:--:--")

  useEffect(() => {
    const updateTime = () => setLocalTime(formatHanoiTime())

    updateTime()
    const interval = window.setInterval(updateTime, 1000)

    return () => window.clearInterval(interval)
  }, [])

  useLayoutEffect(() => {
    if (!pageReady) return
    const root = rootRef.current
    const loader = loaderRef.current
    const counter = counterRef.current

    if (!root || !loader || !counter) {
      return
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    try {
      introHasPlayed ||= sessionStorage.getItem(introSessionKey) === "true"
    } catch {
      // In-memory tracking still works when browser storage is unavailable.
    }

    if (reducedMotion || introHasPlayed) {
      loader.style.display = "none"
      return
    }

    const introContent = document.querySelectorAll<HTMLElement>(
      "main > :not(:first-child), footer",
    )
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const context = gsap.context(() => {
      gsap.set(loader, { visibility: "visible" })
      const progress = { value: 0 }
      const introTargets = [
        "[data-intro-logo]",
        "[data-intro-nav]",
        "[data-intro-row]",
        "[data-intro-portrait]",
        "[data-intro-meta]",
      ]

      gsap.set(introTargets, { opacity: 0 })
      gsap.set(introContent, { opacity: 0 })

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(progress, {
          value: 100,
          duration: 1.05,
          ease: "power2.inOut",
          onUpdate: () => {
            counter.textContent = `${Math.round(progress.value)}%`
          },
        })
        .to(loader, {
          yPercent: -100,
          duration: 0.78,
          ease: "power4.inOut",
          onStart: () => {
            document.body.style.overflow = previousOverflow
          },
          onComplete: () => {
            introHasPlayed = true
            try {
              sessionStorage.setItem(introSessionKey, "true")
            } catch {
              // The intro is still remembered for client-side navigation.
            }
            loader.style.display = "none"
          },
        })
        .fromTo(
          "[data-intro-row]",
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.2",
        )
        .fromTo(
          "[data-intro-portrait]",
          { opacity: 0, clipPath: "inset(100% 0 0 0)" },
          {
            opacity: 1,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.95,
          },
          "-=0.62",
        )
        .fromTo(
          "[data-intro-logo]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.55",
        )
        .fromTo(
          "[data-intro-nav]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
          "-=0.42",
        )
        .fromTo(
          "[data-intro-meta]",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.35",
        )
        .to(introContent, {
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        })
    }, document.body)

    return () => {
      document.body.style.overflow = previousOverflow
      context.revert()
    }
  }, [pageReady])

  return (
    <section
      ref={rootRef}
      className="relative h-svh min-h-[47.5rem] overflow-hidden bg-background [--hero-portrait-height:clamp(29rem,56vh,33.5rem)] [--hero-portrait-top:27.5%] [--hero-portrait-width:clamp(20rem,21.5vw,23rem)]"
      aria-labelledby="hero-title"
    >
      <HeroLoader loaderRef={loaderRef} counterRef={counterRef} />

      <h1 id="hero-title" className="sr-only">
        Le Van Thanh An — Creative Developer
      </h1>

      <HeroMarquee />
      <HeroPortrait />
      <HeroMeta localTime={localTime} />
    </section>
  )
}
