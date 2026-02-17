import { ChampionshipView } from "@/components/championship/ChampionshipView"
import { getChampionshipContent } from "@/lib/content"
import { renderMarkdown } from "@/lib/markdown"

export default async function ChampionshipPage() {
  const plContent = getChampionshipContent("pl")
  const enContent = getChampionshipContent("en")

  const plRichTextHtml = plContent.page.richText
    ? await renderMarkdown(plContent.page.richText)
    : ""
  const enRichTextHtml = enContent.page.richText
    ? await renderMarkdown(enContent.page.richText)
    : ""

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
        pl={{
          page: {
            ...plContent.page,
            richTextHtml: plRichTextHtml,
          },
          sections: plSections,
        }}
        en={{
          page: {
            ...enContent.page,
            richTextHtml: enRichTextHtml,
          },
          sections: enSections,
        }}
      />
    </main>
  )
}
