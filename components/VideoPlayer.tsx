"use client";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export default function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-linear-to-r from-[#c8a55a]/20 via-[#c8a55a]/20 to-[#c8a55a]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 bg-white/2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
        </div>

        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={videoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
