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
    <Reveal className="pt-32 pb-12 md:pt-56">
      <TransitionLink
        href={`/projects/${project.slug}`}
        className="group block border-t border-border pt-8 focus-visible:outline-2 focus-visible:outline-offset-8"
      >
        <p className="text-xs uppercase">({t.projects.nextProject})</p>
        <div className="mt-12 grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-heading text-[clamp(4rem,10vw,12rem)] leading-[0.95] font-bold uppercase transition-colors group-hover:text-primary/65">
              {currentTitle}
            </h2>
            <p className="mt-8 flex items-center gap-4 text-xs uppercase">
              {t.projects.seeProject}{" "}
              <ArrowUpRight className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none" />
            </p>
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
