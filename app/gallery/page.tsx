"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Skeleton } from "@/components/skeleton"
import type { GalleryItem } from "@/lib/db"

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  useEffect(() => {
    fetch("/api/gallery").then(r => r.json()).then(d => { setItems(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link><span>/</span><span className="text-foreground">Gallery</span>
        </div>
        <h1 className="text-4xl font-bold mb-10 tracking-tight">Gallery</h1>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2">
            {[1,2,3,4,5,6,7,8].map(i => <Skeleton key={i} className="aspect-square" />)}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2">
            {items.map(item => (
              <button key={item.id} onClick={() => setSelected(item)} className="aspect-square relative overflow-hidden group cursor-pointer bg-secondary">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 grayscale-0 group-hover:grayscale" onError={e => { (e.target as HTMLImageElement).src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect fill='%231a1a1a' width='200' height='200'/><text fill='%23737373' x='100' y='105' text-anchor='middle' font-size='14'>No Image</text></svg>" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                  {item.category && <span className="text-xs text-muted-foreground">{item.category}</span>}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20"><p className="text-muted-foreground text-lg">No gallery items yet.</p></div>
        )}
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button className="absolute top-4 right-4 text-foreground text-3xl hover:text-muted-foreground transition-colors z-10" onClick={() => setSelected(null)}>&times;</button>
          <div className="max-w-4xl max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
            <img src={selected.imageUrl} alt={selected.title} className="w-full h-auto max-h-[75vh] object-contain rounded-xl" />
            <div className="mt-4 text-center"><h3 className="text-xl font-semibold">{selected.title}</h3>{selected.description && <p className="text-muted-foreground mt-1">{selected.description}</p>}
              <div className="flex items-center justify-center gap-2 mt-2">{selected.category && <span className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded">{selected.category}</span>}<span className="text-xs text-muted-foreground">{selected.date}</span></div>
            </div>
          </div>
        </div>
      )}
      <footer className="px-6 py-8 border-t border-border text-center mt-12"><p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Ronak Bajracharya</p></footer>
    </div>
  )
}
