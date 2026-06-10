import Link from "next/link"
import { Calendar } from "lucide-react"
import { getBlogPosts } from "@/lib/db"

interface Post {
  id: string
  title: string
  summary: string
  content: string
  tags: string[]
  date: string
}

export default async function BlogPage() {
  const posts: Post[] = await getBlogPosts()

  return (
    <>
      <div className="pt-32">
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Blog</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Blog
          </h1>

          <p className="text-muted-foreground text-lg mb-12">
            Thoughts on cybersecurity, privacy, and technology.
          </p>

          {/* Posts */}
          <div className="space-y-8">
            {posts.length === 0 ? (
              <p className="text-muted-foreground text-center py-20">
                No posts yet.
              </p>
            ) : (
              posts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.id}`}
                  className="block border border-border rounded-xl p-6 hover:border-foreground/10 transition-all bg-background group"
                >
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar size={12} />
                      {p.date}
                    </span>

                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-muted-foreground transition-colors">
                    {p.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {p.summary}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}