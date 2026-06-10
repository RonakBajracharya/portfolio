import Link from "next/link"
import { getWriteups } from "@/lib/db"
import type { Writeup } from "@/lib/db"
import WriteupsClient from "@/app/_component/WriteupsClient"

export default async function WriteupsPage() {
  const writeups: Writeup[] = await getWriteups()

  return (
    <>
      <div className="pt-32">
        <div className="max-w-7xl mx-auto px-6 py-16">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Writeups</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            CTF Writeups
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl mb-12">
            Detailed technical writeups from Capture The Flag competitions.
          </p>

          {/* Client-side filtering UI */}
          <WriteupsClient writeups={writeups} />
        </div>
      </div>
    </>
  )
}