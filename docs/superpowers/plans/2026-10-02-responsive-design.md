# Responsive Design Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure the portfolio website delivers an ultra-smooth, responsive layout across all mobile devices (from 320px screens like iPhone SE up to modern flagships), tablets, and high-resolution desktop screens without layout shifts, text clipping, or horizontal overflow.

**Architecture:** Refactor fluid typography clamps (`clamp(...)`), spacing scales, flex/grid containers, and touch-target interactive elements across navigation, hero-less about section, projects overview, project detail view, and footer. Retain the editorial brutalist/minimalist aesthetic with GSAP animations intact while preventing viewport overflow and overlapping elements on small touchscreens.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4, TypeScript, GSAP & ScrollTrigger, Lenis smooth scrolling.

## Global Constraints

- Preserve all existing animations (GSAP `matchMedia`, `ScrollTrigger`, Lenis smooth scrolling).
- Preserve bilingual dictionary bindings (`useLanguage()`).
- Header logo must remain text-only (`Le Van / Thanh An`).
- Zero horizontal overflow (`overflow-x`) on any screen width down to 320px.
- Minimum touch target area of 44x44px or comfortable spacing for clickable buttons/links on mobile.
- Build command must succeed without errors via `cmd.exe /c "npm run build"`.

---

### Task 1: Mobile-First Responsive Navigation & Site Header

**Files:**
- Modify: `components/layout/site-header.tsx:17-68`

**Interfaces:**
- Consumes: `useLanguage()`, `usePathname()`, `TransitionLink`
- Produces: Responsive site header with adaptive logo sizing, responsive padding, and clean mobile navigation.

- [ ] **Step 1: Inspect current header layout issues on mobile**
  Verify that `components/layout/site-header.tsx` has fixed `px-[2.4rem]` (77px total padding), fixed `h-40`, and large logo `text-[2.2rem]` that collide with navigation links and the language switcher on viewports under 640px.

- [ ] **Step 2: Update `components/layout/site-header.tsx` with responsive spacing and sizing**
  Refactor `site-header.tsx` to:
  - Use responsive padding: `px-4 sm:px-6 md:px-[2.4rem] pt-4 sm:pt-6 md:pt-8`.
  - Use responsive header height: `h-auto min-h-20 sm:min-h-28 md:h-40 pb-2`.
  - Use responsive logo typography: `text-lg sm:text-xl md:text-[2.2rem] leading-[0.84]` with `ml-1.5 sm:ml-[1.05rem]`.
  - Use responsive container and nav spacing: `gap-2 sm:gap-4 md:gap-[2rem] pt-1 sm:pt-2 md:pt-[2.4rem]`.
  - Navigation links: `gap-2 sm:gap-3 md:gap-[1.3rem] text-xs sm:text-sm md:text-[0.95rem]`.
  - Language switcher: Compact, touch-friendly padding `px-2 py-1 text-[11px] sm:text-xs`.

