"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"

interface Project { id: string; title: string; description: string; link: string; tags: string[]; date: string }

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetch("/api/projects").then(r => r.json()).then(d => { setProjects(d); setLoading(false) }).catch(() => setLoading(false)) }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link><span>/</span><span className="text-foreground">Projects</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Projects</h1>
          <p className="text-muted-foreground text-lg mb-12">Research, development, and cybersecurity projects.</p>
          <div className="space-y-6">
            {loading ? [1,2,3].map(i => <div key={i} className="h-28 bg-[#262626] animate-pulse rounded-xl" />) : projects.length === 0 ? (
              <p className="text-muted-foreground text-center py-20">No projects yet.</p>
            ) : projects.map(p => (
              <div key={p.id} className="border border-border rounded-xl p-6 bg-background">
                <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
                <p className="text-muted-foreground text-sm mb-3">{p.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">{p.date}</span>
                  {p.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded">{t}</span>)}
                  {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-foreground underline underline-offset-4 hover:text-muted-foreground ml-auto">View &rarr;</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="px-6 py-8 border-t border-border text-center"><p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Ronak Bajracharya</p></footer>
    </div>
  )
}
