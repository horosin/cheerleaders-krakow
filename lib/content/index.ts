import "server-only"

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type {
  BrandPage,
  ChampionshipPage,
  ChampionshipSection,
  FundingGrant,
  FundingIndex,
  HomePage,
  NewsIndex,
  NewsPost,
  SimplePage,
  SiteConfig,
  Sponsor,
  Team,
  VideoEntry,
  VideoIndex,
} from "@/lib/content/types"
import { formatDateLong, formatDateRange, formatDateShort } from "./date"

const contentRoot = path.join(process.cwd(), "content")

function readMarkdownFile<T>(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8")
  const parsed = matter(raw)
  return {
    data: parsed.data as T,
    content: parsed.content.trim(),
  }
}

function getMarkdownFiles(dirPath: string) {
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".md"))
}

type SimplePageFrontmatter = {
  title: string
  navLabel?: string
  order?: number
}

function getSimplePages(dirName: string): SimplePage[] {
  const dirPath = path.join(contentRoot, dirName)
  if (!fs.existsSync(dirPath)) return []
  return getMarkdownFiles(dirPath)
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const { data, content } = readMarkdownFile<SimplePageFrontmatter>(
        path.join(dirPath, file)
      )
      return {
        slug,
        title: data.title,
        navLabel: data.navLabel,
        order: data.order,
        body: content,
      }
    })
    .sort((a, b) => {
      const orderA = a.order ?? 999
      const orderB = b.order ?? 999
      if (orderA !== orderB) return orderA - orderB
      return a.title.localeCompare(b.title)
    })
}

function getSimplePageBySlug(dirName: string, slug: string): SimplePage | null {
  const filePath = path.join(contentRoot, dirName, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = readMarkdownFile<SimplePageFrontmatter>(filePath)
  return {
    slug,
    title: data.title,
    navLabel: data.navLabel,
    order: data.order,
    body: content,
  }
}

export { formatDateLong, formatDateRange, formatDateShort }

export function getSiteConfig(): SiteConfig {
  const filePath = path.join(contentRoot, "site.md")
  const { data } = readMarkdownFile<SiteConfig>(filePath)
  return data
}

export function getHomePage(): HomePage {
  const filePath = path.join(contentRoot, "home.md")
  const { data } = readMarkdownFile<HomePage>(filePath)
  return data
}

export function getTeams(): Team[] {
  const filePath = path.join(contentRoot, "teams", "index.md")
  const { data } = readMarkdownFile<{ teams?: Team[] }>(filePath)
  return [...(data.teams ?? [])].sort((a, b) => a.order - b.order)
}

export function getSponsors(): Sponsor[] {
  const filePath = path.join(contentRoot, "sponsors", "index.md")
  const { data } = readMarkdownFile<{ sponsors?: Sponsor[] }>(filePath)
  return [...(data.sponsors ?? [])].sort((a, b) => a.order - b.order)
}

export function getNewsIndex(): NewsIndex {
  const filePath = path.join(contentRoot, "news", "index.md")
  const { data } = readMarkdownFile<NewsIndex>(filePath)
  return data
}

export function getAllNewsPosts(): NewsPost[] {
  const dirPath = path.join(contentRoot, "news")
  return getMarkdownFiles(dirPath)
    .filter((file) => file !== "index.md")
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const { data, content } = readMarkdownFile<Omit<NewsPost, "slug">>(
        path.join(dirPath, file)
      )
      return {
        slug,
        ...data,
        body: content,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getNewsPostBySlug(slug: string): NewsPost | null {
  const filePath = path.join(contentRoot, "news", `${slug}.md`)
  if (!fs.existsSync(filePath)) {
    return null
  }
  const { data, content } = readMarkdownFile<Omit<NewsPost, "slug">>(filePath)
  return {
    slug,
    ...data,
    body: content,
  }
}

export function getChampionshipContent(lang: "pl" | "en") {
  type ChampionshipLocalizedContent = ChampionshipPage & {
    sections: ChampionshipSection[]
  }
  const filePath = path.join(contentRoot, "championship", "index.md")
  const { data } = readMarkdownFile<Record<"pl" | "en", ChampionshipLocalizedContent>>(
    filePath
  )
  const localized = data[lang]
  const { sections, ...page } = localized

  return {
    page: {
      ...page,
      richText: page.richText?.trim() || undefined,
    },
    sections: sections ?? [],
  }
}

export function getVideosIndex(): VideoIndex {
  const filePath = path.join(contentRoot, "filmy", "index.md")
  const { data } = readMarkdownFile<VideoIndex>(filePath)
  return {
    eyebrow: data.eyebrow,
    title: data.title,
    description: data.description,
    videos: data.videos ?? [],
  }
}

export function getVideos(): VideoEntry[] {
  const filePath = path.join(contentRoot, "filmy", "index.md")
  const { data } = readMarkdownFile<VideoIndex>(filePath)
  return [...(data.videos ?? [])].sort((a, b) => a.order - b.order)
}

export function getFundingIndex(): FundingIndex {
  const filePath = path.join(contentRoot, "finansowanie", "index.md")
  const { data } = readMarkdownFile<FundingIndex>(filePath)
  return {
    eyebrow: data.eyebrow,
    title: data.title,
    description: data.description,
    entries: data.entries ?? [],
  }
}

export function getFunding(): FundingGrant[] {
  const filePath = path.join(contentRoot, "finansowanie", "index.md")
  const { data } = readMarkdownFile<FundingIndex>(filePath)
  return [...(data.entries ?? [])].sort((a, b) => a.order - b.order)
}

export function getBrandPage(): BrandPage {
  const filePath = path.join(contentRoot, "marka.md")
  const { data } = readMarkdownFile<BrandPage>(filePath)
  return data
}

export function getStowarzyszeniePages(): SimplePage[] {
  return getSimplePages("stowarzyszenie")
}

export function getStowarzyszeniePageBySlug(
  slug: string
): SimplePage | null {
  return getSimplePageBySlug("stowarzyszenie", slug)
}

export function getPozostalePages(): SimplePage[] {
  return getSimplePages("pozostale")
}

export function getPozostalePageBySlug(slug: string): SimplePage | null {
  return getSimplePageBySlug("pozostale", slug)
}
