"use client"

import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { TransitionLink, usePageReady } from "@/components/motion/page-transition"
import { Reveal } from "@/components/motion/reveal"
import type { PortfolioProject } from "@/lib/projects"

import { useLanguage } from "@/contexts/language-context"

gsap.registerPlugin(ScrollTrigger)

export function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const { language, t } = useLanguage()
  const pageReady = usePageReady()
  const root = useRef<HTMLElement>(null)
  const image = useRef<HTMLDivElement>(null)
  const reverse = index % 2 === 1

  const currentTitle = project.title[language]
  const currentDescription = project.description[language]
  const currentLines = project.lines[language]

  useLayoutEffect(() => {
    if (!pageReady) return
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(image.current, { clipPath: "inset(20% 0 20% 0)" }, {
        clipPath: "inset(0% 0 0% 0)", ease: "none",
        scrollTrigger: { trigger: image.current, start: "top 95%", end: "top 30%", scrub: 0.6 },
      })
      gsap.fromTo(image.current!.querySelector("img"), { scale: 1.15 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: image.current, start: "top bottom", end: "bottom top", scrub: true },
      })
    }, root)
    return () => media.revert()
  }, [pageReady])

  return (
    <article ref={root} className="pb-16 sm:pb-24 md:pb-56" aria-labelledby={`${project.slug}-title`}>
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4 sm:pt-5 text-xs uppercase md:text-sm">
          <span>({String(index + 1).padStart(2, "0")})</span>
          <span>{project.category}</span>
        </div>
        <h3 id={`${project.slug}-title`} className={`my-6 sm:my-10 text-[clamp(2.25rem,7.5vw,12rem)] leading-[0.92] font-extrabold tracking-[-0.035em] uppercase break-words ${reverse ? "md:text-right" : ""}`}>
          <TransitionLink href={`/projects/${project.slug}`} className="inline-block focus-visible:outline-2 focus-visible:outline-offset-8">
            {currentLines.map(line => <span key={line} className="block">{line}</span>)}
          </TransitionLink>
        </h3>
      </Reveal>
      <div className={`grid items-start gap-6 sm:gap-8 md:gap-12 ${reverse ? "md:grid-cols-[0.8fr_1.2fr]" : "md:grid-cols-[1.2fr_0.8fr]"}`}>
        <TransitionLink href={`/projects/${project.slug}`} aria-label={`${t.projects.viewProject} ${currentTitle}`} className={`group relative block focus-visible:outline-2 focus-visible:outline-offset-8 ${reverse ? "md:order-2" : ""}`}>
          <div ref={image} className="relative aspect-[4/3] overflow-hidden bg-primary/5">
            <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover" />
          </div>
          <span className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 flex items-center gap-3 sm:gap-4 bg-primary px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wider text-white uppercase shadow-lg transition-all duration-300 group-hover:bg-black group-hover:scale-[1.03]">
            {t.projects.viewProject} <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none" />
          </span>
        </TransitionLink>
        <Reveal className={`md:pt-4 ${reverse ? "md:order-1" : ""}`}>
          <p className="max-w-xl text-[clamp(1rem,1.5vw,2rem)] leading-relaxed font-light tracking-[-0.025em]">{currentDescription}</p>
          {project.vrSupport && <p className="mt-6 sm:mt-8 text-xs text-foreground/55 uppercase">{t.projects.supports} {project.vrSupport}</p>}
        </Reveal>
      </div>
    </article>
  )
}
