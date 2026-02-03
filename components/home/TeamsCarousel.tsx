"use client"

import * as React from "react"

import { Icon } from "@/components/icon"
import { TeamCard } from "@/components/cards"
import type { Team } from "@/lib/content/types"

type TeamsCarouselProps = {
  eyebrow: string
  title: string
  teams: Team[]
}

export function TeamsCarousel({ eyebrow, title, teams }: TeamsCarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const dragState = React.useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  })

  const scrollByAmount = (direction: number) => {
    const container = containerRef.current
    if (!container) return
    const amount = Math.round(container.clientWidth * 0.7)
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
    <section
      id="teams"
      className="py-24 bg-white relative z-10 border-b border-pink-50 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="w-full lg:w-1/4 lg:sticky lg:top-32 shrink-0">
            <h2 className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-primary" />
              {eyebrow}
            </h2>
            <h2 className="text-text-dark text-4xl lg:text-6xl font-serif font-bold tracking-tight mb-10 leading-[1.1]">
              {title}
            </h2>
            <div className="hidden lg:flex gap-4">
              <button
                type="button"
                onClick={() => scrollByAmount(-1)}
                className="w-12 h-12 rounded-full border border-pink-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                aria-label="Scroll teams left"
              >
                <Icon name="arrow_back" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount(1)}
                className="w-12 h-12 rounded-full border border-pink-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                aria-label="Scroll teams right"
              >
                <Icon name="arrow_forward" className="size-5" />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-3/4">
            <div
              ref={containerRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={stopDrag}
              onPointerLeave={stopDrag}
              onPointerCancel={stopDrag}
              className="flex overflow-x-auto pb-12 gap-6 snap-x snap-proximity -mx-4 px-4 lg:mx-0 lg:px-0 no-scrollbar cursor-grab active:cursor-grabbing select-none"
            >
              {teams.map((team) => (
                <TeamCard
                  key={team.name}
                  name={team.name}
                  coach={team.coach}
                  icon={team.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
