import { Download, Mail } from "lucide-react"

import { PageMasthead } from "@/components/page-masthead"
import { getBrandPage, getSiteConfig } from "@/lib/content"
import { cn } from "@/lib/utils"

export const metadata = { title: "Identyfikacja wizualna" }

export default function BrandPage() {
  const brand = getBrandPage()
  const site = getSiteConfig()
  const email = site.contact?.email?.trim()
  const downloads = brand.downloads?.filter((item) => item.file) ?? []

  return (
    <main id="main-content" tabIndex={-1}>
      <PageMasthead title={brand.title} description={brand.description} />
      <section className="site-shell home-section">
        <h2 className="section-title mb-6">Kolory marki</h2>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-4">
          {brand.palette.map((color) => (
            <li key={color.name} className="overflow-hidden border border-border">
              <div aria-hidden="true" className="h-24" style={{ backgroundColor: color.hex }} />
              <div className="p-3 text-sm">
                <p className="font-bold">{color.name}</p>
                <p className="text-muted-foreground">{color.hex} · RGB {color.rgb}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {brand.logoVariants.map((variant) => (
            <div key={variant.title} className={cn(
              "grid min-h-36 content-between gap-6 border border-border p-5",
              variant.variant === "dark" && "bg-primary text-white"
            )}>
              <h3 className="text-sm font-bold">{variant.title}</h3>
              <p className="wordmark">{site.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="section-title">{brand.typography.title}</h2>
            <p className="mt-3 font-serif text-2xl">{brand.typography.headingFont}</p>
            <p className="mt-3 text-2xl">{brand.typography.bodyFont}</p>
            <p className="section-description">{brand.typography.description}</p>
          </div>
          <div>
            <h2 className="section-title">{brand.guidelines.title}</h2>
            <p className="section-description">{brand.guidelines.description}</p>
            {email && <a href={`mailto:${email}`} className="text-link mt-3"><Mail aria-hidden="true" /> Zapytaj o materiały prasowe</a>}
          </div>
        </div>
        {downloads.length > 0 && (
          <div className="mt-12">
            <h2 className="section-title">Materiały do pobrania</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {downloads.map((item) => (
                <li key={item.file} className="border border-border p-4">
                  <a href={item.file} className="text-link"><Download aria-hidden="true" />{item.title} ({item.format})</a>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  )
}
