import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

import { PostMeta } from "@/components/cards"
import { PageMasthead } from "@/components/page-masthead"
import {
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
    title: post.title,
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
    <main id="main-content" tabIndex={-1}>
      <article>
        <PageMasthead title={post.title}>
          <PostMeta post={post} />
        </PageMasthead>
        <div className="site-shell home-section">
          <div className="mx-auto max-w-3xl">
            <Link href="/news/" className="text-link mb-5">
              <ArrowLeft aria-hidden="true" /> Wszystkie aktualności
            </Link>
            {post.heroImage && (
              <div className="relative mb-8 aspect-[4/3] overflow-hidden bg-background-soft sm:aspect-[16/10]">
                <Image src={post.heroImage} fill sizes="(max-width: 768px) 100vw, 768px" alt={post.heroImageAlt ?? ""} className="object-cover object-center" />
              </div>
            )}
            <div className="prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          </div>
        </div>
      </article>
    </main>
  )
}
