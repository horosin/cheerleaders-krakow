"use client"

import * as React from "react"

import { Icon } from "@/components/icon"
import { SponsorCard } from "@/components/cards"
import type { Sponsor } from "@/lib/content/types"

type SponsorsCarouselProps = {
  eyebrow: string
  title: string
  sponsors: Sponsor[]
}

export function SponsorsCarousel({
  eyebrow,
  title,
  sponsors,
}: SponsorsCarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const dragState = React.useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  })

  const scrollByAmount = (direction: number) => {
    const container = containerRef.current
    if (!container) return
    const amount = Math.round(container.clientWidth * 0.6)
    const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth)
    const next = Math.min(
      maxScroll,
      Math.max(0, container.scrollLeft + direction * amount)
    )
    container.scrollTo({ left: next, behavior: "smooth" })
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) return
    dragState.current = {
      isDown: true,
      startX: event.clientX,
      scrollLeft: container.scrollLeft,
    }
    container.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container || !dragState.current.isDown) return
    event.preventDefault()
    const walk = event.clientX - dragState.current.startX
    container.scrollLeft = dragState.current.scrollLeft - walk
  }

  const stopDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current
    dragState.current.isDown = false
    if (container?.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <section id="sponsors" className="relative z-30 py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="text-center md:text-left">
            <h2 className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">
              {eyebrow}
            </h2>
            <h3 className="text-text-dark text-4xl font-serif font-bold">
              {title}
            </h3>
          </div>
          <div className="flex justify-center md:justify-end gap-3">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              className="w-10 h-10 rounded-full border border-pink-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
              aria-label="Scroll sponsors left"
            >
              <Icon name="arrow_back" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              className="w-10 h-10 rounded-full border border-pink-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
              aria-label="Scroll sponsors right"
            >
              <Icon name="arrow_forward" className="size-4" />
            </button>
          </div>
        </div>
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerLeave={stopDrag}
          onPointerCancel={stopDrag}
          className="flex overflow-x-auto pb-8 items-center gap-12 snap-x snap-proximity -mx-4 px-4 scroll-pl-4 scroll-pr-4 no-scrollbar cursor-grab active:cursor-grabbing select-none"
        >
          {sponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.name}
              name={sponsor.name}
              icon={sponsor.icon}
              accentColor={sponsor.accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
