import { notFound } from "next/navigation"

import { getLatestChampionshipSlug } from "@/lib/content"
import { renderChampionshipPageBySlug } from "@/app/championship/championship-page-content"

export const dynamic = "force-static"

export default async function ChampionshipPage() {
  const latestSlug = getLatestChampionshipSlug()
  if (!latestSlug) {
    notFound()
  }

  const page = await renderChampionshipPageBySlug(latestSlug)
  if (!page) {
    notFound()
  }

  return page
}
