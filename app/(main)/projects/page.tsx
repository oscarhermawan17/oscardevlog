import type { Metadata } from "next"
import { getProjects } from "@/sanity/queries/projects"
import { ProjectsList } from "./_projects-list"

export const metadata: Metadata = {
  title: "Projects",
  description: "Built & deployed — architecture-first project breakdowns.",
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:py-16">
      <h1 className="mb-12 font-mono text-2xl font-bold text-sky sm:text-3xl">
        [ Built, &amp; Deployed ]
      </h1>
      <ProjectsList projects={projects} />
    </div>
  )
}
