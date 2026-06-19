import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { getBlogPostBySlug } from "@/lib/db";

interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  date: string;
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: Post | null = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 pt-48 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>

          <Link
            href="/blog"
            className="hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <span>/</span>

          <span className="text-foreground truncate max-w-[200px]">
            {post.title}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar size={14} />
            {post.date}
          </span>

          {post.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Summary */}
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed border-l-2 border-border pl-4">
          {post.summary}
        </p>

        {/* Content */}
        <div className="bg-secondary/50 border border-border rounded-xl p-8">
          <div
            className="rich-content text-foreground/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </>
  );
}