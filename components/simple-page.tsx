import { PageMasthead } from "@/components/page-masthead"

export function SimplePage({ title, bodyHtml }: { title: string; bodyHtml: string }) {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageMasthead title={title} />
      <div className="site-shell home-section">
        <div className="prose max-w-3xl" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </div>
    </main>
  )
}
