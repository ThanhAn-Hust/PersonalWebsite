"use client"

import Image from "next/image"
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
    <header className="pointer-events-none fixed top-0 left-0 z-40 flex h-40 w-full items-start justify-between px-[2.4rem] pt-8 text-white mix-blend-difference">
      <TransitionLink
        href={pathname === "/" ? "#top" : "/"}
        aria-label="Le Van Thanh An — home"
        className="font-heading pointer-events-auto inline-flex items-center gap-3.5 text-[2.2rem] leading-[0.84] font-bold tracking-[0.035em] uppercase group"
        data-intro-logo
      >
        <div className="relative size-9 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-[#18181b] transition-transform duration-300 group-hover:scale-105">
          <Image src="/favicon.svg" alt="Logo" width={36} height={36} className="size-full object-cover" />
        </div>
        <div className="inline-flex flex-col">
          <span>Le Van</span>
          <span className="mt-[0.6rem] ml-[0.6rem]">Thanh An</span>
        </div>
      </TransitionLink>

      <div className="pointer-events-auto flex items-center gap-[2rem] pt-[2.4rem]">
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-[1.3rem] text-[0.95rem] font-[320]"
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

        <div className="flex items-center text-xs tracking-wider font-mono">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`px-1.5 py-0.5 transition-opacity ${language === "en" ? "font-bold opacity-100 underline underline-offset-4" : "opacity-45 hover:opacity-80"}`}
            aria-label="Switch to English"
          >
            EN
          </button>
          <span className="opacity-30">/</span>
          <button
            type="button"
            onClick={() => setLanguage("vi")}
            className={`px-1.5 py-0.5 transition-opacity ${language === "vi" ? "font-bold opacity-100 underline underline-offset-4" : "opacity-45 hover:opacity-80"}`}
            aria-label="Chuyển sang Tiếng Việt"
          >
            VI
          </button>
        </div>
      </div>
    </header>
  )
}
