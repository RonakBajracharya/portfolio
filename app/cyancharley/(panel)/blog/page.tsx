"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RichTextEditor from "@/components/rich-text-editor"
import { Pencil, Trash2, Plus, X, Search } from "lucide-react"
import { marked } from "marked"

interface Post { id: string; title: string; summary: string; content: string; tags: string[]; date: string }

const isHtml = (s: string) => /<\/[a-z][a-z0-9]*>/i.test(s)
const toHtml = (s: string) => isHtml(s) ? s : (marked(s) as string)

const empty = { title: "", summary: "", content: "", tags: "", date: "" }

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const fetchPosts = () => { fetch("/api/blog").then(r => r.json()).then(setPosts) }

  useEffect(() => { fetchPosts() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    const payload = { title: form.title, summary: form.summary, content: form.content, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean), date: form.date }
    if (editingId) { await fetch(`/api/blog/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }) }
    else { await fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }) }
    setLoading(false); setForm(empty); setEditingId(null); setShowForm(false); fetchPosts()
  }

  const handleEdit = (p: Post) => {
    setForm({ title: p.title, summary: p.summary, content: toHtml(p.content), tags: p.tags.join(", "), date: p.date })
    setEditingId(p.id); setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return
    await fetch(`/api/blog/${id}`, { method: "DELETE" }); fetchPosts()
  }

  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Blog</h1>
        <Button onClick={() => { setForm(empty); setEditingId(null); setShowForm(!showForm) }} className="bg-foreground hover:bg-foreground/90 text-background">
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? "Cancel" : "New Post"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 mb-8 space-y-4">
          <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit Post" : "New Post"}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block text-sm text-muted-foreground mb-1">Title</label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-background border-border text-foreground" required /></div>
            <div><label className="block text-sm text-muted-foreground mb-1">Date</label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="bg-background border-border text-foreground" required /></div>
          </div>
          <div><label className="block text-sm text-muted-foreground mb-1">Summary</label><Input value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} className="bg-background border-border text-foreground" required /></div>
          <div><label className="block text-sm text-muted-foreground mb-1">Content</label><RichTextEditor content={form.content} onChange={html => setForm({ ...form, content: html })} placeholder="Write your blog post..." /></div>
          <div><label className="block text-sm text-muted-foreground mb-1">Tags (comma-separated)</label><Input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="bg-background border-border text-foreground" placeholder="career, learning, cybersecurity" /></div>
          <div className="flex gap-3">
            <Button type="submit" disabled={loading} className="bg-foreground hover:bg-foreground/90 text-background">{loading ? "Saving..." : editingId ? "Update" : "Create"}</Button>
            <Button type="button" variant="outline" onClick={() => { setShowForm(false); setForm(empty); setEditingId(null) }} className="border-border text-muted-foreground">Cancel</Button>
          </div>
        </form>
      )}

      <div className="relative mb-6"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground" /></div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border"><th className="text-left p-4 text-sm text-muted-foreground font-medium">Title</th><th className="text-left p-4 text-sm text-muted-foreground font-medium hidden md:table-cell">Date</th><th className="text-right p-4 text-sm text-muted-foreground font-medium">Actions</th></tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30">
                <td className="p-4 text-sm">{p.title}</td>
                <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{p.date}</td>
                <td className="p-4"><div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(p)} className="h-8 w-8 text-muted-foreground hover:text-foreground"><Pencil size={14} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="h-8 w-8 text-muted-foreground hover:text-red-400"><Trash2 size={14} /></Button>
                </div></td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-muted-foreground">No posts found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
