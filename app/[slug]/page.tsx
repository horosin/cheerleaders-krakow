import { notFound } from "next/navigation"

import { getChampionshipContentBySlug, getChampionshipSlugs } from "@/lib/content"
import { renderChampionshipPageBySlug } from "@/app/championship/championship-page-content"

export const dynamicParams = false
export const dynamic = "force-static"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getChampionshipSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const content = getChampionshipContentBySlug(slug, "pl")
  if (!content) return {}
  return { title: `${content.page.title} · ${content.page.dateStart.slice(0, 4)}` }
}

export default async function ChampionshipYearPage({ params }: PageProps) {
  const { slug } = await params
  const page = await renderChampionshipPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return page
}
