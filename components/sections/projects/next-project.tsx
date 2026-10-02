"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { TransitionLink } from "@/components/motion/page-transition"
import { Reveal } from "@/components/motion/reveal"
import type { PortfolioProject } from "@/lib/projects"
import { useLanguage } from "@/contexts/language-context"

export function NextProject({ project }: { project: PortfolioProject }) {
  const { language, t } = useLanguage()
  const currentTitle = project.title[language] || project.title.en

  return (
    <Reveal className="pt-16 sm:pt-24 md:pt-56 pb-8 md:pb-12">
      <TransitionLink
        href={`/projects/${project.slug}`}
        className="group block border-t border-border pt-8 focus-visible:outline-2 focus-visible:outline-offset-8"
      >
        <p className="text-xs uppercase">({t.projects.nextProject})</p>
        <div className="mt-12 grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-heading text-[clamp(2rem,7.5vw,12rem)] leading-[0.95] font-bold uppercase transition-colors group-hover:text-primary/65 break-words">
              {currentTitle}
            </h2>
            <div className="mt-6 sm:mt-8 inline-flex items-center gap-3 rounded-full border border-primary/30 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
              <span>{t.projects.seeProject}</span>
              <ArrowUpRight className="size-4 sm:size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-primary/5">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
            />
          </div>
        </div>
      </TransitionLink>
    </Reveal>
  )
}
