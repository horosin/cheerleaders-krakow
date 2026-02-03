"use client"

import * as React from "react"
import Link from "next/link"

import type { ChampionshipPage, ChampionshipSection } from "@/lib/content/types"
import { formatDateRange } from "@/lib/content/date"
import { Icon } from "@/components/icon"
import { cn } from "@/lib/utils"

type SectionView = ChampionshipSection & { bodyHtml: string }

type ChampionshipContent = {
  page: ChampionshipPage
  sections: SectionView[]
}

type ChampionshipViewProps = {
  pl: ChampionshipContent
  en: ChampionshipContent
}

export function ChampionshipView({ pl, en }: ChampionshipViewProps) {
  const [lang, setLang] = React.useState<"pl" | "en">("pl")
  const active = lang === "pl" ? pl : en
  const locale = lang === "pl" ? "pl-PL" : "en-US"

  const sectionsById = React.useMemo(() => {
    const map = new Map<string, SectionView>()
    active.sections.forEach((section) => map.set(section.id, section))
    return map
  }, [active.sections])

  const orderedSections = active.page.sectionsOrder
    .map((id) => sectionsById.get(id))
    .filter((section): section is SectionView => Boolean(section))

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
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-pink-100 text-primary text-xs font-bold uppercase tracking-widest shadow-sm">
            <span className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_currentColor]" />
            {active.page.eyebrow}
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
              <div className="p-2 bg-pink-50/50 rounded-2xl flex items-center gap-2 border border-pink-100">
                <span className="text-xs font-bold text-text-dark uppercase tracking-widest px-3 opacity-60">
                  Lang:
                </span>
                <div className="flex flex-1 bg-white rounded-xl p-1 shadow-sm border border-pink-50">
                  <button
                    className={cn(
                      "flex-1 py-1.5 rounded-lg text-xs font-bold text-center transition-all",
                      lang === "pl"
                        ? "bg-pink-50 text-text-dark shadow-sm"
                        : "text-gray-500 hover:text-text-dark hover:bg-pink-50/50"
                    )}
                    onClick={() => setLang("pl")}
                  >
                    PL
                  </button>
                  <button
                    className={cn(
                      "flex-1 py-1.5 rounded-lg text-xs font-bold text-center transition-all",
                      lang === "en"
                        ? "bg-pink-50 text-text-dark shadow-sm"
                        : "text-gray-500 hover:text-text-dark hover:bg-pink-50/50"
                    )}
                    onClick={() => setLang("en")}
                  >
                    EN
                  </button>
                </div>
              </div>
              <nav className="flex flex-col gap-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-2 opacity-70">
                  Navigation
                </p>
                {orderedSections.map((section, index) => (
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

            <div className="flex lg:hidden items-center gap-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Lang
              </span>
              <div className="flex bg-white rounded-xl p-1 shadow-sm border border-pink-50">
                <button
                  className={cn(
                    "flex-1 px-3 py-1.5 rounded-lg text-xs font-bold text-center transition-all",
                    lang === "pl"
                      ? "bg-pink-50 text-text-dark shadow-sm"
                      : "text-gray-500 hover:text-text-dark hover:bg-pink-50/50"
                  )}
                  onClick={() => setLang("pl")}
                >
                  PL
                </button>
                <button
                  className={cn(
                    "flex-1 px-3 py-1.5 rounded-lg text-xs font-bold text-center transition-all",
                    lang === "en"
                      ? "bg-pink-50 text-text-dark shadow-sm"
                      : "text-gray-500 hover:text-text-dark hover:bg-pink-50/50"
                  )}
                  onClick={() => setLang("en")}
                >
                  EN
                </button>
              </div>
            </div>

            {orderedSections.map((section) => (
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
                    className="prose prose-lg max-w-none font-normal leading-loose text-text-dark"
                    dangerouslySetInnerHTML={{ __html: section.bodyHtml }}
                  />
                )}

                {section.cards && section.cards.length > 0 && (
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.cards.map((card) => (
                      <a
                        key={card.title}
                        href={card.href ?? "#"}
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
                    ))}
                  </div>
                )}

                {section.mapEmbed && (
                  <div className="mt-10 aspect-[16/9] w-full rounded-3xl overflow-hidden border border-pink-100 shadow-sm">
                    <iframe
                      src={section.mapEmbed}
                      className="w-full h-full"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Map"
                    />
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
          </div>
        </div>
      </main>
    </>
  )
}
