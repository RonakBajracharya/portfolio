"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
        <Button onClick={() => { setForm(empty); setEditingId(null); setShowForm(!showForm) }}>
          {showForm ? <><X size={16} className="mr-2" />Cancel</> : <><Plus size={16} className="mr-2" />New Project</>}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader><CardTitle>{editingId ? "Edit" : "New"} Project</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
                <div className="space-y-2"><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required /></div>
              </div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} required /></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Link (optional)</Label><Input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://..." /></div>
                <div className="space-y-2"><Label>Tags (comma-separated)</Label><Input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="react, nodejs" /></div>
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={loading}>{loading ? "Saving..." : editingId ? "Update" : "Create"}</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setForm(empty); setEditingId(null) }}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(p => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{p.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(p)}><Pencil size={14} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-destructive hover:text-destructive"><Trash2 size={14} /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-8">No projects found</TableCell></TableRow>}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}