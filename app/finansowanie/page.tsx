import { FundingCard } from "@/components/cards"
import { getFunding, getFundingIndex } from "@/lib/content"

export default function FundingPage() {
  const fundingIndex = getFundingIndex()
  const grants = getFunding()

  return (
    <main>
      <section className="relative w-full border-b border-pink-100 overflow-hidden py-24 bg-hero-gradient">
        <div className="absolute inset-0 grain-overlay pointer-events-none z-10" />
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/60 border border-pink-200 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm shadow-sm">
            {fundingIndex.eyebrow}
          </span>
          <h1 className="text-text-dark text-5xl sm:text-6xl md:text-7xl font-serif font-bold leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
            {fundingIndex.title}
          </h1>
          <p className="text-gray-700 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            {fundingIndex.description}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white min-h-[600px]">
        <div className="max-w-[1000px] mx-auto px-4 lg:px-10">
          {grants.map((grant) => (
            <FundingCard key={grant.title} {...grant} />
          ))}
        </div>
      </section>
    </main>
  )
}
