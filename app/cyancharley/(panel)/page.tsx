import Link from "next/link";
import { BookOpen, Image, FileText, Mail, FolderCode } from "lucide-react";
import { getDashboardStats } from "@/lib/db";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const cards = [
    {
      title: "Blog",
      count: stats.blog,
      href: "/cyancharley/blog",
      icon: BookOpen,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Writeups",
      count: stats.writeups,
      href: "/cyancharley/writeups",
      icon: BookOpen,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Projects",
      count: stats.projects,
      href: "/cyancharley/projects",
      icon: FolderCode,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      title: "Gallery",
      count: stats.gallery,
      href: "/cyancharley/gallery",
      icon: Image,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "Messages",
      count: stats.messages,
      href: "/cyancharley/messages",
      icon: Mail,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Site Content",
      count: "—" as const,
      href: "/cyancharley/content",
      icon: FileText,
      color: "text-teal-400",
      bg: "bg-teal-500/10",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-card border border-border rounded-lg p-6 hover:border-foreground/10 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bg}`}>
                <card.icon className={card.color} size={24} />
              </div>
              <span className="text-3xl font-bold text-foreground">
                {card.count}
              </span>
            </div>
            <h3 className="text-muted-foreground font-medium">{card.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
