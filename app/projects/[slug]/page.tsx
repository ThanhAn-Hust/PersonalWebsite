import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects } from "@/lib/projects"
import { Footer } from "@/components/sections/footer"
import { ProjectTitle } from "@/components/sections/projects/project-title"
import { ProjectImage } from "@/components/sections/projects/project-image"
import { NextProject } from "@/components/sections/projects/next-project"
import { ProjectInfo } from "@/components/sections/projects/project-info"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find(project => project.slug === slug)
  if (!project) return { title: "Project not found", robots: { index: false } }
  const url = `/projects/${project.slug}`
  return {
    title: project.title.en,
    description: project.description.en,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: project.title.en,
      description: project.description.en,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const index = projects.findIndex(project => project.slug === slug)
  const project = projects[index]
  if (!project) notFound()
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <main id="top" tabIndex={-1} className="px-4 sm:px-6 md:px-10 pb-16 md:pb-24 outline-none">
        <div className="flex min-h-[50svh] sm:min-h-[70svh] md:min-h-[92svh] flex-col justify-end pt-28 sm:pt-36 md:pt-44 pb-8 md:pb-4 border-b border-border">
          <ProjectTitle key={project.slug} title={project.title} />
        </div>
        <ProjectInfo key={project.slug} project={project} />
        <ProjectImage key={`image-${project.slug}`} src={project.image} alt={project.imageAlt} />
        <NextProject key={`next-${project.slug}`} project={next} />
      </main>
      <Footer />
    </>
  )
}
