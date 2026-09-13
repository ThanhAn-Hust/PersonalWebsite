"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { type Language, translations } from "@/lib/i18n"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (typeof translations)[Language]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_lang") as Language | null
      if (saved && (saved === "en" || saved === "vi")) {
        setLanguageState(saved)
        document.documentElement.lang = saved
      }
    } catch {
      // Ignore if localStorage is unavailable
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem("portfolio_lang", lang)
      document.documentElement.lang = lang
    } catch {
      // Ignore
    }
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
