"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar } from "lucide-react"
import Navbar from "@/components/navbar"
import { Skeleton } from "@/components/skeleton"

interface Post { id: string; title: string; summary: string; contentHtml: string; tags: string[]; date: string }

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/blog").then(r => r.json()).then(d => { setPosts(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link><span>/</span><span className="text-foreground">Blog</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Blog</h1>
          <p className="text-muted-foreground text-lg mb-12">Thoughts on cybersecurity, privacy, and technology.</p>
          <div className="space-y-8">
            {loading ? (
              [1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)
            ) : posts.length === 0 ? (
              <p className="text-muted-foreground text-center py-20">No posts yet.</p>
            ) : (
              posts.map(p => (
                <Link key={p.id} href={`/blog/${p.id}`} className="block border border-border rounded-xl p-6 hover:border-foreground/10 transition-all bg-background group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={12} />{p.date}</span>
                    {p.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded">{t}</span>)}
                  </div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-muted-foreground transition-colors">{p.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.summary}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <footer className="px-6 py-8 border-t border-border text-center"><p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Ronak Bajracharya</p></footer>
    </div>
  )
}
