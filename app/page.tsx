import {
  SCHOOL_NAME,
  SCHOOL_DESCRIPTION,
  GRADUATION_VIDEO_URL,
  GRADUATION_VIDEO_TITLE,
} from "@/lib/constants";
import { getGalleryImages } from "@/lib/gallery";
import PhotoGallery from "@/components/PhotoGallery";
import VideoPlayer from "@/components/VideoPlayer";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  const galleryImages = getGalleryImages();

  return (
    <main className="flex-1 bg-[#0a0a0f]">
      <HeroSection schoolName={SCHOOL_NAME} description={SCHOOL_DESCRIPTION} />

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <section id="video" className="relative py-24 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#c8a55a]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#c8a55a] font-semibold mb-3">
              Video
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-white">Mezuniyet </span>
              <span className="bg-linear-to-r from-[#bd9b51] via-[#e4c97d] to-[#c4a054] bg-clip-text text-transparent">
                Videomuz
              </span>
            </h2>
          </div>

          <VideoPlayer
            videoUrl={GRADUATION_VIDEO_URL}
            title={GRADUATION_VIDEO_TITLE}
          />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <section id="gallery" className="relative py-24 px-6">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#c8a55a]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#c8a55a] font-semibold mb-3">
              Fotoğraflar
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-white">Fotoğraf </span>
              <span className="bg-linear-to-r from-[#bd9b51] via-[#e4c97d] to-[#c4a054] bg-clip-text text-transparent">
                Galerisi
              </span>
            </h2>
          </div>

          <PhotoGallery images={galleryImages} />
        </div>
      </section>
    </main>
  );
}
