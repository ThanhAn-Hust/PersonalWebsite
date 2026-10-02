"use client"

import { Reveal } from "@/components/motion/reveal"
import { useLanguage } from "@/contexts/language-context"

export function About() {
  const { t } = useLanguage()

  const paragraphs = [t.about.p1, t.about.p2]

  return (
    <section id="about" aria-labelledby="about-title" className="pt-28 sm:pt-36 md:pt-48 scroll-mt-24 px-4 sm:px-6 md:px-10 pb-16 md:pb-20">
      <Reveal>
        <p className="border-b border-border pb-4 sm:pb-5 text-xs sm:text-sm tracking-widest">(01)</p>
        <h2 id="about-title" className="mt-10 sm:mt-14 text-[clamp(2.25rem,6vw,7rem)] leading-none font-extrabold tracking-[-0.035em] uppercase break-words">
          {t.about.title}
        </h2>
        <p className="mt-3 sm:mt-4 text-xs tracking-wider text-foreground/55 uppercase">{t.about.subtitle}</p>
      </Reveal>
      <div className="mt-10 sm:mt-16 md:mt-20 space-y-8 sm:space-y-14 md:space-y-20 text-[clamp(1.125rem,2.2vw,2.75rem)] leading-[1.45] font-light tracking-[-0.035em]">
        {paragraphs.map((paragraph, index) => (
          <Reveal key={index} className={index === 1 ? "md:ml-[7%]" : ""}>
            <p>{paragraph}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
