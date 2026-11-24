import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { PageMasthead } from "@/components/page-masthead"
import { formatDateLong, getAllNewsPosts, getNewsIndex } from "@/lib/content"

export const metadata = { title: "Aktualności" }

export default function NewsPage() {
  const newsIndex = getNewsIndex()
  const posts = getAllNewsPosts()

  return (
    <main id="main-content" tabIndex={-1}>
      <PageMasthead {...newsIndex} />
      <section className="site-shell home-section" aria-label="Opublikowane aktualności">
        <div className="news-list">
          {posts.map((post) => (
            <article className="news-row" key={post.slug}>
              <div className="text-sm font-semibold text-muted-foreground">
                {post.date && <time dateTime={post.date}>{formatDateLong(post.date, "pl-PL")}</time>}
              </div>
              <div>
                {post.category && <p className="eyebrow mb-2 text-primary!">{post.category}</p>}
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>
              <Link href={`/news/${post.slug}/`} className="text-link" aria-label={`Czytaj więcej: ${post.title}`}>
                Czytaj więcej <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
