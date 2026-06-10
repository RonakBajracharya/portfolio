import { getGallery } from "@/lib/db"
import GalleryClient from "@/app/_component/GalleryClient"

export default async function GalleryPage() {
  const items = await getGallery()
  return <GalleryClient initialItems={items} />
}