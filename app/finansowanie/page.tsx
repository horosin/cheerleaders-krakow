import { FundingCard } from "@/components/cards"
import { PageMasthead } from "@/components/page-masthead"
import { getFunding, getFundingIndex } from "@/lib/content"

export const metadata = { title: "Finansowanie publiczne" }

export default function FundingPage() {
  const fundingIndex = getFundingIndex()
  const grants = getFunding()

  return (
    <main id="main-content" tabIndex={-1}>
      <PageMasthead {...fundingIndex} />
      <section aria-label="Dotacje i programy" className="site-shell home-section">
        <div className="border-t border-border">
          {grants.map((grant) => (
            <FundingCard key={`${grant.organization}-${grant.title}-${grant.period}`} {...grant} />
          ))}
        </div>
      </section>
    </main>
  )
}
