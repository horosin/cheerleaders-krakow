"use client"

import * as React from "react"
import Link from "next/link"

import type { ChampionshipPage, ChampionshipSection } from "@/lib/content/types"
import { formatDateRange } from "@/lib/content/date"
import { Icon } from "@/components/icon"
import { cn } from "@/lib/utils"

type SectionView = ChampionshipSection & { bodyHtml: string }

type ChampionshipPageView = ChampionshipPage & {
  richTextHtml?: string
}

type ChampionshipContent = {
  page: ChampionshipPageView
  sections: SectionView[]
}

type ChampionshipViewProps = {
  pl: ChampionshipContent
  en: ChampionshipContent
}

export function ChampionshipView({ pl, en }: ChampionshipViewProps) {
  const [lang, setLang] = React.useState<"pl" | "en">("pl")
  const [copiedAddressSection, setCopiedAddressSection] = React.useState<
    string | null
  >(null)
  const active = lang === "pl" ? pl : en
  const locale = lang === "pl" ? "pl-PL" : "en-US"
  const moreLabel = lang === "pl" ? "Więcej" : "More"
  const addressLabel = lang === "pl" ? "Adres" : "Address"
  const copyAddressLabel = lang === "pl" ? "Kopiuj adres" : "Copy address"
  const copiedLabel = lang === "pl" ? "Skopiowano" : "Copied"
  const sections = active.sections

  const navigationSections = [
    ...sections.map((section) => ({
      id: section.id,
      navLabel: section.navLabel ?? section.title,
      icon: section.icon,
    })),
    ...(active.page.richTextHtml
      ? [{ id: "more", navLabel: moreLabel, icon: "notes" }]
      : []),
  ]

  const proseClassName =
    "prose prose-lg max-w-none font-normal leading-loose text-text-dark prose-headings:font-serif prose-headings:text-text-dark prose-h2:mt-10 prose-h2:text-3xl prose-h3:mt-8 prose-h3:text-2xl prose-p:text-text-dark prose-li:text-text-dark prose-strong:text-text-dark"

  const copyAddress = React.useCallback(async (sectionId: string, text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const input = document.createElement("textarea")
        input.value = text
        document.body.appendChild(input)
        input.select()
        document.execCommand("copy")
        document.body.removeChild(input)
      }
      setCopiedAddressSection(sectionId)
      window.setTimeout(() => {
        setCopiedAddressSection((current) =>
          current === sectionId ? null : current
        )
      }, 1800)
    } catch {
      setCopiedAddressSection(null)
    }
  }, [])

  return (
    <>
      <div className="w-full relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-pink-50 to-pink-100" />
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#db2777 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 w-full flex flex-col justify-center items-center text-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white border border-pink-100 shadow-sm">
              <span className="text-[10px] font-bold text-text-dark uppercase tracking-widest px-2 opacity-60">
                Lang
              </span>
              <div className="flex rounded-full bg-pink-50 p-1">
                <button
                  className={cn(
                    "px-3 py-1 rounded-full text-[11px] font-bold transition-all",
                    lang === "pl"
                      ? "bg-white text-text-dark shadow-sm"
                      : "text-gray-500 hover:text-text-dark"
                  )}
                  onClick={() => setLang("pl")}
                >
                  PL
                </button>
                <button
                  className={cn(
                    "px-3 py-1 rounded-full text-[11px] font-bold transition-all",
                    lang === "en"
                      ? "bg-white text-text-dark shadow-sm"
                      : "text-gray-500 hover:text-text-dark"
                  )}
                  onClick={() => setLang("en")}
                >
                  EN
                </button>
              </div>
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-pink-100 text-primary text-xs font-bold uppercase tracking-widest shadow-sm">
              <span className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_currentColor]" />
              {active.page.eyebrow}
            </div>
          </div>
          <h1 className="text-text-dark font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.1] tracking-tight max-w-5xl drop-shadow-sm">
            {active.page.title}
            <br />
            <span className="text-primary font-bold">{active.page.subtitle}</span>
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-text-dark/80 text-sm md:text-lg font-medium tracking-wide">
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/50 shadow-sm">
              <Icon
                name="calendar_month"
                className="size-5 text-primary"
                strokeWidth={1.5}
              />
              {formatDateRange(
                active.page.dateStart,
                active.page.dateEnd,
                locale
              )}
            </div>
            <div className="hidden md:block w-px h-8 bg-text-dark/10" />
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/50 shadow-sm">
              <Icon
                name="location_on"
                className="size-5 text-primary"
                strokeWidth={1.5}
              />
              {active.page.location}
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-5 w-full justify-center">
            {active.page.ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                className={cn(
                  "h-14 px-10 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3",
                  cta.variant === "primary"
                    ? "bg-primary hover:bg-primary-hover text-white shadow-[0_0_20px_rgba(219,39,119,0.25)]"
                    : "bg-white hover:bg-pink-50 text-text-dark shadow-lg border border-pink-100"
                )}
              >
                <span>{cta.label}</span>
                <Icon
                  name={cta.variant === "primary" ? "arrow_forward" : "play_circle"}
                  className="size-5"
                  strokeWidth={1.5}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 flex flex-col gap-8">
              <nav className="flex flex-col gap-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-2 opacity-70">
                  Navigation
                </p>
                {navigationSections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={cn(
                      "group flex items-center gap-4 px-5 py-3.5 rounded-full transition-all border",
                      index === 0
                        ? "bg-white shadow-sm text-primary font-bold border-pink-100"
                        : "hover:bg-pink-50 text-text-dark hover:text-primary border-transparent"
                    )}
                  >
                    <Icon
                      name={section.icon ?? "arrow_forward"}
                      className={cn(
                        "size-5",
                        index === 0
                          ? "text-primary"
                          : "text-gray-400 group-hover:text-primary"
                      )}
                      strokeWidth={index === 0 ? 2 : 1.5}
                    />
                    {section.navLabel}
                  </a>
                ))}
              </nav>
              <div className="p-8 bg-gradient-to-br from-primary to-pink-600 rounded-3xl text-white shadow-[0_0_20px_rgba(219,39,119,0.35)] mt-4 relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 size-32 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all" />
                <p className="font-serif font-bold text-xl mb-2 relative z-10">
                  {active.page.sidebarHelp.title}
                </p>
                <p className="text-sm text-white/90 mb-6 leading-relaxed relative z-10 font-normal">
                  {active.page.sidebarHelp.description}
                </p>
                <a
                  className="inline-flex items-center gap-2 text-sm font-bold bg-white text-primary hover:bg-pink-50 px-5 py-2.5 rounded-full transition-colors relative z-10 shadow-sm"
                  href={active.page.sidebarHelp.ctaHref}
                >
                  {active.page.sidebarHelp.ctaLabel}
                  <Icon name="arrow_outward" className="size-4" />
                </a>
              </div>
            </div>
          </aside>

          <div className="flex-1 flex flex-col gap-24 min-w-0">
            <div className="flex items-center flex-wrap gap-3 text-xs uppercase tracking-widest text-gray-400">
              <Link className="hover:text-primary transition-colors" href="/">
                Home
              </Link>
              <Icon name="arrow_forward" className="size-3 text-gray-400" />
              <span className="text-primary font-bold">
                {active.page.title}
              </span>
            </div>

            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32"
              >
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-dark mb-8">
                  {section.title}
                </h2>
                {section.bodyHtml && (
                  <div
                    className={proseClassName}
                    dangerouslySetInnerHTML={{ __html: section.bodyHtml }}
                  />
                )}

                {section.cards && section.cards.length > 0 && (
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.cards.map((card) => {
                      const cardHref = card.file ?? card.href ?? "#"
                      return (
                        <a
                          key={card.title}
                          href={cardHref}
                          className="group bg-white border border-pink-100 rounded-3xl p-6 flex flex-col gap-3 shadow-[0_10px_30px_-15px_rgba(219,39,119,0.15)] hover:shadow-[0_20px_40px_-15px_rgba(219,39,119,0.25)] transition-all"
                        >
                          <div className="flex items-center gap-3 text-primary">
                            {card.icon && (
                              <Icon name={card.icon} className="size-8 text-primary" />
                            )}
                            <h3 className="text-xl font-serif font-bold text-text-dark">
                              {card.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {card.description}
                          </p>
                          {card.meta && (
                            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                              {card.meta}
                            </span>
                          )}
                        </a>
                      )
                    })}
                  </div>
                )}

                {section.mapEmbed && (
                  <div className="mt-10 flex flex-col gap-4">
                    {section.address && (
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                            {addressLabel}
                          </p>
                          <p className="text-sm md:text-base text-text-dark">
                            {section.address}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            section.address && copyAddress(section.id, section.address)
                          }
                          className="inline-flex items-center justify-center rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-bold text-primary hover:bg-pink-100 transition-colors"
                        >
                          {copiedAddressSection === section.id
                            ? copiedLabel
                            : copyAddressLabel}
                        </button>
                      </div>
                    )}
                    <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden border border-pink-100 shadow-sm">
                      <iframe
                        src={section.mapEmbed}
                        className="w-full h-full"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Map"
                      />
                    </div>
                  </div>
                )}

                {section.image && (
                  <div className="mt-10 rounded-3xl overflow-hidden border border-pink-100 shadow-sm">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </section>
            ))}

            {active.page.richTextHtml && (
              <section id="more" className="scroll-mt-32">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-dark mb-8">
                  {moreLabel}
                </h2>
                <div
                  className={proseClassName}
                  dangerouslySetInnerHTML={{
                    __html: active.page.richTextHtml,
                  }}
                />
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
