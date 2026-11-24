"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react"

import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"
import type { ChampionshipPage, ChampionshipSection, NavItemChild } from "@/lib/content/types"
import { formatDateRange } from "@/lib/content/date"
import { cn } from "@/lib/utils"

type SectionView = ChampionshipSection & { bodyHtml: string }

type ChampionshipContent = {
  page: ChampionshipPage & { richTextHtml?: string }
  sections: SectionView[]
}

type ChampionshipViewProps = {
  pl: ChampionshipContent
  en: ChampionshipContent
  editions: NavItemChild[]
  currentEdition: string
}

const labels = {
  pl: {
    language: "Język strony zawodów",
    contents: "Na tej stronie",
    archive: "Edycje mistrzostw",
    video: "Wideorelacja",
    more: "Informacje dodatkowe",
    copy: "Kopiuj adres",
    copied: "Skopiowano adres.",
    copyFailed: "Skopiuj adres ręcznie.",
    map: "Mapa dojazdu",
    youtube: "Obejrzyj na YouTube",
  },
  en: {
    language: "Event page language",
    contents: "On this page",
    archive: "Championship editions",
    video: "Video report",
    more: "Additional information",
    copy: "Copy address",
    copied: "Address copied.",
    copyFailed: "Copy the address manually.",
    map: "Venue map",
    youtube: "Watch on YouTube",
  },
}

function getYouTubeEmbedUrl(videoUrl?: string) {
  if (!videoUrl?.trim()) return null

  try {
    const parsed = new URL(videoUrl.trim())
    const hostname = parsed.hostname.replace(/^www\./, "")
    let videoId = ""

    if (hostname === "youtu.be") {
      videoId = parsed.pathname.split("/").filter(Boolean)[0] ?? ""
    } else if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v") ?? ""
      } else if (parsed.pathname.startsWith("/embed/") || parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/")[2] ?? ""
      }
    }

    return /^[\w-]{11}$/.test(videoId) ? `https://www.youtube-nocookie.com/embed/${videoId}` : null
  } catch {
    return null
  }
}

