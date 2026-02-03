import { VideoCard } from "@/components/cards"
import { formatDateLong, getVideos, getVideosIndex } from "@/lib/content"

export default function VideosPage() {
  const videosIndex = getVideosIndex()
  const videos = getVideos()

  return (
    <main>
      <section className="relative w-full border-b border-pink-100 overflow-hidden py-24 bg-hero-gradient">
        <div className="absolute inset-0 grain-overlay pointer-events-none z-10" />
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/60 border border-pink-200 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm shadow-sm">
            {videosIndex.eyebrow}
          </span>
          <h1 className="text-text-dark text-5xl sm:text-6xl md:text-7xl font-serif font-bold leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
            {videosIndex.title}
          </h1>
          <p className="text-gray-700 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            {videosIndex.description}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white border-b border-pink-50 min-h-screen">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {videos.map((video) => (
              <VideoCard
                key={video.title}
                title={video.title}
                date={formatDateLong(video.date, "pl-PL")}
                category={video.category}
                thumbnail={video.thumbnail}
                youtubeId={video.youtubeId}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
