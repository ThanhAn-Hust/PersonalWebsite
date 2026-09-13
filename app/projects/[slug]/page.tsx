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
  return { title: project?.title.en ?? "Project not found", description: project?.description.en }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const index = projects.findIndex(project => project.slug === slug)
  const project = projects[index]
  if (!project) notFound()
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <main id="top" tabIndex={-1} className="px-6 pb-24 outline-none md:px-10">
        <div className="flex min-h-[92svh] flex-col justify-end pt-44 pb-12 md:pb-4 border-b border-border">
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
