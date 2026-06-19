import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ExternalLink } from "lucide-react";
import { getProjectBySlug } from "@/lib/db";

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  date: string;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project: Project | null = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 pt-48 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>

          <Link
            href="/projects"
            className="hover:text-foreground transition-colors"
          >
            Projects
          </Link>
          <span>/</span>

          <span className="text-foreground truncate max-w-[200px]">
            {project.title}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar size={14} />
            {project.date}
          </span>

          {project.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {project.description}
        </p>

        {/* Link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-xl hover:bg-foreground/90 transition-all"
          >
            <ExternalLink size={16} />
            View Project
          </a>
        )}
      </div>
    </>
  );
}