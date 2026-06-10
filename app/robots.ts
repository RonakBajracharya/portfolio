import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/cyancharley/", "/api/"] },
    sitemap: "https://ronakbajracharya.com.np/sitemap.xml",
  }
}
