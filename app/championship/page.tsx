import { ChampionshipView } from "@/components/championship/ChampionshipView"
import { getChampionshipContent } from "@/lib/content"
import { renderMarkdown } from "@/lib/markdown"

export default async function ChampionshipPage() {
  const plContent = getChampionshipContent("pl")
  const enContent = getChampionshipContent("en")

  const plSections = await Promise.all(
    plContent.sections.map(async (section) => ({
      ...section,
      bodyHtml: await renderMarkdown(section.body),
    }))
  )

  const enSections = await Promise.all(
    enContent.sections.map(async (section) => ({
      ...section,
      bodyHtml: await renderMarkdown(section.body),
    }))
  )

  return (
    <main>
      <ChampionshipView
        pl={{ page: plContent.page, sections: plSections }}
        en={{ page: enContent.page, sections: enSections }}
      />
    </main>
  )
}
