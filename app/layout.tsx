import type { Metadata } from "next"
import localFont from "next/font/local"
import { PageTransition } from "@/components/motion/page-transition"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { SiteHeader } from "@/components/layout/site-header"
import { portfolio } from "@/lib/portfolio"

import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"

const asapSharp = localFont({
  src: "./fonts/asap-sharp-latin.woff2",
  variable: "--font-asap-sharp",
  display: "swap",
  weight: "100 900",
})

const humane = localFont({
  src: "./fonts/humane-bold.otf",
  variable: "--font-humane",
  display: "swap",
  weight: "700",
})

export const metadata: Metadata = {
  title: { default: `${portfolio.name} — Creative Developer`, template: `%s — ${portfolio.name}` },
  description: "Design, development, and digital experiences. The portfolio of Le Van Thanh An, based in Hanoi, Vietnam.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${asapSharp.variable} ${humane.variable} scroll-auto bg-background`}
    >
      <body className="m-0 min-w-80 overflow-x-clip bg-background font-sans text-foreground [text-rendering:optimizeLegibility] selection:bg-foreground selection:text-background">
        <LanguageProvider>
          <PageTransition>
            <SmoothScroll />
            <SiteHeader />
            {children}
          </PageTransition>
        </LanguageProvider>
      </body>
    </html>
  )
}
