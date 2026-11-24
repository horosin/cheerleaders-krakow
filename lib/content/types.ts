export type NavItem = {
  label: string
  href?: string
  children?: NavItemChild[]
  autoChildren?: string
}

export type NavItemChild = {
  label: string
  href: string
}

export type SiteConfig = {
  title: string
  tagline?: string
  nav: NavItem[]
  cta?: {
    label: string
    href: string
  }
  footerColumns: Array<{
    title: string
    links?: Array<{ label: string; href: string }>
  }>
  contact: {
    email: string
    phone: string
    addressLines: string[]
  }
  socials: Array<{ label: string; href: string }>
  legal: {
    copyright: string
  }
  newsIndex?: NewsIndex
  fundingIndex?: FundingIndex
  videosIndex?: VideoIndex
}

export type HomePage = {
  hero: {
    eyebrow?: string
    image?: string
    imageAlt?: string
    imageCaption?: string
    title: string
    subtitle: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
  }
  teamsSection: {
    eyebrow: string
    title: string
    subtitle?: string
    teams: Team[]
  }
  newsSection: {
    title: string
    ctaLabel: string
    ctaHref: string
  }
  videoHighlight: {
    eyebrow: string
    title: string
    description: string
    ctaLabel: string
    ctaHref: string
    youtubeId: string
  }
  ctaBand: {
    title: string
    description: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
  }
  sponsorsSection: {
    title: string
    sponsors: Sponsor[]
  }
  fundingSummarySection: {
    title: string
    ctaHref: string
  }
}

export type Team = {
  name: string
  coach: string
}

export type Sponsor = {
  name: string
  logo?: string
  href?: string
}

export type NewsIndex = {
  eyebrow: string
  title: string
  description: string
}

export type NewsPost = {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  heroImage?: string
  heroImageAlt?: string
  body: string
}

export type ChampionshipPage = {
  eyebrow: string
  title: string
  subtitle: string
  dateStart: string
  dateEnd: string
  location: string
  videoUrl?: string
  ctas: Array<{ label: string; href: string; variant: "primary" | "secondary" }>
  sidebarHelp?: {
    title: string
    description: string
    ctaLabel: string
    ctaHref: string
  }
  richText?: string
}

export type ChampionshipSection = {
  id: string
  navLabel?: string
  title: string
  icon?: string
  body: string
  cards?: Array<{
    title: string
    description: string
    file?: string
    href?: string
    meta?: string
    icon?: string
  }>
  mapEmbed?: string
  address?: string
  image?: string
}

export type VideoIndex = {
  eyebrow: string
  title: string
  description: string
  videos: VideoEntry[]
}

export type VideoEntry = {
  title: string
  date?: string
  category: string
  thumbnail: string
  youtubeId: string
  order: number
}

export type FundingIndex = {
  eyebrow: string
  title: string
  description: string
  entries: FundingGrant[]
}

export type FundingGrant = {
  organization: string
  period: string
  title: string
  summary: string
  reportUrl?: string
  supportAmount?: string
}

export type BrandPage = {
  title: string
  description: string
  palette: Array<{ name: string; hex: string; rgb: string }>
  typography: {
    title: string
    description: string
    headingFont: string
    bodyFont: string
  }
  logoVariants: Array<{ title: string; variant: "light" | "dark" }>
  downloads?: Array<{ title: string; detail: string; format: string; file?: string }>
  guidelines: {
    title: string
    description: string
  }
}

export type SimplePage = {
  slug: string
  title: string
  navLabel?: string
  order?: number
  body: string
}
