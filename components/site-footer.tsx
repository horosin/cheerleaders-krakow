import Link from "next/link"

import type { SiteConfig } from "@/lib/content/types"
import { Icon } from "@/components/icon"
import { CurrentYear } from "@/components/current-year"

export function SiteFooter({ site }: { site: SiteConfig }) {
  return (
    <footer className="bg-white border-t border-pink-100 pt-24 pb-12 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-primary">
              <h2 className="text-text-dark text-xl font-serif font-bold uppercase tracking-wide">
                {site.title}
              </h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-light">
              {site.tagline}
            </p>
          </div>
          {site.footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-6">
              <h3 className="text-text-dark font-serif font-bold text-lg">
                {column.title}
              </h3>
              <div className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-gray-500 text-sm hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-pink-200 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-6">
            <h3 className="text-text-dark font-serif font-bold text-lg">Kontakt</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-gray-500 text-sm">
                <Icon name="mail" className="size-5 text-primary mt-0.5" />
                <span className="hover:text-primary transition-colors">
                  {site.contact.email}
                </span>
              </div>
              <div className="flex items-start gap-3 text-gray-500 text-sm">
                <Icon name="phone" className="size-5 text-primary mt-0.5" />
                <span className="hover:text-primary transition-colors">
                  {site.contact.phone}
                </span>
              </div>
              <div className="flex items-start gap-3 text-gray-500 text-sm">
                <Icon name="location_on" className="size-5 text-primary mt-0.5" />
                <span>
                  {site.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-pink-50 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-xs text-center md:text-left font-light">
            <CurrentYear template={site.legal.copyright} />
          </p>
          <div className="flex items-center gap-6">
            {site.socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform"
              >
                <span className="text-xs font-bold uppercase tracking-wider">
                  {social.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
