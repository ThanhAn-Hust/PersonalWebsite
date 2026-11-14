import type { Metadata } from "next"
import localFont from "next/font/local"
import { PageTransition } from "@/components/motion/page-transition"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { SiteHeader } from "@/components/layout/site-header"
import { portfolio, siteUrl } from "@/lib/portfolio"

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

const siteTitle = `${portfolio.nameVi} (${portfolio.name}) — ${portfolio.jobTitle}`
const siteDescription =
  "Portfolio của Lê Văn Thành An (Le Van Thanh An) — Creative Developer tại Hà Nội. Web, game Unity, VR và trải nghiệm số tương tác. Design, development, and digital experiences."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s — ${portfolio.nameVi}` },
  description: siteDescription,
  applicationName: portfolio.nameVi,
  authors: [{ name: portfolio.nameVi, url: siteUrl }],
  creator: portfolio.nameVi,
  keywords: [
    "Lê Văn Thành An",
    "Le Van Thanh An",
    "Thành An",
    "Thanh An",
    "Creative Developer",
    "Web Developer Hà Nội",
    "Unity Game Developer",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: portfolio.nameVi,
    title: siteTitle,
    description: siteDescription,
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    firstName: "Thành An",
    lastName: "Lê Văn",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.nameVi,
  alternateName: [portfolio.name, "Thành An", "Thanh An"],
  jobTitle: portfolio.jobTitle,
  url: siteUrl,
  email: `mailto:${portfolio.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Hà Nội", addressCountry: "VN" },
  sameAs: Object.values(portfolio.socials),
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
      <body className="m-0 min-w-[320px] max-w-full overflow-x-hidden bg-background font-sans text-foreground [text-rendering:optimizeLegibility] selection:bg-foreground selection:text-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
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
