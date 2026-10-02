"use client"

import { ArrowUpRight } from "lucide-react"
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
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-sm sm:text-base font-light md:max-w-[34rem] md:gap-10">
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
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          {project.links.map((link, idx) => {
            const isPrimary = idx === 0 || link.type === "playWeb" || link.type === "website"
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-2.5 rounded-full px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  isPrimary
                    ? "bg-primary text-white shadow-md hover:bg-black hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    : "border-2 border-primary/20 bg-background text-foreground hover:border-primary hover:bg-primary/5 hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                <span>{getLinkLabel(link.type)}</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )
          })}
        </div>
      </div>
    </Reveal>
  )
}
