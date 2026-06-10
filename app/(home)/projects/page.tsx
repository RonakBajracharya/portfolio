import Link from "next/link"
import { getProjects } from "@/lib/db"
import ProjectsList from "@/app/_component/ProjectList"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <div className="pt-32">
        <div className="max-w-4xl mx-auto px-6 py-16">

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Projects</span>
          </div>

          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Projects
          </h1>

          <p className="text-muted-foreground text-lg mb-12">
            Research, development, and cybersecurity projects.
          </p>

          <ProjectsList projects={projects} />
        </div>
      </div>
    </>
  )
}

