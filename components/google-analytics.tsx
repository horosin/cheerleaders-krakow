"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"

const GA_MEASUREMENT_ID = "G-65V919H57H"

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (
      command: "js" | "config" | "event",
      targetIdOrName: string | Date,
      config?: Record<string, string | number | boolean>
    ) => void
  }
}

function trackPageView(pathname: string) {
  if (typeof window.gtag !== "function") {
    return
  }

  window.gtag("event", "page_view", {
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) {
      return
    }

    const pagePath = `${window.location.pathname}${window.location.search}`

    trackPageView(pagePath)
  }, [pathname])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  )
}
