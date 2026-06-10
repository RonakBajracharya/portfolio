"use client"

import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  link: string
  tags: string[]
  date: string
}

export default function ProjectsList({
  projects,
}: {
  projects: Project[]
}) {
  if (!projects || projects.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-20">
        No projects yet.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {projects.map((p) => (
        <Link
          key={p.id}
          href={`/projects/${p.id}`}
          className="block border border-border rounded-xl p-6 hover:border-foreground/10 transition-all bg-background group"
        >
          <h2 className="text-xl font-semibold mb-2 group-hover:text-muted-foreground transition-colors">
            {p.title}
          </h2>

          <p className="text-muted-foreground text-sm mb-3">
            {p.description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {p.date}
            </span>

            {p.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded"
              >
                {t}
              </span>
            ))}

            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-foreground underline underline-offset-4 hover:text-muted-foreground ml-auto"
              >
                View →
              </a>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}