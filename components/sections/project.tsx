"use client"

import { Reveal } from "@/components/motion/reveal"
import { ProjectCard } from "@/components/sections/projects/project-card"
import { projects } from "@/lib/projects"
import { useLanguage } from "@/contexts/language-context"

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20 px-6 md:px-10">
      <div className="flex min-h-[75svh] flex-col items-center justify-center gap-8 py-32 text-center">
        <Reveal>
          <h2 id="projects-title" className="text-[clamp(3rem,6vw,7rem)] leading-none font-extrabold tracking-[-0.035em] uppercase">{t.projects.heading}</h2>
          <p className="mt-8 text-xs tracking-wider text-foreground/55 uppercase">{t.projects.scrollPrompt}</p>
        </Reveal>
      </div>
      {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
    </section>
  )
}
