"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, Tag, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import { Skeleton } from "@/components/skeleton"
import type { Writeup } from "@/lib/db"

export default function WriteupsPage() {
  const [writeups, setWriteups] = useState<Writeup[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/writeups").then(r => r.json()).then(d => { setWriteups(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const events = [...new Set(writeups.map(w => w.event))]
  const filtered = writeups.filter(w => {
    const m = w.title.toLowerCase().includes(search.toLowerCase()) || w.category.toLowerCase().includes(search.toLowerCase()) || w.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return m && (!selectedEvent || w.event === selectedEvent)
  })
  const grouped = events.reduce((acc, e) => { const items = filtered.filter(w => w.event === e); if (items.length) acc[e] = items; return acc }, {} as Record<string, Writeup[]>)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link><span>/</span><span className="text-foreground">Writeups</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">CTF Writeups</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12">Detailed technical writeups from Capture The Flag competitions.</p>
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search writeups..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground h-11 rounded-xl" />
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedEvent(null)} className={`px-4 py-2 rounded-lg text-sm transition-colors ${!selectedEvent ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground border border-border"}`}>All</button>
              {events.map(e => (
                <button key={e} onClick={() => setSelectedEvent(selectedEvent === e ? null : e)} className={`px-4 py-2 rounded-lg text-sm transition-colors ${selectedEvent === e ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground border border-border"}`}>{e}</button>
              ))}
            </div>
          </div>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-44 rounded-xl" />)}
            </div>
          ) : Object.keys(grouped).length > 0 ? (
            <div className="space-y-20">
              {Object.entries(grouped).map(([event, items]) => (
                <div key={event}>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Tag size={22} />{event}<span className="text-sm font-normal text-muted-foreground">({items.length})</span></h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map(w => (
                      <Link key={w.id} href={`/writeups/${w.id}`} className="border border-border rounded-xl p-5 hover:border-foreground/10 transition-all bg-background group">
                        <div className="flex items-center gap-2 mb-3"><span className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded">{w.category}</span><span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={12} />{w.date}</span></div>
                        <h3 className="font-semibold mb-2 group-hover:text-muted-foreground transition-colors">{w.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{w.summary}</p>
                        <div className="flex flex-wrap gap-1">{w.tags.map(t => <span key={t} className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">{t}</span>)}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20"><p className="text-muted-foreground text-lg">No writeups found.</p></div>
          )}
        </div>
      </div>
      <footer className="px-6 py-8 border-t border-border text-center"><p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Ronak Bajracharya</p></footer>
    </div>
  )
}
