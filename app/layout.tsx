import type { Metadata } from "next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GoogleAnalytics } from "@/components/google-analytics"
import {
  getChampionshipNavItems,
  getPozostalePages,
  getSiteConfig,
} from "@/lib/content"

export const metadata: Metadata = {
  title: { default: "Cheerleaders Kraków", template: "%s | Cheerleaders Kraków" },
  description:
    "Cheerleaders Kraków. Treningi cheerleadingu sportowego, wyniki naszych drużyn i Międzynarodowe Mistrzostwa Cheerleadingu w Krakowie.",
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
      const [latest] = championshipNavItems
      return {
        ...item,
        href: item.href ?? latest?.href,
        children: [
          ...(item.children ?? []),
          ...championshipNavItems.map((entry) => ({
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
      <body className="min-h-screen bg-background text-text-dark font-sans antialiased selection:bg-primary selection:text-white">
        <a href="#main-content" className="skip-link">Przejdź do treści</a>
        <GoogleAnalytics />
        <SiteHeader site={resolvedSite} />
        {children}
        <SiteFooter site={resolvedSite} />
      </body>
    </html>
  )
}
