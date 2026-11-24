import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, MapPin, Play } from "lucide-react"

import { NewsCard } from "@/components/cards"
import { Button } from "@/components/ui/button"
import {
  formatDateRange,
  getAllNewsPosts,
  getChampionshipContentBySlug,
  getHomePage,
  getLatestChampionshipSlug,
  getSiteConfig,
} from "@/lib/content"

export default function HomePage() {
  const home = getHomePage()
  const site = getSiteConfig()
  const newsPosts = getAllNewsPosts().slice(0, 3)
  const championshipSlug = getLatestChampionshipSlug()
  const championship = championshipSlug && getChampionshipContentBySlug(championshipSlug, "pl")
  const titleBreak = home.hero.title.lastIndexOf(" ")
  const venue = championship ? championship.sections.find((section) => section.id === "venue") : undefined

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="home-hero">
        <div className="site-shell hero-grid">
          <div className="hero-copy">
            {home.hero.eyebrow && <p className="eyebrow hero-kicker">{home.hero.eyebrow}</p>}
            <h1>
              {titleBreak > 0 ? (
                <>{home.hero.title.slice(0, titleBreak)}{" "}<em>{home.hero.title.slice(titleBreak + 1)}</em></>
              ) : home.hero.title}
            </h1>
            <p className="hero-subtitle">{home.hero.subtitle}</p>
            <div className="hero-actions">
              <Button asChild className="action-button">
                <Link href={home.hero.primaryCta.href}>
                  {home.hero.primaryCta.label}<ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
              <Link href={home.hero.secondaryCta.href} className="text-link">
                {home.hero.secondaryCta.label}<ArrowDown aria-hidden="true" />
              </Link>
            </div>
          </div>
          {home.hero.image && (
            <figure className="hero-photo">
              <Image
                src={home.hero.image}
                alt={home.hero.imageAlt ?? ""}
                fill
                preload
                sizes="(max-width: 767px) 100vw, 52vw"
              />
              {home.hero.imageCaption && <figcaption>{home.hero.imageCaption}</figcaption>}
            </figure>
          )}
        </div>
      </section>

      {championship && (
        <section className="event-strip" aria-labelledby="home-championship">
          <div className="site-shell event-strip-inner">
            <div>
              <p className="eyebrow">Championship</p>
              <h2 id="home-championship">{championship.page.title}</h2>
            </div>
            <div className="event-strip-details">
              <p><CalendarDays aria-hidden="true" />{formatDateRange(championship.page.dateStart, championship.page.dateEnd, "pl-PL")}</p>
              <p><MapPin aria-hidden="true" />{venue?.address?.split(",")[0] || championship.page.location}</p>
            </div>
            <Link href="/championship/" className="text-link">
              Szczegóły zawodów<ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}

      <section id="teams" className="home-section site-shell split-section">
        <div>
          <p className="eyebrow">{home.teamsSection.eyebrow}</p>
          <h2 className="section-title">{home.teamsSection.title}</h2>
          {home.teamsSection.subtitle && <p className="section-description">{home.teamsSection.subtitle}</p>}
          <Link href="/stowarzyszenie/o-nas/" className="text-link mt-5">
            O stowarzyszeniu<ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="team-roster">
          {home.teamsSection.teams.map((team) => (
            <li key={team.name}>
              <h3>{team.name}</h3>
              <p>{team.coach.trim()}</p>
            </li>
          ))}
        </ul>
      </section>

      {newsPosts.length > 0 && (
        <section className="home-section news-band">
          <div className="site-shell">
            <div className="section-heading">
              <h2 className="section-title">{home.newsSection.title}</h2>
              <Link href={home.newsSection.ctaHref} className="text-link">
                {home.newsSection.ctaLabel}<ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="news-grid">
              {newsPosts.map((post) => <NewsCard key={post.slug} post={post} />)}
            </div>
          </div>
        </section>
      )}

      <section className="home-section site-shell split-section video-section">
        <div>
          <p className="eyebrow">{home.videoHighlight.eyebrow}</p>
          <h2 className="section-title">{home.videoHighlight.title}</h2>
          <p className="section-description">{home.videoHighlight.description}</p>
          <Link href={home.videoHighlight.ctaHref} className="text-link mt-5">
            {home.videoHighlight.ctaLabel}<ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${home.videoHighlight.youtubeId}`}
          className="video-cover"
          aria-label={`${home.videoHighlight.title} – obejrzyj na YouTube`}
        >
          <img src={`https://i.ytimg.com/vi/${home.videoHighlight.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" />
          <span><Play aria-hidden="true" fill="currentColor" size={20} /> Obejrzyj na YouTube</span>
        </a>
      </section>

      <section id="kontakt" className="home-section join-band">
        <div className="site-shell join-inner">
          <div>
            <h2 className="section-title">{home.ctaBand.title}</h2>
            <p className="section-description">{home.ctaBand.description}</p>
          </div>
          <div className="join-actions">
            <Button asChild className="action-button">
              <Link href={home.ctaBand.primaryCta.href}>
                {home.ctaBand.primaryCta.label}<ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
            <Link href={home.ctaBand.secondaryCta.href} className="text-link">
              {home.ctaBand.secondaryCta.label}<ArrowRight aria-hidden="true" />
            </Link>
            {site.contact?.addressLines?.map((line) => <p key={line} className="training-address">{line}</p>)}
          </div>
        </div>
      </section>

      <section className="home-section site-shell partners-section">
        <div className="section-heading">
          <h2 className="section-title">{home.sponsorsSection.title}</h2>
          <Link href={home.fundingSummarySection.ctaHref} className="text-link">
            {home.fundingSummarySection.title}<ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="partner-list">
          {home.sponsorsSection.sponsors.map((sponsor) => {
            const logo = sponsor.logo
              ? <img src={sponsor.logo} alt={sponsor.name} loading="lazy" />
              : sponsor.name
            return (
              <li key={sponsor.name}>
                {sponsor.href ? <a href={sponsor.href}>{logo}</a> : logo}
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
