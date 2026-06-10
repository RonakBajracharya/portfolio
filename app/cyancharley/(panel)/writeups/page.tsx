"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

  useEffect(() => {
    fetchWriteups()
  }, [])

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
      await fetch(`/api/writeups/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch("/api/writeups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
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
        <Button
          onClick={() => {
            setForm(emptyForm)
            setEditingId(null)
            setShowForm(!showForm)
          }}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? "Cancel" : "New Writeup"}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8 space-y-4">
          <h2 className="text-lg font-semibold text-teal-400 mb-4">
            {editingId ? "Edit Writeup" : "New Writeup"}
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
              <label className="block text-sm text-gray-400 mb-1">Event</label>
              <Input
                value={form.event}
                onChange={(e) => setForm({ ...form, event: e.target.value })}
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
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Summary</label>
            <Input
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="bg-slate-900 border-slate-600 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Content (Markdown supported)</label>
            <RichTextEditor
              content={form.content}
              onChange={(html) => setForm({ ...form, content: html })}
              placeholder="Write your CTF writeup here..."
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tags (comma-separated)</label>
            <Input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="bg-slate-900 border-slate-600 text-white"
              placeholder="Web, SQL Injection, Python"
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={loading} className="bg-teal-500 hover:bg-teal-600 text-white">
              {loading ? "Saving..." : editingId ? "Update Writeup" : "Create Writeup"}
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
          placeholder="Search writeups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-4 text-sm text-gray-400 font-medium">Title</th>
                <th className="text-left p-4 text-sm text-gray-400 font-medium">Event</th>
                <th className="text-left p-4 text-sm text-gray-400 font-medium hidden md:table-cell">Category</th>
                <th className="text-left p-4 text-sm text-gray-400 font-medium hidden md:table-cell">Date</th>
                <th className="text-right p-4 text-sm text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((w) => (
                <tr key={w.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="p-4 text-sm">{w.title}</td>
                  <td className="p-4 text-sm text-gray-300">{w.event}</td>
                  <td className="p-4 text-sm hidden md:table-cell">
                    <span className="px-2 py-0.5 bg-teal-500/10 text-teal-400 rounded text-xs">{w.category}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 hidden md:table-cell">{w.date}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(w)}
                        className="h-8 w-8 text-gray-400 hover:text-white hover:bg-slate-700"
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(w.id)}
                        className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-slate-700"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No writeups found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
