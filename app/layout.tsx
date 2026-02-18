import type { Metadata } from "next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  getChampionshipNavItems,
  getPozostalePages,
  getSiteConfig,
} from "@/lib/content"

export const metadata: Metadata = {
  title: "Cheerleaders Krakow",
  description:
    "Elegancja, pasja i przyjaźń. Cheerleaders Krakow — stowarzyszenie cheerleadingu w Krakowie.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSiteConfig()
  const pozostalePages = getPozostalePages()
  const championshipNavItems = getChampionshipNavItems()
  const resolvedNav = site.nav.map((item) => {
    if (item.autoChildren === "pozostale") {
      const dynamicChildren = pozostalePages.map((page) => ({
        label: page.navLabel ?? page.title,
        href: `/pozostale/${page.slug}/`,
      }))
      return {
        ...item,
        children: [...(item.children ?? []), ...dynamicChildren],
      }
    }
    if (item.autoChildren === "championship") {
      const [latest, ...older] = championshipNavItems
      return {
        ...item,
        label: latest?.label ?? item.label,
        href: latest?.href ?? item.href,
        children: [
          ...(item.children ?? []),
          ...older.map((entry) => ({
            label: entry.label,
            href: entry.href,
          })),
        ],
      }
    }
    return item
  })
  const resolvedSite = { ...site, nav: resolvedNav }
  return (
    <html lang="pl">
      <body className="min-h-screen bg-background-soft text-text-dark font-sans antialiased selection:bg-primary selection:text-white">
        <SiteHeader site={resolvedSite} />
        {children}
        <SiteFooter site={resolvedSite} />
      </body>
    </html>
  )
}
