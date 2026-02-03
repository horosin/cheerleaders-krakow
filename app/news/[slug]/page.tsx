import Link from "next/link"
import { notFound } from "next/navigation"

import { Icon } from "@/components/icon"
import {
  formatDateShort,
  getAllNewsPosts,
  getNewsPostBySlug,
} from "@/lib/content"
import { renderMarkdown } from "@/lib/markdown"

export const dynamicParams = false

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllNewsPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = getNewsPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Cheerleaders Krakow`,
    description: post.excerpt,
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = getNewsPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const bodyHtml = await renderMarkdown(post.body)

  return (
    <main>
      <section className="relative w-full border-b border-pink-100 overflow-hidden py-20 bg-hero-gradient">
        <div className="absolute inset-0 grain-overlay pointer-events-none z-10" />
        {post.heroImage && (
          <div className="absolute inset-0">
            <img
              src={post.heroImage}
              alt={post.title}
              className="w-full h-full object-cover opacity-25"
            />
          </div>
        )}
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/70 border border-pink-200 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm shadow-sm">
            {post.category}
          </span>
          <h1 className="text-text-dark text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
            {post.title}
          </h1>
          <p className="text-gray-600 text-sm uppercase tracking-[0.2em]">
            {formatDateShort(post.date)}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
          <div className="mt-12">
            <Link
              href="/news/"
              className="inline-flex items-center gap-2 text-primary font-bold text-xs tracking-[0.15em] uppercase hover:gap-3 transition-all"
            >
              <Icon name="arrow_back" className="size-4" />
              Wróć do aktualności
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
