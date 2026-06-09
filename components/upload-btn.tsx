"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export default function UploadBtn({ onUpload, accept = "image/*" }: { onUpload: (url: string) => void; accept?: string }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const idRef = useRef(`upload-${Date.now()}-${Math.random().toString(36).slice(2)}`)

  return (
    <div className="flex flex-col gap-1">
      <input
        type="file"
        accept={accept}
        id={idRef.current}
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0]
          if (!f) return
          setUploading(true)
          setError("")
          const fd = new FormData()
          fd.append("file", f)
          try {
            const res = await fetch("/api/upload", { method: "POST", body: fd })
            const data = await res.json()
            if (data.url) onUpload(data.url)
            else setError(data.error || "Upload failed")
          } catch {
            setError("Network error")
          }
          setUploading(false)
          e.target.value = ""
        }}
      />
      <Button
        type="button"
        variant="outline"
        disabled={uploading}
        onClick={() => document.getElementById(idRef.current)?.click()}
        className="border-slate-600 text-gray-400 hover:text-white whitespace-nowrap"
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  )
}
