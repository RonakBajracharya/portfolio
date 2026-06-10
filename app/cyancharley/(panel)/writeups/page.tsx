"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import RichTextEditor from "@/components/rich-text-editor"
import { Pencil, Trash2, Plus, X, Search } from "lucide-react"
import { marked } from "marked"

const isHtml = (str: string) => /<\/[a-z][a-z0-9]*>/i.test(str)
const toHtml = (str: string) => isHtml(str) ? str : (marked(str) as string)

interface Writeup {
  id: string
  title: string
  event: string
  category: string
  date: string
  summary: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

const emptyForm = {
  title: "",
  event: "",
  category: "",
  date: "",
  summary: "",
  content: "",
  tags: "",
}

export default function AdminWriteups() {
  const [writeups, setWriteups] = useState<Writeup[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const fetchWriteups = async () => {
    const r = await fetch("/api/writeups")
    setWriteups(await r.json())
  }

  useEffect(() => { fetchWriteups() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      title: form.title,
      event: form.event,
      category: form.category,
      date: form.date,
      summary: form.summary,
      content: form.content,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    }

    if (editingId) {
      await fetch(`/api/writeups/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    } else {
      await fetch("/api/writeups", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    }

    setLoading(false)
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
    fetchWriteups()
  }

  const handleEdit = (w: Writeup) => {
    setForm({
      title: w.title,
      event: w.event,
      category: w.category,
      date: w.date,
      summary: w.summary,
      content: toHtml(w.content),
      tags: w.tags.join(", "),
    })
    setEditingId(w.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this writeup?")) return
    await fetch(`/api/writeups/${id}`, { method: "DELETE" })
    fetchWriteups()
  }

  const filtered = writeups.filter(
    (w) =>
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.event.toLowerCase().includes(search.toLowerCase()) ||
      w.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Writeups</h1>
        <Button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(!showForm) }}>
          {showForm ? <><X size={16} className="mr-2" />Cancel</> : <><Plus size={16} className="mr-2" />New Writeup</>}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader><CardTitle>{editingId ? "Edit Writeup" : "New Writeup"}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
                <div className="space-y-2"><Label>Event</Label><Input value={form.event} onChange={(e) => setForm({ ...form, event: e.target.value })} required /></div>
                <div className="space-y-2"><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required /></div>
                <div className="space-y-2"><Label>Date</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required /></div>
              </div>
              <div className="space-y-2"><Label>Summary</Label><Input value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Content (Markdown supported)</Label><RichTextEditor content={form.content} onChange={(html) => setForm({ ...form, content: html })} placeholder="Write your CTF writeup here..." /></div>
              <div className="space-y-2"><Label>Tags (comma-separated)</Label><Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Web, SQL Injection, Python" /></div>
              <div className="flex gap-3">
                <Button type="submit" disabled={loading}>{loading ? "Saving..." : editingId ? "Update Writeup" : "Create Writeup"}</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setForm(emptyForm); setEditingId(null) }}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search writeups..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Event</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((w) => (
              <TableRow key={w.id}>
                <TableCell className="font-medium">{w.title}</TableCell>
                <TableCell className="text-muted-foreground">{w.event}</TableCell>
                <TableCell className="hidden md:table-cell"><Badge variant="secondary">{w.category}</Badge></TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{w.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(w)}><Pencil size={14} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(w.id)} className="text-destructive hover:text-destructive"><Trash2 size={14} /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No writeups found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}