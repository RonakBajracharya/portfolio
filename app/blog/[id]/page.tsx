"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Calendar } from "lucide-react"
import Navbar from "@/components/navbar"

interface Post { id: string; title: string; summary: string; contentHtml: string; tags: string[]; date: string }

export default function BlogDetail() {
  const p = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/blog/${p.id}`).then(r => r.json()).then(d => { if (d.error) setPost(null); else setPost(d); setLoading(false) }).catch(() => setLoading(false))
  }, [p.id])

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin" /></div>
  if (!post) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Not Found</h1><Link href="/blog" className="text-foreground underline">&larr; Back</Link></div></div>

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link><span>/</span>
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link><span>/</span>
          <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-muted-foreground flex items-center gap-1"><Calendar size={14} />{post.date}</span>
          {post.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded">{t}</span>)}
        </div>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed border-l-2 border-border pl-4">{post.summary}</p>
        <div className="bg-secondary/50 border border-border rounded-xl p-8">
          <div className="rich-content text-foreground/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
      </div>
      <footer className="px-6 py-8 border-t border-border text-center mt-12"><p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Ronak Bajracharya</p></footer>
    </div>
  )
}
