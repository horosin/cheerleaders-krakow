type SimplePageProps = {
  title: string
  bodyHtml: string
}

export function SimplePage({ title, bodyHtml }: SimplePageProps) {
  return (
    <main>
      <section className="py-20 bg-white border-b border-pink-100">
        <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-text-dark text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight">
            {title}
          </h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        </div>
      </section>
    </main>
  )
}
