"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import type { SiteConfig } from "@/lib/content/types"
import { Icon } from "@/components/icon"

type SiteHeaderProps = {
  site: SiteConfig
}

export function SiteHeader({ site }: SiteHeaderProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = React.useState(false)

  const normalizePath = (value?: string) => {
    if (!value) return ""
    const base = value.split("#")[0] || ""
    if (base === "/") return "/"
    return base.endsWith("/") ? base.slice(0, -1) : base
  }

  const normalizedPathname = normalizePath(pathname ?? "")

  const isActive = (href?: string) => {
    if (!href || href.startsWith("#")) return false
    const normalizedHref = normalizePath(href)
    if (!normalizedHref) return false
    if (normalizedHref === "/") return normalizedPathname === "/"
    return normalizedPathname.startsWith(normalizedHref)
  }

  const isItemActive = (item: SiteConfig["nav"][number]) => {
    if (isActive(item.href)) return true
    return item.children?.some((child) => isActive(child.href)) ?? false
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-pink-100 bg-white/90 backdrop-blur-md px-4 lg:px-10 py-4 transition-all duration-300">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <h2 className="text-text-dark text-2xl font-serif font-bold tracking-tight">
            {site.title}
          </h2>
        </Link>
        <div className="hidden lg:flex flex-1 justify-end gap-10 items-center">
          <nav className="flex items-center gap-8">
            {site.nav.map((item) => {
              if (item.children?.length) {
                const itemActive = isItemActive(item)
                return (
                  <div
                    key={item.label}
                    className="group relative flex items-center gap-1 cursor-pointer py-2"
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "text-[15px] transition-colors font-serif italic",
                          itemActive
                            ? "text-primary font-bold"
                            : "text-gray-600 font-medium group-hover:text-primary"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {item.label}
                          {item.badge && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold uppercase tracking-wider shadow-md shining-badge">
                              {item.badge}
                            </span>
                          )}
                        </span>
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          "text-[15px] transition-colors font-serif italic",
                          itemActive
                            ? "text-primary font-bold"
                            : "text-gray-600 font-medium group-hover:text-primary"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {item.label}
                          {item.badge && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold uppercase tracking-wider shadow-md shining-badge">
                              {item.badge}
                            </span>
                          )}
                        </span>
                      </span>
                    )}
                    <Icon
                      name="expand_more"
                      className="size-4 text-gray-400 group-hover:text-primary transition-colors"
                    />
                    <div className="absolute top-full left-0 mt-2 w-60 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 p-2 border border-pink-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={cn(
                            "block px-4 py-2.5 text-sm rounded-lg transition-colors",
                            isActive(child.href)
                              ? "bg-pink-50 text-primary font-semibold"
                              : "text-gray-600 hover:bg-pink-50 hover:text-primary"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.label}
                  href={item.href ?? "#"}
                  className={cn(
                    "text-[15px] font-serif italic transition-colors",
                    isActive(item.href)
                      ? "text-primary font-bold"
                      : "text-gray-600 font-medium hover:text-primary"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold uppercase tracking-wider shadow-md shining-badge">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </Link>
              )
            })}
          </nav>
          {site.cta && (
            <Link
              href={site.cta.href}
              className="group flex items-center justify-center overflow-hidden rounded-full h-11 px-8 bg-primary text-white text-sm font-semibold tracking-wide hover:bg-primary-hover transition-all shadow-lg shadow-pink-200 hover:shadow-pink-300 hover:-translate-y-0.5"
            >
              <span>{site.cta.label}</span>
            </Link>
          )}
        </div>
        <button
          className="lg:hidden text-gray-800 p-2"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <Icon name="menu" className="size-5" />
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden mt-4 rounded-2xl border border-pink-100 bg-white shadow-lg p-4">
          <nav className="flex flex-col gap-4">
            {site.nav.map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                {item.children?.length ? (
                  <div>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "text-sm font-semibold",
                          isItemActive(item)
                            ? "text-primary"
                            : "text-gray-700 hover:text-primary"
                        )}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                        {item.badge && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold uppercase tracking-wider">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ) : (
                      <p className="text-sm font-bold text-gray-700">
                        {item.label}
                      </p>
                    )}
                    <div className="mt-2 flex flex-col gap-2 pl-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={cn(
                            "text-sm hover:text-primary",
                            isActive(child.href)
                              ? "text-primary font-semibold"
                              : "text-gray-600"
                          )}
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    className={cn(
                      "text-sm font-semibold",
                      isActive(item.href)
                        ? "text-primary"
                        : "text-gray-700 hover:text-primary"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          {site.cta && (
            <Link
              href={site.cta.href}
              className="mt-6 flex items-center justify-center rounded-full h-11 px-8 bg-primary text-white text-sm font-semibold tracking-wide hover:bg-primary-hover transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {site.cta.label}
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
