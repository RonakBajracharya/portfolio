"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export default function UploadBtn({ onUpload, accept = "image/*" }: { onUpload: (url: string) => void; accept?: string }) {
  const [uploading, setUploading] = useState(false)
  const idRef = useRef(`upload-${Date.now()}-${Math.random().toString(36).slice(2)}`)

  return (
    <>
      <input
        type="file"
        accept={accept}
        id={idRef.current}
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0]
          if (!f) return
          setUploading(true)
          const fd = new FormData()
          fd.append("file", f)
          const res = await fetch("/api/upload", { method: "POST", body: fd })
          const data = await res.json()
          setUploading(false)
          if (data.url) onUpload(data.url)
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
    </>
  )
}
