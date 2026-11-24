"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { SiteConfig } from "@/lib/content/types"
import { cn } from "@/lib/utils"

export function SiteHeader({ site }: { site: SiteConfig }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const currentPath = pathname?.replace(/\/$/, "") ?? ""
  const isCurrent = (href?: string) =>
    Boolean(href?.startsWith("/") && href.replace(/\/$/, "") === currentPath)

  function isActive(href?: string) {
    if (isCurrent(href)) return true
    if (!href || href === "/") return false
    return currentPath.startsWith(`${href.replace(/\/$/, "")}/`)
  }

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false)
          menuButton.current?.focus()
        }
      }}
    >
      <div className="site-shell header-inner">
        <Link href="/" className="wordmark" onClick={() => setMenuOpen(false)}>
          <span>{site.title}</span>
        </Link>
        <nav aria-label="Menu główne" className="desktop-nav">
          {site.nav.map((item) => {
            const active = isActive(item.href) || item.children?.some((child) => isActive(child.href))
            return (
              <div key={item.label} className={cn("nav-entry", active && "is-active")}>
                {item.href && (
                  <Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                )}
                {!!item.children?.length && (
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger
                      className={cn("nav-trigger", item.href && "nav-trigger-icon")}
                      aria-label={item.href ? `${item.label} – więcej stron` : undefined}
                    >
                      {!item.href && item.label}
                      <ChevronDown size={15} aria-hidden="true" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={item.href ? "end" : "start"} sideOffset={10} className="w-64 rounded-lg p-1.5">
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.href} asChild className="rounded-md">
                          <Link href={child.href} aria-current={isCurrent(child.href) ? "page" : undefined}>
                            {child.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            )
          })}
        </nav>
        {site.cta && (
          <Button asChild className="header-cta h-10 rounded-md px-4">
            <Link href={site.cta.href}>
              {site.cta.label}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        )}
        <Button
          ref={menuButton}
          variant="ghost"
          className="mobile-toggle h-11 rounded-md px-3"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>
      <nav id="mobile-navigation" aria-label="Menu główne" className="mobile-nav" hidden={!menuOpen}>
        <div className="site-shell mobile-nav-inner">
          {site.nav.map((item) => (
            <div key={item.label} className="mobile-nav-item">
              {item.href ? (
                <Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              ) : null}
              {!!item.children?.length && (
                <details>
                  <summary>
                    {item.autoChildren === "championship" ? "Edycje mistrzostw" : item.href ? `${item.label} – więcej stron` : item.label}
                    <ChevronDown size={17} aria-hidden="true" />
                  </summary>
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} aria-current={isCurrent(child.href) ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          ))}
          {site.cta && (
            <Button asChild className="h-11 w-fit rounded-md px-5">
              <Link href={site.cta.href} onClick={() => setMenuOpen(false)}>
                {site.cta.label} <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}
