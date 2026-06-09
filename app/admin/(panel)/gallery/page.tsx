"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Trash2, Plus, X, Search } from "lucide-react"

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

  const fetchItems = () => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then(setItems)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (editingId) {
      await fetch(`/api/gallery/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
    } else {
      await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
    }

    setLoading(false)
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
    fetchItems()
  }

  const handleEdit = (item: GalleryItem) => {
    setForm({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category,
      date: item.date,
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery item?")) return
    await fetch(`/api/gallery/${id}`, { method: "DELETE" })
    fetchItems()
  }

  const filtered = items.filter(
    (i) =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <Button
          onClick={() => {
            setForm(emptyForm)
            setEditingId(null)
            setShowForm(!showForm)
          }}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? "Cancel" : "Add Item"}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8 space-y-4">
          <h2 className="text-lg font-semibold text-teal-400 mb-4">
            {editingId ? "Edit Gallery Item" : "New Gallery Item"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-slate-900 border-slate-600 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="bg-slate-900 border-slate-600 text-white"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-slate-900 border-slate-600 text-white"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Image URL</label>
            <Input
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="bg-slate-900 border-slate-600 text-white"
              placeholder="/images/example.png or https://..."
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Date</label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-slate-900 border-slate-600 text-white"
              required
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={loading} className="bg-teal-500 hover:bg-teal-600 text-white">
              {loading ? "Saving..." : editingId ? "Update Item" : "Create Item"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowForm(false)
                setForm(emptyForm)
                setEditingId(null)
              }}
              className="border-slate-600 text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search gallery..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden group hover:border-teal-500/50 transition-all"
          >
            <div className="aspect-video bg-slate-700 relative overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect fill='%23374151' width='200' height='100'/><text fill='%239CA3AF' x='100' y='55' text-anchor='middle' font-size='14'>No Image</text></svg>"
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-white mb-1 truncate">{item.title}</h3>
              <p className="text-sm text-gray-400 mb-2 truncate">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 bg-teal-500/10 text-teal-400 rounded">{item.category}</span>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
              <div className="flex gap-1 mt-3 pt-3 border-t border-slate-700/50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(item)}
                  className="text-gray-400 hover:text-white text-xs h-7 flex-1"
                >
                  <Pencil size={12} className="mr-1" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-400 hover:text-red-400 text-xs h-7 flex-1"
                >
                  <Trash2 size={12} className="mr-1" /> Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full p-8 text-center text-gray-500">No gallery items found</div>
        )}
      </div>
    </div>
  )
}
