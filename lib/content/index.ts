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

function contentDate(value?: string | Date) {
  return value instanceof Date ? value.toISOString().slice(0, 10) : value ?? ""
}

function getMarkdownFiles(dirPath: string) {
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".md"))
}

type SimplePageFrontmatter = {
  slug?: string
  title: string
  navLabel?: string
  order?: number
}

type FixedChampionshipSections = {
  description?: Omit<ChampionshipSection, "id">
  files?: Omit<ChampionshipSection, "id">
  venue?: Omit<ChampionshipSection, "id">
}

type ChampionshipLocalizedContent = ChampionshipPage & {
  sections?: ChampionshipSection[] | FixedChampionshipSections
}

type ChampionshipRecord = Record<"pl" | "en", ChampionshipLocalizedContent>

type ChampionshipFileEntry = {
  slug: string
  year: number | null
  dateStart: string
  data: ChampionshipRecord
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function getSimplePageSlug(file: string, data: SimplePageFrontmatter) {
  return data.slug?.trim() || file.replace(/\.md$/, "") || slugify(data.title)
}

function getSimplePageEntries(dirName: string): SimplePage[] {
  const dirPath = path.join(contentRoot, dirName)
  if (!fs.existsSync(dirPath)) return []

  return getMarkdownFiles(dirPath).map((file) => {
    const { data, content } = readMarkdownFile<SimplePageFrontmatter>(
      path.join(dirPath, file)
    )

    return {
      slug: getSimplePageSlug(file, data),
      title: data.title,
      navLabel: data.navLabel,
      order: data.order,
      body: content,
    }
  })
}

function getSimplePages(dirName: string): SimplePage[] {
  return getSimplePageEntries(dirName)
    .sort((a, b) => {
      const orderA = a.order ?? 999
      const orderB = b.order ?? 999
      if (orderA !== orderB) return orderA - orderB
      return a.title.localeCompare(b.title)
    })
}

function getSimplePageBySlug(dirName: string, slug: string): SimplePage | null {
  return getSimplePageEntries(dirName).find((page) => page.slug === slug) ?? null
}

function getYearFromSlug(slug: string): number | null {
  const match = slug.match(/(\d{4})(?!.*\d)/)
  if (!match?.[1]) return null
  return Number(match[1])
}

function normalizeChampionshipContent(localized: ChampionshipLocalizedContent) {
  const { sections, ...page } = localized
  const fixedOrder = ["description", "files", "venue"] as const
  const normalizedSections = Array.isArray(sections)
    ? (fixedOrder
        .map((id) => sections.find((section) => section.id === id) ?? null)
        .filter(Boolean) as ChampionshipSection[])
    : (fixedOrder
        .map((id) => {
          const section = sections?.[id]
          return section ? { id, ...section } : null
        })
        .filter(Boolean) as ChampionshipSection[])

  return {
    page: {
      ...page,
      dateStart: contentDate(page.dateStart),
      dateEnd: contentDate(page.dateEnd),
      ctas: page.ctas ?? [],
      richText: page.richText?.trim() || undefined,
    },
    sections: normalizedSections,
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
      const dateStart = contentDate(data.pl?.dateStart ?? data.en?.dateStart)
      const yearFromDate = Number(dateStart.slice(0, 4)) || null
      return {
        slug,
        year: getYearFromSlug(slug) ?? yearFromDate,
        dateStart,
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

export function getNewsIndex(): NewsIndex {
  const site = getSiteConfig()
  return (
    site.newsIndex ?? {
      eyebrow: "",
      title: "",
      description: "",
    }
  )
}

function readNewsPost(filePath: string, slug: string): NewsPost {
  const { data, content } = readMarkdownFile<Omit<NewsPost, "slug" | "date"> & { date: string | Date }>(filePath)
  return {
    ...data,
    slug,
    date: contentDate(data.date),
    body: content,
  }
}

export function getAllNewsPosts(): NewsPost[] {
  const dirPath = path.join(contentRoot, "news")
  return getMarkdownFiles(dirPath)
    .filter((file) => file !== "index.md")
    .map((file) => readNewsPost(path.join(dirPath, file), file.replace(/\.md$/, "")))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getNewsPostBySlug(slug: string): NewsPost | null {
  const filePath = path.join(contentRoot, "news", `${slug}.md`)
  return fs.existsSync(filePath) ? readNewsPost(filePath, slug) : null
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
  const content = entry?.data[lang]
  return content ? normalizeChampionshipContent(content) : null
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
  const site = getSiteConfig()
  const data = site.videosIndex
  return {
    eyebrow: data?.eyebrow ?? "",
    title: data?.title ?? "",
    description: data?.description ?? "",
    videos: data?.videos ?? [],
  }
}

export function getVideos(): VideoEntry[] {
  const site = getSiteConfig()
  return (site.videosIndex?.videos ?? [])
    .map((video) => ({ ...video, date: contentDate(video.date) }))
    .sort((a, b) => a.order - b.order)
}

export function getFundingIndex(): FundingIndex {
  const site = getSiteConfig()
  const data = site.fundingIndex
  return {
    eyebrow: data?.eyebrow ?? "",
    title: data?.title ?? "",
    description: data?.description ?? "",
    entries: data?.entries ?? [],
  }
}

export function getFunding(): FundingGrant[] {
  const site = getSiteConfig()
  return site.fundingIndex?.entries ?? []
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