```tsx
"use client"

import { usePathname } from "next/navigation"
import { TransitionLink } from "@/components/motion/page-transition"
import { useLanguage } from "@/contexts/language-context"

export function SiteHeader() {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  const navigation = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#contact", label: t.nav.contact },
  ]

  return (
    <header className="pointer-events-none fixed top-0 left-0 z-40 flex w-full items-start justify-between px-4 pt-4 sm:px-6 sm:pt-6 md:px-[2.4rem] md:pt-8 text-white mix-blend-difference">
      <TransitionLink
        href={pathname === "/" ? "#top" : "/"}
        aria-label="Le Van Thanh An — home"
        className="font-heading pointer-events-auto inline-flex flex-col text-lg sm:text-xl md:text-[2.2rem] leading-[0.84] font-bold tracking-[0.035em] uppercase"
        data-intro-logo
      >
        <span>Le Van</span>
        <span className="mt-[0.35rem] ml-1.5 sm:mt-[0.5rem] sm:ml-[0.8rem] md:mt-[0.6rem] md:ml-[1.05rem]">
          Thanh An
        </span>
      </TransitionLink>

      <div className="pointer-events-auto flex items-center gap-2 sm:gap-4 md:gap-[2rem] pt-1 sm:pt-2 md:pt-[2.4rem]">
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-2 sm:gap-3 md:gap-[1.3rem] text-xs sm:text-sm md:text-[0.95rem] font-[320]"
        >
          {navigation.map((item) => (
            <TransitionLink
              key={item.href}
              href={pathname === "/" ? item.href : `/${item.href}`}
              className="relative leading-none after:absolute after:inset-x-0 after:-bottom-[0.35rem] after:h-px after:origin-right after:scale-x-0 after:bg-current after:content-[''] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100"
              data-intro-nav
            >
              {item.label}
            </TransitionLink>
          ))}
        </nav>

        <div className="flex items-center text-[11px] sm:text-xs tracking-wider font-mono">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`px-1.5 py-1 transition-opacity ${language === "en" ? "font-bold opacity-100 underline underline-offset-4" : "opacity-45 hover:opacity-80"}`}
            aria-label="Switch to English"
          >
            EN
          </button>
          <span className="opacity-30">/</span>
          <button
            type="button"
            onClick={() => setLanguage("vi")}
            className={`px-1.5 py-1 transition-opacity ${language === "vi" ? "font-bold opacity-100 underline underline-offset-4" : "opacity-45 hover:opacity-80"}`}
            aria-label="Chuyển sang Tiếng Việt"
          >
            VI
          </button>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Run typecheck and build to verify**
  Run: `cmd.exe /c "npm run typecheck"`
  Expected: Exit code 0 with 0 errors.

- [ ] **Step 4: Commit changes**
  ```bash
  git add components/layout/site-header.tsx
  git commit -m "feat(responsive): make site header and navigation adaptive to mobile viewports"
  ```

---

### Task 2: Responsive Typography & Layout for About & Services Sections

**Files:**
- Modify: `components/sections/about.tsx:12-27`
- Modify: `components/sections/services.tsx:23-45`

**Interfaces:**
- Consumes: `useLanguage()`, `Reveal`, `ScrollWords`, `Button`
- Produces: Fully responsive About and Services sections with comfortable font sizing and spacing on mobile.

- [ ] **Step 1: Optimize `components/sections/about.tsx` for small screens**
  - Adjust section padding: `pt-28 sm:pt-36 md:pt-48 scroll-mt-24 px-4 sm:px-6 md:px-10 pb-16 md:pb-20`.
  - Adjust title clamp: `text-[clamp(2.25rem,6vw,7rem)] break-words`.
  - Adjust paragraph typography clamp: Change `clamp(1.5rem,2.4vw,2.75rem)` (which had a huge 24px floor) to `clamp(1.125rem,2.2vw,2.75rem)` with responsive spacing `mt-10 sm:mt-16 md:mt-20 space-y-8 sm:space-y-12 md:space-y-20`.

```tsx
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
```

- [ ] **Step 2: Optimize `components/sections/services.tsx` for small screens**
  - Adjust section padding: `px-4 sm:px-6 md:px-10 pb-28 md:pb-64`.
  - Adjust quote font clamp: `text-[clamp(1.25rem,3vw,4rem)] break-words`.
  - Adjust heading margin: `mt-20 sm:mt-32 md:mt-48`.
  - Adjust accordion button font clamp: `text-[clamp(1.75rem,5vw,6.5rem)] break-words leading-none`.
  - Adjust description padding and font size: `pt-2 pb-6 text-sm sm:text-base md:text-xl`.
  - Adjust outro container margin and typography: `mt-14 sm:mt-20 md:mt-28 text-base sm:text-lg md:text-xl`.

```tsx
"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Reveal, ScrollWords } from "@/components/motion/reveal"
import { useLanguage } from "@/contexts/language-context"

