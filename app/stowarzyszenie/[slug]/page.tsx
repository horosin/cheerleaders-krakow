import { notFound } from "next/navigation"

import { SimplePage } from "@/components/simple-page"
import {
  getStowarzyszeniePageBySlug,
  getStowarzyszeniePages,
} from "@/lib/content"
import { renderMarkdown } from "@/lib/markdown"

export const dynamicParams = false
export const dynamic = "force-static"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getStowarzyszeniePages().map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = getStowarzyszeniePageBySlug(slug)
  if (!page) return {}
  return {
    title: `${page.title} | Cheerleaders Krakow`,
  }
}

export default async function StowarzyszeniePage({ params }: PageProps) {
  const { slug } = await params
  const page = getStowarzyszeniePageBySlug(slug)

  if (!page) {
    notFound()
  }

  const bodyHtml = await renderMarkdown(page.body)

  return <SimplePage title={page.title} bodyHtml={bodyHtml} />
}
