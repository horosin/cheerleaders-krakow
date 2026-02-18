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

type ChampionshipLocalizedContent = ChampionshipPage & {
  sections: ChampionshipSection[]
}

type ChampionshipRecord = Record<"pl" | "en", ChampionshipLocalizedContent>

type ChampionshipFileEntry = {
  slug: string
  year: number | null
  dateStart: string
  data: ChampionshipRecord
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

function getYearFromSlug(slug: string): number | null {
  const match = slug.match(/(\d{4})(?!.*\d)/)
  if (!match?.[1]) return null
  return Number(match[1])
}

function normalizeChampionshipContent(localized: ChampionshipLocalizedContent) {
  const { sections, ...page } = localized
  return {
    page: {
      ...page,
      richText: page.richText?.trim() || undefined,
    },
    sections: sections ?? [],
  }
}

function getChampionshipEntries(): ChampionshipFileEntry[] {
  const dirPath = path.join(contentRoot, "championship")
  if (!fs.existsSync(dirPath)) return []

  return getMarkdownFiles(dirPath)
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const { data } = readMarkdownFile<ChampionshipRecord>(
        path.join(dirPath, file)
      )
      const parsedYearFromDate = data.pl?.dateStart
        ? Number(data.pl.dateStart.slice(0, 4))
        : null
      const yearFromDate =
        parsedYearFromDate !== null && Number.isFinite(parsedYearFromDate)
          ? parsedYearFromDate
          : null
      return {
        slug,
        year: getYearFromSlug(slug) ?? yearFromDate,
        dateStart: data.pl?.dateStart ?? data.en?.dateStart ?? "",
        data,
      }
    })
    .sort((a, b) => {
      const yearA = a.year ?? 0
      const yearB = b.year ?? 0
      if (yearA !== yearB) return yearB - yearA
      if (a.dateStart !== b.dateStart) return a.dateStart < b.dateStart ? 1 : -1
      return a.slug < b.slug ? 1 : -1
    })
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

export function getChampionshipSlugs() {
  return getChampionshipEntries().map((entry) => entry.slug)
}

export function getLatestChampionshipSlug(): string | null {
  return getChampionshipEntries()[0]?.slug ?? null
}

export function getChampionshipNavItems() {
  return getChampionshipEntries().map((entry) => ({
    slug: entry.slug,
    href: `/${entry.slug}/`,
    year: entry.year,
    label: entry.year ? `Championship ${entry.year}` : entry.slug,
  }))
}

export function getChampionshipContentBySlug(
  slug: string,
  lang: "pl" | "en"
) {
  const entry = getChampionshipEntries().find((item) => item.slug === slug)
  if (!entry) return null
  return normalizeChampionshipContent(entry.data[lang])
}

export function getChampionshipContent(lang: "pl" | "en") {
  const latestSlug = getLatestChampionshipSlug()
  if (!latestSlug) {
    throw new Error("Missing championship content files.")
  }
  const content = getChampionshipContentBySlug(latestSlug, lang)
  if (!content) {
    throw new Error(`Championship content not found for slug: ${latestSlug}`)
  }
  return content
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
