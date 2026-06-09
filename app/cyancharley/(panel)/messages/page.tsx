"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Trash2, Eye, EyeOff } from "lucide-react"

interface Message {
  id: string; name: string; phone: string; email: string; message: string; read: boolean; createdAt: string
}

export default function AdminMessages() {
  const [msgs, setMsgs] = useState<Message[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchMsgs = () => fetch("/api/contact").then(r => r.json()).then(setMsgs)

  useEffect(() => { fetchMsgs() }, [])

  const toggleRead = async (id: string) => {
    await fetch(`/api/contact/${id}`, { method: "PATCH" }); fetchMsgs()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return
    await fetch(`/api/contact/${id}`, { method: "DELETE" }); fetchMsgs()
  }

  const unread = msgs.filter(m => !m.read).length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          {unread > 0 && <p className="text-sm text-muted-foreground mt-1">{unread} unread</p>}
        </div>
      </div>

      <div className="space-y-3">
        {msgs.map(m => (
          <div key={m.id} className={`border rounded-xl overflow-hidden transition-all ${m.read ? "border-border bg-background" : "border-foreground/10 bg-card"}`}>
            <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setExpanded(expanded === m.id ? null : m.id)}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {!m.read && <span className="w-2 h-2 bg-foreground rounded-full flex-shrink-0" />}
                  <h3 className="font-semibold truncate">{m.name}</h3>
                  <span className="text-xs text-muted-foreground">{new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate mt-1">{m.message}</p>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); toggleRead(m.id) }} className="h-8 w-8 text-muted-foreground hover:text-foreground" title={m.read ? "Mark unread" : "Mark read"}>
                  {m.read ? <EyeOff size={14} /> : <Eye size={14} />}
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDelete(m.id) }} className="h-8 w-8 text-muted-foreground hover:text-red-400">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            {expanded === m.id && (
              <div className="px-4 pb-4 space-y-2 border-t border-border pt-3">
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground"><Phone size={12} /> {m.phone || "—"}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Mail size={12} /> {m.email}</span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{m.message}</p>
              </div>
            )}
          </div>
        ))}
        {msgs.length === 0 && <p className="text-muted-foreground text-center py-20">No messages yet.</p>}
      </div>
    </div>
  )
}
