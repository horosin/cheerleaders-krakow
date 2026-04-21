import type { MetadataRoute } from "next"

import {
  getAllNewsPosts,
  getChampionshipSlugs,
  getPozostalePages,
  getStowarzyszeniePages,
} from "@/lib/content"

export const dynamic = "force-static"

const defaultSiteUrl = "https://cheerleaders-krakow.pl"

function getBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL

  if (!siteUrl) {
    return defaultSiteUrl
  }

  return siteUrl.replace(/\/+$/, "")
}

function toAbsoluteUrl(pathname: string) {
  return `${getBaseUrl()}${pathname}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/news/",
    "/championship/",
    "/filmy/",
    "/finansowanie/",
    "/marka/",
  ]

  const championshipRoutes = getChampionshipSlugs().map((slug) => `/${slug}/`)
  const newsRoutes = getAllNewsPosts().map((post) => `/news/${post.slug}/`)
  const stowarzyszenieRoutes = getStowarzyszeniePages().map(
    (page) => `/stowarzyszenie/${page.slug}/`
  )
  const pozostaleRoutes = getPozostalePages().map(
    (page) => `/pozostale/${page.slug}/`
  )

  return [
    ...staticRoutes,
    ...championshipRoutes,
    ...newsRoutes,
    ...stowarzyszenieRoutes,
    ...pozostaleRoutes,
  ].map((pathname) => ({
    url: toAbsoluteUrl(pathname),
  }))
}
