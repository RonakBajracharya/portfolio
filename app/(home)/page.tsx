// app/(portfolio)/page.tsx  —  SERVER COMPONENT (no "use client")
import { getBlogPosts, getSiteConfig, getWriteups, getProjects } from "@/lib/db"
import PortfolioClient from "../_component/PortfolioClient"

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