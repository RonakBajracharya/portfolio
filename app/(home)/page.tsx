// app/(portfolio)/page.tsx  —  SERVER COMPONENT (no "use client")
import type { SiteConfig, BlogPost, Writeup, Project } from "@/lib/db"
import PortfolioClient from "../_component/PortfolioClient"

async function getSiteConfig(): Promise<SiteConfig | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/site`, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
      cache: "no-store",
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

async function getWriteups(): Promise<Writeup[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/writeups`, {
      cache: "no-store",
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
      cache: "no-store",
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function PortfolioPage() {
  // All data fetching happens on the server — no loading spinners for initial paint
  const [config, blogPosts, writeups, projects] = await Promise.all([
    getSiteConfig(),
    getBlogPosts(),
    getWriteups(),
    getProjects(),
  ])

  // If the site config is missing the page is unusable — fail gracefully
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground text-sm">Failed to load site configuration.</p>
      </div>
    )
  }

  return (
    <PortfolioClient
      config={config}
      blogPosts={blogPosts}
      writeups={writeups}
      projects={projects}
    />
  )
}