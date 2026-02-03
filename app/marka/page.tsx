import { DownloadCard } from "@/components/cards"
import { getBrandPage } from "@/lib/content"
import { cn } from "@/lib/utils"

export default function BrandPage() {
  const brand = getBrandPage()

  return (
    <main>
      <section className="relative w-full border-b border-pink-100 overflow-hidden py-24 bg-hero-gradient">
        <div className="absolute inset-0 grain-overlay pointer-events-none z-10" />
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/60 border border-pink-200 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm shadow-sm">
            {brand.eyebrow}
          </span>
          <h1 className="text-text-dark text-5xl sm:text-6xl md:text-7xl font-serif font-bold leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
            {brand.title}
          </h1>
          <p className="text-gray-700 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            {brand.description}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white border-b border-pink-50">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
          <div className="mb-12">
            <h2 className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-primary" />
              Paleta Barw
            </h2>
            <h3 className="text-text-dark text-3xl lg:text-4xl font-serif font-bold tracking-tight">
              Kolorystyka Marki
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {brand.palette.map((color) => (
              <div key={color.name} className="group flex flex-col items-center">
                <div
                  className="w-32 h-32 rounded-full shadow-xl shadow-pink-200 mb-6 group-hover:scale-105 transition-transform duration-300 ring-4 ring-pink-50"
                  style={{ backgroundColor: color.hex }}
                />
                <h4 className="text-lg font-serif font-bold text-gray-900 mb-1">
                  {color.name}
                </h4>
                <p className="text-sm text-gray-500 font-mono mb-0.5">
                  HEX: {color.hex}
                </p>
                <p className="text-xs text-gray-400 font-mono">RGB: {color.rgb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background-soft border-b border-pink-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
          <div className="mb-12">
            <h2 className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-primary" />
              Typografia
            </h2>
            <h3 className="text-text-dark text-3xl lg:text-4xl font-serif font-bold tracking-tight">
              {brand.typography.title}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-2xl border border-pink-100 shadow-sm relative overflow-hidden">
              <div className="absolute -right-10 -top-10 text-[200px] text-pink-50 font-serif opacity-50 select-none">
                Aa
              </div>
              <span className="inline-block py-1 px-3 rounded-full bg-pink-50 text-primary text-[10px] font-bold uppercase tracking-wider mb-6">
                Nagłówki
              </span>
              <h4 className="text-5xl font-serif text-gray-900 mb-4">
                {brand.typography.headingFont}
              </h4>
              <p className="text-gray-500 font-serif text-lg mb-8 italic">
                Elegancki, klasyczny, z charakterem.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-2">
                  <span className="w-24 text-gray-400 text-xs uppercase font-bold tracking-wider">
                    Regular
                  </span>
                  <span className="font-serif text-2xl">Aa Bb Cc Dd Ee</span>
                </div>
                <div className="flex items-center gap-4 border-b border-gray-100 pb-2">
                  <span className="w-24 text-gray-400 text-xs uppercase font-bold tracking-wider">
                    Bold
                  </span>
                  <span className="font-serif font-bold text-2xl">Aa Bb Cc Dd Ee</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-gray-400 text-xs uppercase font-bold tracking-wider">
                    Italic
                  </span>
                  <span className="font-serif italic text-2xl">Aa Bb Cc Dd Ee</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-pink-100 shadow-sm relative overflow-hidden">
              <div className="absolute -right-10 -top-10 text-[200px] text-gray-50 font-sans opacity-50 select-none">
                Aa
              </div>
              <span className="inline-block py-1 px-3 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-6">
                Tekst Główny
              </span>
              <h4 className="text-5xl font-sans text-gray-900 mb-4">
                {brand.typography.bodyFont}
              </h4>
              <p className="text-gray-500 font-sans text-lg mb-8">
                Nowoczesny, czytelny, przyjazny.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-2">
                  <span className="w-24 text-gray-400 text-xs uppercase font-bold tracking-wider">
                    Regular
                  </span>
                  <span className="font-sans text-2xl">Aa Bb Cc Dd Ee</span>
                </div>
                <div className="flex items-center gap-4 border-b border-gray-100 pb-2">
                  <span className="w-24 text-gray-400 text-xs uppercase font-bold tracking-wider">
                    Medium
                  </span>
                  <span className="font-sans font-medium text-2xl">Aa Bb Cc Dd Ee</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-gray-400 text-xs uppercase font-bold tracking-wider">
                    Bold
                  </span>
                  <span className="font-sans font-bold text-2xl">Aa Bb Cc Dd Ee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-b border-pink-50">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
          <div className="mb-12">
            <h2 className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-primary" />
              Identyfikacja
            </h2>
            <h3 className="text-text-dark text-3xl lg:text-4xl font-serif font-bold tracking-tight">
              Logo
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {brand.logoVariants.map((variant) => (
              <div
                key={variant.title}
                className={cn(
                  "rounded-2xl p-16 flex flex-col items-center justify-center min-h-[300px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] relative group",
                  variant.variant === "dark"
                    ? "bg-primary text-white"
                    : "bg-white border border-gray-100"
                )}
              >
                <div className="absolute top-4 left-4 text-xs font-mono text-gray-400 uppercase tracking-widest">
                  {variant.title}
                </div>
                <div className="text-center transform group-hover:scale-105 transition-transform duration-500">
                  <h2
                    className={cn(
                      "text-5xl font-serif font-bold tracking-tight",
                      variant.variant === "dark" ? "text-white" : "text-text-dark"
                    )}
                  >
                    Cheerleaders
                    <br />
                    <span
                      className={cn(
                        "italic",
                        variant.variant === "dark" ? "text-pink-100" : "text-primary"
                      )}
                    >
                      Krakow
                    </span>
                  </h2>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h4 className="text-xl font-serif font-bold text-gray-900 mb-6">
              Materiały do pobrania
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brand.downloads.map((download) => (
              <DownloadCard
                key={download.title}
                title={download.title}
                detail={download.detail}
                format={download.format}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background-soft">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-primary" />
                Design System
              </h2>
              <h3 className="text-text-dark text-3xl lg:text-4xl font-serif font-bold tracking-tight">
                Język Wizualny
              </h3>
            </div>
            <p className="text-gray-500 max-w-sm text-sm text-right mt-4 md:mt-0">
              Przykłady zastosowania gradientów, typografii i elementów dekoracyjnych w materiałach promocyjnych.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px]">
            {brand.visualTiles.map((tile) => (
              <div
                key={tile.title}
                className={cn(
                  "rounded-2xl border border-pink-100 flex flex-col justify-end shadow-sm hover:shadow-md transition-shadow p-6",
                  tile.variant === "bold"
                    ? "bg-primary text-white relative overflow-hidden"
                    : tile.variant === "editorial"
                    ? "bg-white border-gray-100"
                    : tile.variant === "soft"
                    ? "bg-background-soft relative overflow-hidden"
                    : "bg-gradient-to-b from-white to-pink-50"
                )}
              >
                {tile.variant === "bold" && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary to-[#be185d]" />
                )}
                {tile.variant === "soft" && (
                  <>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-100 rounded-full blur-2xl opacity-60" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full blur-2xl opacity-80" />
                  </>
                )}
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-full bg-primary mb-3" />
                  <h4 className={cn("font-serif font-bold", tile.variant === "bold" ? "text-white" : "text-gray-800")}>
                    {tile.title}
                  </h4>
                  <p className={cn("text-xs mt-2", tile.variant === "bold" ? "text-pink-100" : "text-gray-400")}>
                    {tile.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-pink-100">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <h3 className="text-text-dark text-2xl font-serif font-bold mb-6">
            {brand.guidelines.title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-8">
            {brand.guidelines.description}
          </p>
          <button className="text-primary font-bold text-sm border-b border-primary pb-0.5 hover:opacity-70 transition-opacity">
            {brand.guidelines.ctaLabel}
          </button>
        </div>
      </section>
    </main>
  )
}
