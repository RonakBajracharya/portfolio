"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, Image, FileText } from "lucide-react"

interface Stats {
  writeups: number
  gallery: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ writeups: 0, gallery: 0 })

  useEffect(() => {
    Promise.all([
      fetch("/api/writeups").then((r) => r.json()),
      fetch("/api/gallery").then((r) => r.json()),
    ]).then(([writeups, gallery]) => {
      setStats({ writeups: writeups.length, gallery: gallery.length })
    })
  }, [])

  const cards = [
    {
      title: "Writeups",
      count: stats.writeups,
      href: "/admin/writeups",
      icon: BookOpen,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Gallery",
      count: stats.gallery,
      href: "/admin/gallery",
      icon: Image,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "Site Content",
      count: "—",
      href: "/admin/content",
      icon: FileText,
      color: "text-teal-400",
      bg: "bg-teal-500/10",
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bg}`}>
                <card.icon className={card.color} size={24} />
              </div>
              <span className="text-3xl font-bold text-white">{card.count}</span>
            </div>
            <h3 className="text-gray-300 font-medium">{card.title}</h3>
          </Link>
        ))}
      </div>
      <div className="mt-8 bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
        <div className="flex flex-wrap gap-3 mt-4">
          <Link
            href="/admin/writeups"
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors text-sm"
          >
            + New Writeup
          </Link>
          <Link
            href="/admin/gallery"
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors text-sm"
          >
            + Add Gallery Item
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 border border-slate-600 text-gray-300 hover:text-white hover:border-slate-500 rounded-lg transition-colors text-sm"
          >
            View Site →
          </Link>
        </div>
      </div>
    </div>
  )
}
