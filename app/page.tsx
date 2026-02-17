import Link from "next/link"

import { Icon } from "@/components/icon"
import { NewsCard } from "@/components/cards"
import { TeamsCarousel } from "@/components/home/TeamsCarousel"
import { SponsorsCarousel } from "@/components/home/SponsorsCarousel"
import {
  formatDateLong,
  formatDateShort,
  getAllNewsPosts,
  getFunding,
  getHomePage,
  getSponsors,
  getTeams,
} from "@/lib/content"

export default function HomePage() {
  const home = getHomePage()
  const teams = getTeams()
  const newsPosts = getAllNewsPosts().slice(0, 3)
  const sponsors = getSponsors()
  const funding = getFunding().slice(0, 3)

  const titleParts = home.hero.title.split(" ")
  const highlight = titleParts.pop() ?? ""
  const prefix = titleParts.join(" ")

  return (
    <main>
      <section className="relative w-full border-b border-pink-100 overflow-hidden min-h-[600px] lg:min-h-[85vh] flex items-center justify-center bg-hero-gradient">
        <div className="absolute inset-0 grain-overlay pointer-events-none z-10" />
        <div className="relative z-20 flex flex-col gap-8 max-w-5xl px-4 text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-text-dark text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-serif font-bold leading-[0.95] tracking-tight mb-6 drop-shadow-sm">
              {prefix} <br />
              <span className="italic text-primary-hover relative inline-block">
                {highlight}
                <svg
                  className="absolute -bottom-2 w-full h-3 text-pink-300 opacity-60"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 10"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-gray-700 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
              {home.hero.subtitle}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-4">
            <Link
              href={home.hero.primaryCta.href}
              className="h-14 px-10 rounded-full bg-primary text-white text-lg font-bold hover:bg-primary-hover transition-all shadow-[0_20px_40px_-15px_rgba(236,72,153,0.3)] hover:-translate-y-1 flex items-center justify-center"
            >
              {home.hero.primaryCta.label}
            </Link>
            <Link
              href={home.hero.secondaryCta.href}
              className="h-14 px-10 rounded-full bg-white text-text-dark border border-gray-200 text-lg font-bold hover:bg-gray-50 transition-all shadow-lg hover:-translate-y-1 flex items-center justify-center"
            >
              {home.hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <TeamsCarousel
        eyebrow={home.teamsSection.eyebrow}
        title={home.teamsSection.title}
        teams={teams}
      />

      <section className="py-32 bg-background-soft">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
          <div className="flex items-end justify-between mb-12 border-b border-pink-200 pb-6">
            <div>
              <h2 className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2 pl-1">
                {home.newsSection.eyebrow}
              </h2>
              <h3 className="text-text-dark text-3xl font-serif font-bold tracking-tight">
                {home.newsSection.title}
              </h3>
            </div>
            <Link
              className="hidden sm:flex text-gray-500 font-medium text-sm hover:text-primary transition-colors items-center gap-2 group border-b border-transparent hover:border-primary pb-0.5"
              href={home.newsSection.ctaHref}
            >
              {home.newsSection.ctaLabel}
              <Icon
                name="arrow_forward"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsPosts.map((post) => (
              <NewsCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={formatDateShort(post.date)}
                category={post.category}
                href={`/news/${post.slug}/`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-pink-50 to-transparent opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-pink-50 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1000px] mx-auto px-4 lg:px-10 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-pink-100 w-fit mx-auto mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#ec4899]" />
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
              {home.eventHighlight.eyebrow}
            </span>
          </div>
          <h2 className="text-text-dark text-3xl md:text-5xl font-serif font-bold leading-tight mb-10">
            {home.eventHighlight.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
            <div className="bg-white border border-pink-100 p-0 rounded-2xl flex overflow-hidden hover:shadow-lg transition-all group cursor-default shadow-sm">
              <div className="bg-pink-50 w-16 md:w-20 flex items-center justify-center border-r border-pink-100">
                <Icon name="calendar_month" className="size-7 text-primary" />
              </div>
              <div className="p-6 text-left flex flex-col justify-center">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                  Data & Czas
                </span>
                <h4 className="text-gray-800 font-serif font-bold text-2xl">
                  {formatDateLong(home.eventHighlight.date, "pl-PL")}
                </h4>
                <p className="text-gray-500 text-sm font-light opacity-80 mt-1">
                  {home.eventHighlight.time}
                </p>
              </div>
            </div>
            <div className="bg-white border border-pink-100 p-0 rounded-2xl flex overflow-hidden hover:shadow-lg transition-all group cursor-default shadow-sm">
              <div className="bg-pink-50 w-16 md:w-20 flex items-center justify-center border-r border-pink-100">
                <Icon name="location_on" className="size-7 text-primary" />
              </div>
              <div className="p-6 text-left flex flex-col justify-center">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                  Lokalizacja
                </span>
                <h4 className="text-gray-800 font-serif font-bold text-2xl">
                  {home.eventHighlight.location}
                </h4>
                <p className="text-gray-500 text-sm font-light opacity-80 mt-1">
                  {home.eventHighlight.venue}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={home.eventHighlight.primaryCta.href}
              className="h-10 px-6 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-pink-200"
            >
              {home.eventHighlight.primaryCta.label}
            </Link>
            <Link
              href={home.eventHighlight.secondaryCta.href}
              className="h-10 px-6 rounded-full bg-transparent border border-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-50 transition-colors"
            >
              {home.eventHighlight.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background-soft">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-5/12">
              <h2 className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3">
                {home.videoHighlight.eyebrow}
              </h2>
              <h3 className="text-text-dark text-3xl lg:text-4xl font-serif font-bold mb-4">
                {home.videoHighlight.title}
              </h3>
              <p className="text-gray-600 mb-6 font-light leading-relaxed">
                {home.videoHighlight.description}
              </p>
              <Link
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                href={home.videoHighlight.ctaHref}
              >
                {home.videoHighlight.ctaLabel}
                <Icon name="arrow_forward" className="size-4" />
              </Link>
            </div>
            <div className="w-full lg:w-7/12">
              <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl shadow-pink-100 border border-pink-100 relative group">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                  frameBorder={0}
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={`https://www.youtube.com/embed/${home.videoHighlight.youtubeId}?si=placeholder`}
                  title="YouTube video player"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" className="bg-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#be185d]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="max-w-[960px] mx-auto px-4 text-center relative z-10">
          <h2 className="text-white text-5xl lg:text-6xl font-serif font-bold mb-6 tracking-tight">
            {home.ctaBand.title}
          </h2>
          <p className="text-pink-100 text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            {home.ctaBand.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href={home.ctaBand.primaryCta.href}
              className="bg-white text-primary text-base font-bold py-4 px-12 rounded-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] hover:bg-pink-50 hover:scale-105 transition-all"
            >
              {home.ctaBand.primaryCta.label}
            </Link>
            <Link
              href={home.ctaBand.secondaryCta.href}
              className="bg-transparent border border-white/30 text-white text-base font-bold py-4 px-12 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              {home.ctaBand.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <SponsorsCarousel
        eyebrow={home.sponsorsSection.eyebrow}
        title={home.sponsorsSection.title}
        sponsors={sponsors}
      />

      <section className="py-16 bg-background-soft border-t border-pink-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-pink-100 mb-3 shadow-sm">
                <Icon name="verified" className="size-4 text-primary" />
                <span className="text-primary text-xs font-bold uppercase tracking-wider">
                  {home.fundingSummarySection.eyebrow}
                </span>
              </div>
              <h2 className="text-text-dark text-3xl font-serif font-bold tracking-tight mb-2">
                {home.fundingSummarySection.title}
              </h2>
              <p className="text-gray-600 text-base font-light leading-relaxed">
                {home.fundingSummarySection.description}
              </p>
            </div>
            <Link
              href={home.fundingSummarySection.ctaHref}
              className="mt-4 md:mt-0 px-6 py-2 bg-white text-primary border border-pink-100 rounded-full font-bold text-sm shadow-sm hover:shadow-md hover:bg-pink-50 transition-all flex items-center gap-2"
            >
              {home.fundingSummarySection.ctaLabel}
              <Icon name="arrow_forward" className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funding.map((grant) => (
              <div
                key={grant.title}
                className="bg-white p-6 rounded-2xl shadow-sm border border-pink-50 hover:shadow-lg hover:border-pink-100 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center p-2 border border-gray-100">
                    <Icon
                      name={grant.icon}
                      className="size-6 text-gray-400"
                      style={{ color: grant.accentColor }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base leading-tight">
                      {grant.organization}
                    </h4>
                    <span className="text-xs text-primary font-medium uppercase tracking-wide">
                      {grant.period}
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {grant.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
