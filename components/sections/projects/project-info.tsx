"use client"

import { Reveal } from "@/components/motion/reveal"
import type { PortfolioProject } from "@/lib/projects"
import { useLanguage } from "@/contexts/language-context"

export function ProjectInfo({ project }: { project: PortfolioProject }) {
  const { language, t } = useLanguage()

  const details = [
    { label: t.projects.year, value: project.year },
    { label: t.projects.role, value: project.role[language] || project.role.en },
    { label: t.projects.status, value: project.status[language] || project.status.en },
  ]

  const getLinkLabel = (type: "playWeb" | "playUnity" | "website" | "github") => {
    switch (type) {
      case "playWeb":
        return t.projects.playWeb
      case "playUnity":
        return t.projects.playUnity
      case "website":
        return t.projects.seeProject
      case "github":
        return t.projects.viewSource
      default:
        return t.projects.seeProject
    }
  }

  return (
    <Reveal className="grid items-start gap-10 py-10 md:grid-cols-2 md:gap-20 md:py-12">
      <dl className="grid grid-cols-[0.8fr_1.5fr_1fr] gap-5 text-base font-light md:max-w-[34rem] md:gap-10">
        {details.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-[0.8rem] tracking-[0.16em] uppercase">{label}</dt>
            <dd className="mt-3 leading-relaxed">{value}</dd>
          </div>
        ))}
      </dl>
      <div>
        <h2 className="sr-only">{t.projects.aboutTheProject}</h2>
        <p className="text-base leading-[1.75] font-light tracking-[-0.02em] text-foreground/80 md:text-[1.05rem]">
          {project.description[language] || project.description.en}
        </p>
        {project.vrSupport && (
          <p className="mt-4 text-base leading-relaxed font-light text-foreground/65">
            {t.projects.supportedDevices}: {project.vrSupport}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.1em] uppercase underline underline-offset-4 transition-colors hover:text-primary/60 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {getLinkLabel(link.type)} ↗
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
