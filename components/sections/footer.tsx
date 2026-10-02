"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Copy } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { portfolio } from "@/lib/portfolio"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(portfolio.email)
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = portfolio.email
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
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
  )
}
