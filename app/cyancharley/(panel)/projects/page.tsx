"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Trash2, Plus, X, Search } from "lucide-react"

interface Project { id: string; title: string; description: string; link: string; tags: string[]; date: string }

const empty = { title: "", description: "", link: "", tags: "", date: "" }

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const fetchProjects = async () => { const r = await fetch("/api/projects"); setProjects(await r.json()) }
  useEffect(() => { fetchProjects() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    const payload = { ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) }
    if (editingId) { await fetch(`/api/projects/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }) }
    else { await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }) }
    setLoading(false); setForm(empty); setEditingId(null); setShowForm(false); fetchProjects()
  }

  const handleEdit = (p: Project) => {
    setForm({ title: p.title, description: p.description, link: p.link || "", tags: p.tags.join(", "), date: p.date })
    setEditingId(p.id); setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return
    await fetch(`/api/projects/${id}`, { method: "DELETE" }); fetchProjects()
  }

  const filtered = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={() => { setForm(empty); setEditingId(null); setShowForm(!showForm) }} className="bg-foreground hover:bg-foreground/90 text-background">
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? "Cancel" : "New Project"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 mb-8 space-y-4">
          <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit" : "New"} Project</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block text-sm text-muted-foreground mb-1">Title</label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-background border-border text-foreground" required /></div>
            <div><label className="block text-sm text-muted-foreground mb-1">Date</label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="bg-background border-border text-foreground" required /></div>
          </div>
          <div><label className="block text-sm text-muted-foreground mb-1">Description</label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-background border-border text-foreground" rows={3} required /></div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block text-sm text-muted-foreground mb-1">Link (optional)</label><Input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} className="bg-background border-border text-foreground" placeholder="https://..." /></div>
            <div><label className="block text-sm text-muted-foreground mb-1">Tags (comma-separated)</label><Input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="bg-background border-border text-foreground" placeholder="react, nodejs" /></div>
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={loading} className="bg-foreground hover:bg-foreground/90 text-background">{loading ? "Saving..." : editingId ? "Update" : "Create"}</Button>
            <Button type="button" variant="outline" onClick={() => { setShowForm(false); setForm(empty); setEditingId(null) }} className="border-border text-muted-foreground">Cancel</Button>
          </div>
        </form>
      )}

      <div className="relative mb-6"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground" /></div>

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
            {filtered.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-muted-foreground">No projects found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
