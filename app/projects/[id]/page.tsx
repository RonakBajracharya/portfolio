"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Calendar, ExternalLink } from "lucide-react"
import Navbar from "@/components/navbar"

interface Project { id: string; title: string; description: string; link: string; tags: string[]; date: string }

export default function ProjectDetail() {
  const p = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/projects/${p.id}`).then(r => r.json()).then(d => { if (d.error) setProject(null); else setProject(d); setLoading(false) }).catch(() => setLoading(false))
  }, [p.id])

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin" /></div>
  if (!project) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Not Found</h1><Link href="/projects" className="text-foreground underline">&larr; Back</Link></div></div>

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link><span>/</span>
          <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link><span>/</span>
          <span className="text-foreground truncate max-w-[200px]">{project.title}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-muted-foreground flex items-center gap-1"><Calendar size={14} />{project.date}</span>
          {project.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded">{t}</span>)}
        </div>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{project.description}</p>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-xl hover:bg-foreground/90 transition-all">
            <ExternalLink size={16} /> View Project
          </a>
        )}
      </div>
      <footer className="px-6 py-8 border-t border-border text-center mt-12"><p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Ronak Bajracharya</p></footer>
    </div>
  )
}
