import type { ReactNode } from "react"

export function PageMasthead({
  title, eyebrow, description, children,
}: {
  title: string
  eyebrow?: string
  description?: string
  children?: ReactNode
}) {
  return (
    <header className="page-masthead">
      <div className="site-shell">
        {eyebrow && eyebrow !== title && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="section-description">{description}</p>}
        {children}
      </div>
    </header>
  )
}
