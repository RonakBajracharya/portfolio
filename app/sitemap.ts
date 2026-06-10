import type { MetadataRoute } from "next"

const siteUrl = "https://ronakbajracharya.com.np"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${siteUrl}/writeups`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${siteUrl}/gallery`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
  ]

  return base
}
