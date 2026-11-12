import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/portfolio"
import { projects } from "@/lib/projects"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map(({ slug }) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ]
}
