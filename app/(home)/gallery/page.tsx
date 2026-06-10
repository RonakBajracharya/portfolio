import GalleryClient from "@/app/_component/GalleryClient"
import type { GalleryItem } from "@/lib/db"

async function getGallery(): Promise<GalleryItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery`, {
    cache: "no-store",
  })

  if (!res.ok) return []
  return res.json()
}

export default async function GalleryPage() {
  const items = await getGallery()

  return <GalleryClient initialItems={items} />
}