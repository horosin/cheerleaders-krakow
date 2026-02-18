import { notFound } from "next/navigation"

import { getChampionshipSlugs } from "@/lib/content"
import { renderChampionshipPageBySlug } from "@/app/championship/championship-page-content"

export const dynamicParams = false
export const dynamic = "force-static"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getChampionshipSlugs().map((slug) => ({ slug }))
}

export default async function ChampionshipYearPage({ params }: PageProps) {
  const { slug } = await params
  const page = await renderChampionshipPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return page
}
