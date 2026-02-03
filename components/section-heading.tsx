import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center"
  return (
    <div className={cn(isCenter && "text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "text-primary font-bold text-xs uppercase tracking-[0.2em]",
            isCenter ? "justify-center" : "flex items-center gap-2"
          )}
        >
          {!isCenter && <span className="w-8 h-px bg-primary" />}
          {eyebrow}
        </p>
      )}
      <h2 className="text-text-dark text-3xl lg:text-4xl font-serif font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-sm lg:text-base mt-3 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
