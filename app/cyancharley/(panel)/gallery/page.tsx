"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, Plus, X, Search } from "lucide-react"
import Image from "next/image"

interface GalleryItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  date: string
  createdAt: string
  updatedAt: string
}

const emptyForm = {
  title: "",
  description: "",
  imageUrl: "",
  category: "",
  date: "",
}

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const fetchItems = async () => {
    const r = await fetch("/api/gallery")
    setItems(await r.json())
  }

  useEffect(() => { fetchItems() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (editingId) {
      await fetch(`/api/gallery/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    } else {
      await fetch("/api/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    }

    setLoading(false)
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
    fetchItems()
  }

  const handleEdit = (item: GalleryItem) => {
    setForm({ title: item.title, description: item.description, imageUrl: item.imageUrl, category: item.category, date: item.date })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery item?")) return
    await fetch(`/api/gallery/${id}`, { method: "DELETE" })
    fetchItems()
  }

  const filtered = items.filter(
    (i) => i.title.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <Button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(!showForm) }}>
          {showForm ? <><X size={16} className="mr-2" />Cancel</> : <><Plus size={16} className="mr-2" />Add Item</>}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader><CardTitle>{editingId ? "Edit Gallery Item" : "New Gallery Item"}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
                <div className="space-y-2"><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required /></div>
              </div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} required /></div>
              <div className="space-y-2"><Label>Image URL</Label><Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="/images/example.png or https://..." required /></div>
              <div className="space-y-2"><Label>Date</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required /></div>
              <div className="flex gap-3">
                <Button type="submit" disabled={loading}>{loading ? "Saving..." : editingId ? "Update Item" : "Create Item"}</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setForm(emptyForm); setEditingId(null) }}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search gallery..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative overflow-hidden">
              <Image src={item.imageUrl} alt={item.title} width={500} height={500} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect fill='%23374151' width='200' height='100'/%3E%3Ctext fill='%239CA3AF' x='100' y='55' text-anchor='middle' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E" }} />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium truncate">{item.title}</h3>
              <p className="text-sm text-muted-foreground truncate">{item.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">{item.category}</span>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <div className="flex gap-1 mt-3 pt-3 border-t">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(item)} className="text-xs flex-1 h-7"><Pencil size={12} className="mr-1" /> Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-xs flex-1 h-7 text-destructive hover:text-destructive"><Trash2 size={12} className="mr-1" /> Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="col-span-full text-center text-muted-foreground py-8">No gallery items found</p>}
      </div>
    </div>
  )
}