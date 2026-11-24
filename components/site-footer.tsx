import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import type { SiteConfig } from "@/lib/content/types"
import { CurrentYear } from "@/components/current-year"

export function SiteFooter({ site }: { site: SiteConfig }) {
  const footerColumns = (site.footerColumns ?? []).filter((column) => column.links?.length)
  const email = site.contact?.email?.trim()
  const phone = site.contact?.phone?.trim()
  const addressLines = (site.contact?.addressLines ?? []).filter((line) => line.trim())

  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="footer-grid">
          <div>
            <Link href="/" className="wordmark">{site.title}</Link>
            {site.tagline && <p className="mt-4 max-w-xs">{site.tagline}</p>}
          </div>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links?.map((link) => (
                  <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          {(email || phone || addressLines.length > 0) && (
            <div>
              <h2>Kontakt</h2>
              <address>
                {email && <a href={`mailto:${email}`}>{email}</a>}
                {phone && <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>}
                {addressLines.map((line) => <span key={line}>{line}</span>)}
              </address>
            </div>
          )}
        </div>
        <div className="footer-bottom">
          <p><CurrentYear template={site.legal.copyright} /></p>
          <ul aria-label="Media społecznościowe">
            {(site.socials ?? []).map((social) => (
              <li key={social.href}>
                <a href={social.href}>{social.label}<ArrowUpRight size={13} aria-hidden="true" /></a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
