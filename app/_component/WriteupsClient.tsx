"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Calendar, Tag, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Writeup {
  id: string
  title: string
  summary: string
  content: string
  tags: string[]
  date: string
  category: string
  event: string
}

export default function WriteupsClient({
  writeups,
}: {
  writeups: Writeup[]
}) {
  const [search, setSearch] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const events = useMemo(
    () => [...new Set(writeups.map((w) => w.event))],
    [writeups]
  )

  const filtered = useMemo(() => {
    return writeups.filter((w) => {
      const matchSearch =
        w.title.toLowerCase().includes(search.toLowerCase()) ||
        w.category.toLowerCase().includes(search.toLowerCase()) ||
        w.tags.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        )

      const matchEvent =
        !selectedEvent || w.event === selectedEvent

      return matchSearch && matchEvent
    })
  }, [writeups, search, selectedEvent])

  const grouped = useMemo(() => {
    return events.reduce((acc, e) => {
      const items = filtered.filter((w) => w.event === e)
      if (items.length) acc[e] = items
      return acc
    }, {} as Record<string, Writeup[]>)
  }, [events, filtered])

  return (
    <>
      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">

        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search writeups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground h-11 rounded-xl"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedEvent(null)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              !selectedEvent
                ? "bg-foreground text-background"
                : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            All
          </button>

          {events.map((e) => (
            <button
              key={e}
              onClick={() =>
                setSelectedEvent(selectedEvent === e ? null : e)
              }
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedEvent === e
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {Object.keys(grouped).length > 0 ? (
        <div className="space-y-20">
          {Object.entries(grouped).map(([event, items]) => (
            <div key={event}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Tag size={22} />
                {event}
                <span className="text-sm font-normal text-muted-foreground">
                  ({items.length})
                </span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((w) => (
                  <Link
                    key={w.id}
                    href={`/writeups/${w.id}`}
                    className="border border-border rounded-xl p-5 hover:border-foreground/10 transition-all bg-background group"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded">
                        {w.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar size={12} />
                        {w.date}
                      </span>
                    </div>

                    <h3 className="font-semibold mb-2 group-hover:text-muted-foreground transition-colors">
                      {w.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {w.summary}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {w.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            No writeups found.
          </p>
        </div>
      )}
    </>
  )
}