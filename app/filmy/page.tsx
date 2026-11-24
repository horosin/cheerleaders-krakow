import { ArrowUpRight } from "lucide-react"

import { VideoCard } from "@/components/cards"
import { PageMasthead } from "@/components/page-masthead"
import { getHomePage, getSiteConfig, getVideos, getVideosIndex } from "@/lib/content"

export const metadata = { title: "Filmy" }

export default function VideosPage() {
  const videosIndex = getVideosIndex()
  const videos = getVideos()
  const highlight = getHomePage().videoHighlight
  const youtubeChannel = getSiteConfig().socials?.find((social) => social.label.toLowerCase() === "youtube")
  const featured = {
    title: highlight.title,
    category: "Mistrzostwa",
    thumbnail: `https://i.ytimg.com/vi/${highlight.youtubeId}/hqdefault.jpg`,
    youtubeId: highlight.youtubeId,
    order: 0,
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <PageMasthead {...videosIndex}>
        {youtubeChannel && (
          <a href={youtubeChannel.href} className="text-link mt-4">
            Kanał Cheerleaders Kraków na YouTube <ArrowUpRight aria-hidden="true" />
          </a>
        )}
      </PageMasthead>
      <section className="site-shell home-section grid gap-10 md:grid-cols-2" aria-label="Filmy z mistrzostw">
        {(videos.length ? videos : [featured]).map((video) => <VideoCard key={video.youtubeId} {...video} />)}
      </section>
    </main>
  )
}