export function Services() {
  const [active, setActive] = useState<number | null>(null)
  const { language, t } = useLanguage()

  const quote = language === "vi" 
    ? "Một trải nghiệm số xuất sắc luôn mang lại cảm xúc chân thực. Tôi kết hợp giữa tư duy thiết kế và kỹ thuật lập trình để tạo ra những tác phẩm có góc nhìn rõ rệt. Hãy cùng nhau tạo nên những điều thực sự đáng nhớ."
    : "Good digital experiences make you feel something. I bring design and development together to create work with a clear point of view. From a bold first impression to a thoughtful final detail, every part should feel connected. Let’s make something worth spending time with."

  const outro = language === "vi"
    ? "Tôi là một người luôn tò mò, thích khám phá cả khía cạnh thị giác lẫn kỹ thuật của dự án. Tôi thích lắng nghe, đặt đúng câu hỏi và biến ý tưởng chung thành một sản phẩm chỉn chu từ đầu đến cuối."
    : "I’m a curious maker who enjoys both the visual and technical sides of a project. I like working closely with people, asking the right questions, and turning a shared idea into an experience that feels considered from start to finish."

  return (
    <section aria-labelledby="services-title" className="overflow-hidden px-4 sm:px-6 md:px-10 pb-28 md:pb-64">
      <ScrollWords text={quote} className="max-w-[1450px] text-[clamp(1.25rem,3vw,4rem)] leading-[1.35] font-medium tracking-[-0.035em] break-words" />
      <Reveal className="mt-20 sm:mt-32 md:mt-48">
        <h2 id="services-title" className="mb-8 sm:mb-12 text-xs sm:text-sm uppercase">({t.services.heading})</h2>
      </Reveal>
      {t.services.items.map((service, index) => {
        const open = active === index
        return (
          <Reveal key={service.title} className={index % 2 ? "text-right" : index === 2 ? "md:ml-[8%]" : ""}>
            <Button variant="ghost" aria-expanded={open} aria-controls={`service-${index}`} onClick={() => setActive(open ? null : index)} className="group h-auto max-w-full justify-start gap-2.5 sm:gap-3 rounded-none px-0 py-3 sm:py-4 text-[clamp(1.75rem,5vw,6.5rem)] leading-none font-extrabold tracking-[-0.035em] whitespace-normal uppercase hover:bg-transparent hover:text-primary/65 focus-visible:ring-2 focus-visible:ring-primary md:gap-6 break-words text-left">
              <span>{service.title}</span>
              <span className="inline-flex items-center gap-1 font-light shrink-0">(<Plus aria-hidden="true" className={`size-4 sm:size-5 transition-transform duration-500 md:size-10! ${open ? "rotate-45" : ""}`} />)</span>
            </Button>
            <div id={`service-${index}`} inert={!open} onTransitionEnd={(event) => { if (event.propertyName === "grid-template-rows") ScrollTrigger.refresh() }} className={`grid transition-[grid-template-rows,opacity] duration-500 motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden"><p className="pt-2 pb-6 text-sm sm:text-base md:text-xl leading-relaxed font-light">{service.desc}</p></div>
            </div>
          </Reveal>
        )
      })}
      <Reveal className="mt-14 sm:mt-20 md:mt-28 ml-auto max-w-lg">
        <p className="text-base sm:text-lg md:text-xl leading-relaxed font-light tracking-[-0.02em]">{outro}</p>
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 3: Run typecheck to verify**
  Run: `cmd.exe /c "npm run typecheck"`
  Expected: Exit code 0.

- [ ] **Step 4: Commit changes**
  ```bash
  git add components/sections/about.tsx components/sections/services.tsx
  git commit -m "feat(responsive): tune typography scales and spacing in About and Services"
  ```

---

### Task 3: Responsive Project Cards & Projects Overview

**Files:**
- Modify: `components/sections/project.tsx:12-20`
- Modify: `components/sections/projects/project-card.tsx:44-71`

**Interfaces:**
- Consumes: `PortfolioProject`, `useLanguage()`, `usePageReady()`, `TransitionLink`
- Produces: Project cards that fit cleanly on mobile without clipping giant text or overflowing thumbnails.

- [ ] **Step 1: Update `components/sections/project.tsx`**
  - Responsive padding: `px-4 sm:px-6 md:px-10`.
  - Responsive min-height and padding for the scroll prompt: `py-16 sm:py-24 md:py-32 min-h-[45svh] sm:min-h-[60svh] md:min-h-[75svh]`.
  - Responsive title clamp: `text-[clamp(2.5rem,6vw,7rem)]`.

```tsx
"use client"

import { Reveal } from "@/components/motion/reveal"
import { ProjectCard } from "@/components/sections/projects/project-card"
import { projects } from "@/lib/projects"
import { useLanguage } from "@/contexts/language-context"

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20 px-4 sm:px-6 md:px-10">
      <div className="flex min-h-[45svh] sm:min-h-[60svh] md:min-h-[75svh] flex-col items-center justify-center gap-6 sm:gap-8 py-16 sm:py-24 md:py-32 text-center">
        <Reveal>
          <h2 id="projects-title" className="text-[clamp(2.5rem,6vw,7rem)] leading-none font-extrabold tracking-[-0.035em] uppercase break-words">{t.projects.heading}</h2>
          <p className="mt-6 sm:mt-8 text-xs tracking-wider text-foreground/55 uppercase">{t.projects.scrollPrompt}</p>
        </Reveal>
      </div>
      {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
    </section>
  )
}
```

- [ ] **Step 2: Update `components/sections/projects/project-card.tsx`**
  - Change article padding: `pb-16 sm:pb-24 md:pb-56`.
  - Fix giant project titles on small screens: Change `text-[clamp(3.5rem,10vw,12rem)]` (56px floor) to `text-[clamp(2.25rem,7.5vw,12rem)] leading-[0.92] break-words`.
  - Optimize and enlarge the "View Project" button: Change from tiny `text-xs px-5 py-4` to a prominent, tactile badge `px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wider text-white bg-primary shadow-md hover:bg-black group-hover:scale-105 transition-all duration-300`.
  - Adjust description typography: `text-[clamp(1rem,1.5vw,2rem)]`.

```tsx
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
```

- [ ] **Step 3: Run typecheck to verify**
  Run: `cmd.exe /c "npm run typecheck"`
  Expected: Exit code 0.

- [ ] **Step 4: Commit changes**
  ```bash
  git add components/sections/project.tsx components/sections/projects/project-card.tsx
  git commit -m "feat(responsive): optimize project cards and enlarge view project button"
  ```

---

### Task 4: Responsive Project Detail Page & Prominent Experience CTAs

**Files:**
- Modify: `app/projects/[slug]/page.tsx:31-38`
- Modify: `components/sections/projects/project-title.tsx:28-34`
- Modify: `components/sections/projects/project-info.tsx:31-66`
- Modify: `components/sections/projects/next-project.tsx:15-43`

**Interfaces:**
- Consumes: Project metadata, `useLanguage()`, `usePageReady()`
- Produces: Seamless project detail pages with adaptive title sizing, stacked meta grids on mobile, prominent experience CTA buttons, and responsive next-project cards.

- [ ] **Step 1: Update `app/projects/[slug]/page.tsx`**
  - Responsive padding: `px-4 sm:px-6 md:px-10 pb-16 md:pb-24`.
  - Hero container: `min-h-[50svh] sm:min-h-[70svh] md:min-h-[92svh] pt-28 sm:pt-36 md:pt-44 pb-8 md:pb-4`.

- [ ] **Step 2: Update `components/sections/projects/project-title.tsx`**
  - Change `text-[clamp(5rem,13vw,15rem)]` (which had an 80px min floor causing overflow of words like "MULTIPLAYER") to `text-[clamp(2.25rem,10vw,15rem)] break-words leading-[0.92]`.
  - Ensure word wrapper allows wrapping: `flex flex-wrap gap-x-[0.15em] break-words`.

```tsx
  return (
    <h1 ref={root} aria-label={currentTitle} className="font-heading text-[clamp(2.25rem,10vw,15rem)] leading-[0.92] font-bold tracking-[0.005em] uppercase break-words">
      <span aria-hidden="true" className="flex flex-wrap gap-x-[0.18em]">
        {currentTitle.split(" ").map((word, index) => (
          <span key={index} className="inline-flex overflow-hidden pb-[0.08em] break-words">
            {Array.from(word).map((letter, i) => (
              <span key={i} data-letter className="inline-block">
                {letter}
              </span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  )
```

- [ ] **Step 3: Update `components/sections/projects/project-info.tsx` with prominent experience CTA buttons**
  - Replace rigid `grid-cols-[0.8fr_1.5fr_1fr]` with a responsive grid: `grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-10`.
  - Upgrade tiny underlined text links into prominent, tactile experience CTA buttons (e.g. `PLAY ON WEB ↗`, `UNITY PLAY ↗`) with solid primary and distinct outline styling, rounded-full pill shape, hover elevation, and clear icons.

```tsx
  return (
    <Reveal className="grid items-start gap-8 py-8 sm:gap-10 sm:py-10 md:grid-cols-2 md:gap-20 md:py-12">
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-sm sm:text-base font-light md:max-w-[34rem] md:gap-10">
        {details.map(({ label, value }) => (
          <div key={label} className={label === t.projects.status ? "col-span-2 sm:col-span-1" : ""}>
            <dt className="text-[0.75rem] sm:text-[0.8rem] tracking-[0.16em] uppercase text-foreground/60">{label}</dt>
            <dd className="mt-2 sm:mt-3 leading-relaxed font-normal">{value}</dd>
          </div>
        ))}
      </dl>
      <div>
        <h2 className="sr-only">{t.projects.aboutTheProject}</h2>
        <p className="text-sm sm:text-base leading-[1.75] font-light tracking-[-0.02em] text-foreground/80 md:text-[1.05rem]">
          {project.description[language] || project.description.en}
        </p>
        {project.vrSupport && (
          <p className="mt-4 text-xs sm:text-sm leading-relaxed font-light text-foreground/65">
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
                className={`inline-flex items-center gap-2.5 rounded-full px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 ${
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
```

- [ ] **Step 4: Update `components/sections/projects/next-project.tsx`**
  - Adjust padding: `pt-16 sm:pt-24 md:pt-56 pb-8 md:pb-12`.
  - Adjust heading font clamp: Change `clamp(4rem,10vw,12rem)` to `clamp(2rem,7.5vw,12rem) break-words leading-[0.95]`.
  - Upgrade CTA button into a stylish pill button.

```tsx
  return (
    <Reveal className="pt-16 sm:pt-24 md:pt-56 pb-8 md:pb-12">
      <TransitionLink
        href={`/projects/${project.slug}`}
        className="group block border-t border-border pt-6 sm:pt-8 focus-visible:outline-2 focus-visible:outline-offset-8"
      >
        <p className="text-xs uppercase text-foreground/60">({t.projects.nextProject})</p>
        <div className="mt-8 sm:mt-12 grid items-center gap-6 sm:gap-10 md:grid-cols-[1.5fr_1fr]">
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
```

- [ ] **Step 5: Run typecheck to verify**
  Run: `cmd.exe /c "npm run typecheck"`
  Expected: Exit code 0.

- [ ] **Step 6: Commit changes**
  ```bash
  git add app/projects/[slug]/page.tsx components/sections/projects/project-title.tsx components/sections/projects/project-info.tsx components/sections/projects/next-project.tsx
  git commit -m "feat(responsive): make project detail page fully responsive on mobile devices"
  ```

---

### Task 5: Responsive Footer & Global Viewport Safety

**Files:**
- Modify: `components/sections/footer.tsx:35-136`
- Modify: `app/layout.tsx:43`

**Interfaces:**
- Consumes: `portfolio`, `useLanguage()`, `handleCopyEmail`
- Produces: Compact, mobile-friendly footer with responsive hero CTA and safe viewport wrapping.

- [ ] **Step 1: Update `components/sections/footer.tsx`**
  - Section padding: `px-4 sm:px-6 md:px-10 pt-24 sm:pt-32 md:pt-[24vh] pb-6`.
  - Fix giant "LIÊN HỆ / LET'S TALK" headline on mobile: Change `clamp(6rem,16vw,20rem)` (96px floor!) to `clamp(2.5rem,13vw,20rem) break-words leading-[0.92]`.
  - Arrow icon: `size-6 sm:size-10 md:size-24`.
  - Email copy button:
    - Change email text to `text-[clamp(1.1rem,2.5vw,3rem)] break-all sm:break-normal`.
    - Ensure copy button flex wraps cleanly on screens <= 360px without pushing offscreen.
  - Social links & location: `flex-col sm:flex-row items-start sm:items-end`.
  - Bottom bar: `flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] sm:text-xs`.

```tsx
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="relative flex min-h-svh scroll-mt-0 flex-col justify-between bg-[#0d0d0d] px-4 pt-24 pb-6 text-white sm:px-6 sm:pt-32 md:px-10 md:pt-[24vh]"
    >
      <div>
        <Reveal>
          <p className="max-w-3xl text-xs leading-relaxed tracking-[0.12em] text-white/65 uppercase">
            {t.footer.tagline}
          </p>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="group mt-6 sm:mt-8 inline-flex items-center gap-4 sm:gap-8 text-left focus-visible:outline-2 focus-visible:outline-offset-8"
          >
            <h2
              id="contact-title"
              className="font-heading text-[clamp(2.5rem,13vw,20rem)] leading-[0.92] font-bold tracking-[0.005em] uppercase break-words"
            >
              {t.footer.heading}
            </h2>
            <ArrowUpRight
              aria-hidden="true"
              className="size-6 sm:size-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 motion-reduce:transform-none md:size-24"
            />
          </button>
        </Reveal>

        <div className="mt-12 sm:mt-16 flex flex-wrap items-start justify-between gap-6 sm:gap-8 border-t border-white/20 pt-6 sm:pt-8">
          <div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="group flex flex-wrap items-center gap-3 sm:gap-4 text-left transition-opacity hover:opacity-80"
              aria-label={t.footer.clickToCopy}
            >
              <span className="text-[clamp(1.1rem,2.5vw,3rem)] font-light tracking-[-0.035em] break-all sm:break-normal">
                {portfolio.email}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 ${
                  copied
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-white/10 text-white/70 border border-white/10 group-hover:bg-white/20"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="size-3" />
                    <span>{t.footer.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>{t.footer.clickToCopy}</span>
                  </>
                )}
              </span>
            </button>
            <p className="mt-2 sm:mt-3 text-xs text-white/45 uppercase">{t.footer.emailSubtitle}</p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2 sm:gap-3">
            <p className="text-base sm:text-lg font-light text-white/65 md:text-2xl">{portfolio.location}</p>
            <div className="flex items-center gap-4 sm:gap-5 pt-1 sm:pt-2">
              <a
                href={portfolio.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span>GitHub</span>
              </a>
              <span className="text-white/20">·</span>
              <a
                href={portfolio.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 sm:mt-32 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 border-t border-white/15 pt-6 text-[11px] sm:text-xs tracking-wide text-white/60 uppercase">
        <p>
          © {new Date().getFullYear()} {portfolio.name}. {t.footer.rights}
        </p>
        <a href="#top" className="hover:text-white transition-colors">
          {t.footer.backToTop}
        </a>
        <p>{t.footer.credit}</p>
      </div>
    </footer>
```

- [ ] **Step 2: Update `app/layout.tsx` for robust mobile viewport boundaries**
  Verify and update body className in `app/layout.tsx` to:
  `className="m-0 min-w-[320px] max-w-full overflow-x-hidden bg-background font-sans text-foreground [text-rendering:optimizeLegibility] selection:bg-foreground selection:text-background"`

- [ ] **Step 3: Run full production build verification**
  Run: `cmd.exe /c "npm run build"`
  Expected: Next.js static export finishes successfully with 0 errors and all pages statically generated.

- [ ] **Step 4: Commit changes**
  ```bash
  git add components/sections/footer.tsx app/layout.tsx
  git commit -m "feat(responsive): make footer and viewport layout responsive across all screen sizes"
  ```

---

## Self-Review Checklist

- **Spec coverage:** All sections (Site Header, About, Services, Projects Overview, Project Detail, Footer, Layout) are covered with explicit responsive styling and typography clamp adjustments.
- **No placeholders:** Every task contains concrete code blocks, exact file paths, explicit CLI commands, and expected results.
- **Type consistency:** All interfaces and props match existing codebase types (`PortfolioProject`, `useLanguage()`, etc.).
