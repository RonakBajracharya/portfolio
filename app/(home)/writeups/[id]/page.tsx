"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Calendar, Tag } from "lucide-react"
import Navbar from "@/components/navbar"

interface W { id: string; title: string; event: string; category: string; date: string; summary: string; contentHtml: string; tags: string[] }

export default function WriteupDetail() {
  const p = useParams()
  const [w, setW] = useState<W | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/writeups/${p.id}`).then(r => r.json()).then(d => { if (d.error) setW(null); else setW(d); setLoading(false) }).catch(() => setLoading(false))
  }, [p.id])

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin" /></div>
  if (!w) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Not Found</h1><Link href="/writeups" className="text-foreground underline">&larr; Back</Link></div></div>

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link><span>/</span>
          <Link href="/writeups" className="hover:text-foreground transition-colors">Writeups</Link><span>/</span>
          <span className="text-foreground truncate max-w-[200px]">{w.title}</span>
        </div>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4"><span className="text-xs px-2 py-1 bg-secondary text-muted-foreground rounded">{w.category}</span><span className="text-sm text-muted-foreground flex items-center gap-1"><Calendar size={14} />{w.date}</span></div>
          <h1 className="text-4xl font-bold mb-3">{w.title}</h1>
          <div className="flex items-center gap-2 mb-4"><Tag size={16} /><span>{w.event}</span></div>
          <div className="flex flex-wrap gap-2 mb-6">{w.tags.map(t => <span key={t} className="text-xs px-2 py-1 bg-secondary text-muted-foreground rounded">{t}</span>)}</div>
          <p className="text-lg leading-relaxed border-l-2 border-border pl-4 text-muted-foreground">{w.summary}</p>
        </div>
        <div className="bg-secondary/50 border border-border rounded-xl p-8">
          <div className="rich-content text-foreground/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: w.contentHtml }} />
        </div>
      </div>
    </div>
  )
}
