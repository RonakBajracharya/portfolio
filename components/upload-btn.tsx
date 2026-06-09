"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export default function UploadBtn({ onUpload, accept = "image/*" }: { onUpload: (url: string) => void; accept?: string }) {
  const [uploading, setUploading] = useState(false)
  const idRef = useRef(`upload-${Date.now()}-${Math.random().toString(36).slice(2)}`)

  const handleFile = (f: File) => {
    setUploading(true)
    const reader = new FileReader()
    reader.onload = () => {
      onUpload(reader.result as string)
      setUploading(false)
    }
    reader.onerror = () => setUploading(false)
    reader.readAsDataURL(f)
  }

  return (
    <>
      <input type="file" accept={accept} id={idRef.current} className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = "" }} />
      <Button type="button" variant="outline" disabled={uploading}
        onClick={() => document.getElementById(idRef.current)?.click()}
        className="border-slate-600 text-gray-400 hover:text-white whitespace-nowrap">
        {uploading ? "Reading..." : "Upload"}
      </Button>
    </>
  )
}