export function ChampionshipView({ pl, en, editions, currentEdition }: ChampionshipViewProps) {
  const [lang, setLang] = useState<"pl" | "en">("pl")
  const [copyResult, setCopyResult] = useState<{ id: string; success: boolean } | null>(null)
  const { page, sections } = lang === "pl" ? pl : en
  const t = labels[lang]
  const locale = lang === "pl" ? "pl-PL" : "en-US"
  const videoUrl = page.videoUrl?.trim() || (lang === "pl" ? en.page.videoUrl : pl.page.videoUrl)?.trim()
  const videoEmbedUrl = getYouTubeEmbedUrl(videoUrl)
  const navigationSections = [
    ...sections.map((section) => ({ id: section.id, label: section.navLabel ?? section.title, icon: section.icon })),
    ...(videoEmbedUrl ? [{ id: "video-report", label: t.video, icon: "play_circle" }] : []),
    ...(page.richTextHtml ? [{ id: "more", label: t.more, icon: "notes" }] : []),
  ]

  async function copyAddress(id: string, address: string) {
    try {
      await navigator.clipboard.writeText(address)
      setCopyResult({ id, success: true })
    } catch {
      setCopyResult({ id, success: false })
    }
  }

  return (
    <main id="main-content" tabIndex={-1} lang={lang}>
      <header className="championship-masthead">
        <div className="site-shell">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            {page.eyebrow !== page.title && <p className="eyebrow">{page.eyebrow}</p>}
            <div className="ml-auto inline-flex gap-1 rounded-md border border-white/30 p-1" role="group" aria-label={t.language}>
              {(["pl", "en"] as const).map((language) => (
                <button
                  key={language}
                  type="button"
                  lang={language}
                  aria-label={language === "pl" ? "Polski" : "English"}
                  aria-pressed={lang === language}
                  className="min-h-10 min-w-10 cursor-pointer rounded-sm px-3 text-sm font-bold uppercase aria-pressed:bg-white aria-pressed:text-text-dark"
                  onClick={() => { setLang(language); setCopyResult(null) }}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>
          <h1>{page.title}</h1>
          {page.subtitle && <p className="championship-subtitle">{page.subtitle}</p>}
          {!page.subtitle && <ul className="championship-facts">
            <li><CalendarDays aria-hidden="true" />{formatDateRange(page.dateStart, page.dateEnd, locale)}</li>
            <li><MapPin aria-hidden="true" />{page.location}</li>
          </ul>}
          {page.ctas.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {page.ctas.map((cta) => (
                <Button asChild className={cn("action-button", cta.variant === "secondary" && "bg-white text-text-dark hover:bg-pink-100")} key={cta.label}>
                  <a href={cta.href}>{cta.label}<ArrowUpRight aria-hidden="true" /></a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="site-shell home-section championship-layout">
        <aside>
          <nav aria-label={t.contents} className="championship-nav">
            <p className="eyebrow">{t.contents}</p>
            <ul>
              {navigationSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="gap-2">
                    {section.icon && <Icon name={section.icon} className="size-4 text-primary" />}
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {editions.length > 1 && (
            <nav aria-label={t.archive} className="championship-nav">
              <p className="eyebrow">{t.archive}</p>
              <ul className="edition-list">
                {editions.map((edition) => (
                  <li key={edition.href}>
                    <Link href={edition.href} aria-current={edition.href === currentEdition ? "page" : undefined}>
                      {edition.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {page.sidebarHelp && (
            <div className="championship-nav">
              <p className="font-bold">{page.sidebarHelp.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{page.sidebarHelp.description}</p>
              <a href={page.sidebarHelp.ctaHref} className="text-link">{page.sidebarHelp.ctaLabel}<ArrowUpRight aria-hidden="true" /></a>
            </div>
          )}
        </aside>

        <div className="championship-sections">
          {sections.map((section) => {
            const address = section.address
            return (
              <section key={section.id} id={section.id}>
                <h2 className="section-title">{section.title}</h2>
                {section.bodyHtml && <div className="prose" dangerouslySetInnerHTML={{ __html: section.bodyHtml }} />}
                {!!section.cards?.length && (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {section.cards.map((card) => {
                      const href = card.file ?? card.href
                      return (
                        <li key={card.title} className="event-resource">
                          <h3 className="flex items-baseline gap-2">
                            {card.icon && <Icon name={card.icon} className="size-4 text-primary" />}
                            {href ? <a href={href}>{card.title}<ArrowUpRight size={16} aria-hidden="true" /></a> : card.title}
                          </h3>
                          <p>{card.description}</p>
                          {card.meta && <p className="mt-2 text-xs font-bold">{card.meta}</p>}
                        </li>
                      )
                    })}
                  </ul>
                )}
                {address && (
                  <div className="event-address">
                    <p><MapPin size={18} aria-hidden="true" />{address}</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 w-fit rounded-md"
                      onClick={() => copyAddress(section.id, address)}
                    >
                      {t.copy}
                    </Button>
                    <p role="status" className="w-full text-sm text-muted-foreground empty:hidden">
                      {copyResult?.id === section.id && (copyResult.success ? t.copied : t.copyFailed)}
                    </p>
                  </div>
                )}
                {section.mapEmbed && (
                  <iframe src={section.mapEmbed} className="mt-3 aspect-video w-full border border-border" title={t.map} loading="lazy" allowFullScreen />
                )}
                {section.image && <img src={section.image} alt="" loading="lazy" className="mt-4 w-full" />}
              </section>
            )
          })}

          {videoEmbedUrl && (
            <section id="video-report">
              <h2 className="section-title">{t.video}</h2>
              <iframe
                src={videoEmbedUrl}
                className="aspect-video w-full border border-border"
                title={t.video}
                loading="lazy"
                allow="encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
              <a href={videoUrl} className="text-link mt-2">{t.youtube}<ArrowUpRight aria-hidden="true" /></a>
            </section>
          )}
          {page.richTextHtml && (
            <section id="more">
              <h2 className="section-title">{t.more}</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: page.richTextHtml }} />
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
