import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { PageMasthead } from "@/components/page-masthead"

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageMasthead title="Nie znaleziono strony" description="Sprawdź adres lub wróć na stronę główną.">
        <Link href="/" className="text-link mt-4"><ArrowLeft aria-hidden="true" /> Strona główna</Link>
      </PageMasthead>
    </main>
  )
}
