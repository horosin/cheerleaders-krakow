import Link from "next/link"
import { ArrowRight, ArrowUpRight, Download, Play } from "lucide-react"

import { formatDateLong, formatDateShort } from "@/lib/content/date"
import type { FundingGrant, NewsPost, VideoEntry } from "@/lib/content/types"

export function PostMeta({ post }: { post: Pick<NewsPost, "category" | "date"> }) {
  return (
    <p className="post-meta">
      {post.category && <span>{post.category}</span>}
      {post.date && <time dateTime={post.date}>{formatDateShort(post.date)}</time>}
    </p>
  )
}

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <article className="news-card">
      <PostMeta post={post} />
      <h3>{post.title}</h3>
      <p className="line-clamp-3">{post.excerpt}</p>
      <Link
        href={`/news/${post.slug}/`}
        className="text-link"
        aria-label={`Czytaj więcej: ${post.title}`}
      >
        Czytaj więcej <ArrowRight aria-hidden="true" />
      </Link>
    </article>
  )
}

export function VideoCard({ title, date, category, thumbnail, youtubeId }: VideoEntry) {
  return (
    <article className="grid content-start gap-3">
      <a href={`https://www.youtube.com/watch?v=${youtubeId}`} className="video-cover" aria-label={`${title} – obejrzyj na YouTube`}>
        <img src={thumbnail} alt="" loading="lazy" />
        <span><Play aria-hidden="true" fill="currentColor" size={20} /> Obejrzyj na YouTube</span>
      </a>
      <p className="post-meta">
        {category && <span>{category}</span>}
        {date && <time dateTime={date}>{formatDateLong(date, "pl-PL")}</time>}
      </p>
      <h2 className="font-serif text-2xl leading-tight font-semibold">{title}</h2>
    </article>
  )
}

export function FundingCard({ organization, period, title, summary, reportUrl, supportAmount }: FundingGrant) {
  return (
    <article className="grid gap-3 border-b border-border py-6 md:grid-cols-[minmax(8rem,1fr)_3fr] md:gap-8">
      <div className="text-sm leading-relaxed text-muted-foreground">
        <p className="font-bold text-primary">{period}</p>
        <p>{organization}</p>
      </div>
      <div>
        <h2 className="font-serif text-2xl font-semibold leading-tight">{title}</h2>
        <p className="mt-2 max-w-[65ch] text-muted-foreground">{summary}</p>
        {supportAmount && <p className="mt-3 font-bold">Wsparcie · {supportAmount}</p>}
        {reportUrl && (
          <a href={reportUrl} className="text-link mt-2">
            <Download aria-hidden="true" /> Pobierz sprawozdanie <ArrowUpRight aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}
