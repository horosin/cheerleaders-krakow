import Link from "next/link"

import { Icon } from "@/components/icon"
import { formatDateShort, getAllNewsPosts, getNewsIndex } from "@/lib/content"

const monthShort = [
  "Sty",
  "Lut",
  "Mar",
  "Kwi",
  "Maj",
  "Cze",
  "Lip",
  "Sie",
  "Wrz",
  "Paź",
  "Lis",
  "Gru",
]

function getDateParts(dateString: string) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return { day: "--", month: "--" }
  }
  return {
    day: date.getUTCDate().toString().padStart(2, "0"),
    month: monthShort[date.getUTCMonth()],
  }
}

export default function NewsPage() {
  const newsIndex = getNewsIndex()
  const posts = getAllNewsPosts()

  return (
    <main>
      <section className="relative w-full border-b border-pink-100 overflow-hidden py-20 bg-hero-gradient">
        <div className="absolute inset-0 grain-overlay pointer-events-none z-10" />
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/60 border border-pink-200 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm shadow-sm">
            {newsIndex.eyebrow}
          </span>
          <h1 className="text-text-dark text-5xl sm:text-6xl md:text-7xl font-serif font-bold leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
            {newsIndex.title}
          </h1>
          <p className="text-gray-700 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            {newsIndex.description}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white min-h-[800px]">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 flex flex-col gap-12">
          {posts.map((post) => {
            const { day, month } = getDateParts(post.date)
            return (
              <article
                key={post.slug}
                className="group bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-pink-50 overflow-hidden hover:shadow-[0_8px_30px_-5px_rgba(236,72,153,0.15)] hover:border-pink-100 transition-all duration-300 flex flex-col md:flex-row h-full"
              >
                <div className="md:w-32 bg-primary text-white flex flex-col items-center justify-center p-4 md:py-8 text-center shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#be185d] opacity-100" />
                  <div className="relative z-10 flex flex-row md:flex-col items-center gap-3 md:gap-0">
                    <span className="text-3xl md:text-4xl font-serif font-bold leading-none">
                      {day}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-90 md:mt-1">
                      {month}
                    </span>
                    <div className="h-4 w-px bg-white/30 mx-3 md:hidden" />
                    <div className="hidden md:block h-px w-8 bg-white/30 my-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 md:writing-mode-vertical-rl md:transform md:rotate-180">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                  <Link
                    href={`/news/${post.slug}/`}
                    className="text-3xl font-serif font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors cursor-pointer leading-tight"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-600 mb-6 leading-relaxed font-light text-lg">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link
                      className="inline-flex items-center gap-2 text-primary font-bold text-xs tracking-[0.15em] uppercase hover:gap-3 transition-all border-b border-transparent hover:border-primary pb-0.5"
                      href={`/news/${post.slug}/`}
                    >
                      Czytaj dalej
                      <Icon name="arrow_forward" className="size-4" />
                    </Link>
                  </div>
                  <span className="mt-4 text-xs text-gray-400">
                    {formatDateShort(post.date)}
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
