import Link from "next/link"
import { BookOpen, Image, FileText, Mail, FolderCode } from "lucide-react"
import { getDashboardStats } from "@/lib/db"
import { Card, CardContent } from "@/components/ui/card"

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const cards = [
    { title: "Blog", count: stats.blog, href: "/cyancharley/blog", icon: BookOpen },
    { title: "Writeups", count: stats.writeups, href: "/cyancharley/writeups", icon: BookOpen },
    { title: "Projects", count: stats.projects, href: "/cyancharley/projects", icon: FolderCode },
    { title: "Gallery", count: stats.gallery, href: "/cyancharley/gallery", icon: Image },
    { title: "Messages", count: stats.messages, href: "/cyancharley/messages", icon: Mail },
    { title: "Site Content", count: "—" as const, href: "/cyancharley/content", icon: FileText },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="hover:border-foreground/10 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <card.icon size={24} />
                  <span className="text-3xl font-bold">{card.count}</span>
                </div>
                <p className="text-sm text-muted-foreground font-medium">{card.title}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}