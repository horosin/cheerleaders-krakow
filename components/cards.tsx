import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/icon"

export function TeamCard({
  name,
  coach,
  icon,
}: {
  name: string
  coach: string
  icon: string
}) {
  return (
    <div className="snap-start shrink-0 w-[260px] flex flex-col items-center justify-center p-10 bg-gray-50 rounded-2xl border border-transparent hover:border-pink-200 hover:shadow-xl hover:shadow-pink-100/40 hover:bg-white transition-all duration-300 group cursor-pointer relative">
      <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
        <Icon
          name={icon}
          className="size-16 text-primary/80 group-hover:text-primary drop-shadow-sm"
          strokeWidth={1.5}
        />
      </div>
      <h4 className="text-2xl font-serif font-bold text-text-dark group-hover:text-primary transition-colors text-center">
        {name}
      </h4>
      <p className="text-sm font-serif italic text-gray-500 mt-2 text-center">
        trener {coach}
      </p>
      <div className="absolute bottom-6 w-8 h-1 bg-gray-200 rounded-full group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
    </div>
  )
}

export function SponsorCard({
  name,
  icon,
  accentColor,
}: {
  name: string
  icon: string
  accentColor: string
}) {
  return (
    <div className="snap-start shrink-0 group cursor-pointer transition-all duration-300">
      <div className="h-28 w-64 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center grayscale group-hover:grayscale-0 group-hover:bg-white group-hover:shadow-xl transition-all duration-300">
        <Icon
          name={icon}
          className="size-12 text-gray-400 transition-colors"
          style={{ color: accentColor }}
          strokeWidth={1.5}
        />
        <span
          className="ml-3 font-bold text-gray-400 group-hover:text-primary text-2xl tracking-tighter transition-colors duration-300"
          style={{ color: accentColor }}
        >
          {name}
        </span>
      </div>
    </div>
  )
}

export function NewsCard({
  title,
  excerpt,
  date,
  category,
  href,
  tagClassName,
}: {
  title: string
  excerpt: string
  date: string
  category: string
  href: string
  tagClassName?: string
}) {
  const safeHref = href.endsWith("/") ? href : `${href}/`
  return (
    <article className="group bg-white p-8 rounded-2xl border border-pink-50 hover:border-pink-200 transition-all duration-300 hover:shadow-xl hover:shadow-pink-100/50 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <span
          className={cn(
            "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border",
            tagClassName ?? "bg-pink-50 text-primary border-pink-100"
          )}
        >
          {category}
        </span>
        <span className="text-gray-400 text-[11px] font-medium">{date}</span>
      </div>
      <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight mb-4">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-4 flex-grow">
        {excerpt}
      </p>
      <div className="mt-auto">
        <Link
          href={safeHref}
          className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          Czytaj więcej
          <Icon name="arrow_forward" className="size-4" />
        </Link>
      </div>
    </article>
  )
}

export function VideoCard({
  title,
  date,
  category,
  thumbnail,
  youtubeId,
}: {
  title: string
  date: string
  category: string
  thumbnail: string
  youtubeId: string
}) {
  return (
    <article className="group cursor-pointer flex flex-col gap-6">
      <a
        href={`https://www.youtube.com/watch?v=${youtubeId}`}
        target="_blank"
        rel="noreferrer"
        className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.3)] transition-all duration-500 border border-pink-50 ring-1 ring-black/5"
      >
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full opacity-95 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-110 group-hover:bg-primary transition-all duration-300 border border-white/20">
        <Icon name="play_arrow" className="size-9 text-white" />
      </div>
        </div>
      </a>
      <div className="flex flex-col gap-3 px-1">
        <div className="flex items-center gap-4 text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">
          <span className="text-primary">{date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{category}</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
          {title}
        </h2>
      </div>
    </article>
  )
}

export function FundingCard({
  organization,
  period,
  title,
  summary,
  reportUrl,
  accentColor,
  icon,
}: {
  organization: string
  period: string
  title: string
  summary: string
  reportUrl?: string
  accentColor: string
  icon: string
}) {
  return (
    <div className="bg-background-soft rounded-2xl p-8 md:p-12 mb-12 border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <div className="w-full md:w-48 flex-shrink-0 flex items-center justify-center bg-white rounded-xl p-6 h-48 border border-pink-50">
          <div className="text-center">
            <Icon
              name={icon}
              className="size-12 mb-2"
              style={{ color: accentColor }}
              strokeWidth={1.5}
            />
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">
              {organization}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <span className="inline-block py-1 px-2.5 rounded bg-white text-primary text-[10px] font-bold uppercase tracking-wider border border-pink-100">
              {organization}
            </span>
            <span className="text-sm text-gray-400 font-mono">
              Realizacja: {period}
            </span>
          </div>
          <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-8">{summary}</p>
          {reportUrl && (
            <div className="flex items-center">
              <a
                href={reportUrl}
                className="group flex items-center justify-center gap-2 rounded-full h-11 px-6 bg-primary text-white text-sm font-semibold tracking-wide hover:bg-primary-hover transition-all shadow-lg shadow-pink-200 hover:shadow-pink-300 hover:-translate-y-0.5"
              >
                <Icon name="download" className="size-4" />
                <span>Pobierz sprawozdanie</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function DownloadCard({
  title,
  detail,
  format,
}: {
  title: string
  detail: string
  format: string
}) {
  return (
    <div className="flex items-center justify-between p-5 rounded-xl border border-gray-200 bg-white hover:border-primary hover:shadow-lg hover:shadow-pink-100/50 transition-all group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center font-bold text-xs border border-gray-100">
          {format}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-800 text-sm">{title}</span>
          <span className="text-[10px] text-gray-500">{detail}</span>
        </div>
      </div>
      <button className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon name="download" className="size-4" />
      </button>
    </div>
  )
}

export function InfoCard({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: string
  href?: string
}) {
  const content = (
    <div className="bg-white border border-pink-100 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-[0_10px_40px_-10px_rgba(219,39,119,0.12)] transition-all duration-300">
      <div className="size-20 flex items-center justify-center bg-pink-50 rounded-2xl text-primary shrink-0">
        <Icon name={icon} className="size-10" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-2xl font-serif font-bold text-text-dark mb-2">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}
