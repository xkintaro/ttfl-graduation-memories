"use client";

interface HeroSectionProps {
  schoolName: string;
  description: string;
}

export default function HeroSection({
  schoolName,
  description,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 px-6 text-center bg-[#07070c]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c8a55a]/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-[#c8a55a]/5 blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-[#c8a55a]/5 blur-[100px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <div className="mb-6 md:mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c8a55a]/30 bg-[#c8a55a]/10 text-xs font-semibold tracking-wider text-[#c8a55a] uppercase shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8a55a] animate-pulse" />
            Mezuniyet 2026
          </span>
        </div>

        <div className="mb-8 relative group">
          <div className="absolute -inset-1.5 rounded-full bg-linear-to-r from-[#c8a55a] via-[#a4843e] to-[#c8a55a] opacity-40 blur-md group-hover:opacity-75 transition duration-500" />

          <div className="relative w-32 h-32 rounded-full border border-white/10 bg-white p-1 backdrop-blur-xl flex items-center justify-center">
            <img
              src="/meb-logo.png"
              alt="MEB LOGO"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-[family-name:var(--font-playfair-display)] font-extrabold tracking-tight mb-6 leading-tight text-white max-w-3xl">
          <span className="bg-linear-to-r from-[#c8a55a] via-[#e4c97d] to-[#c8a55a] bg-clip-text text-transparent">
            {schoolName}
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-12 font-normal">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
          <a
            href="#video"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 bg-white text-black hover:bg-white/90 hover:scale-105 shadow-[0_4px_25px_rgba(255,255,255,0.15)] active:scale-95 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z"
              />
            </svg>
            Videoyu İzle
          </a>
          <a
            href="#gallery"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 border border-white/10 bg-white/3 text-white hover:bg-white/8 hover:border-white/20 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Fotoğrafları Gör
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#0a0a0f] to-transparent pointer-events-none z-0" />
    </section>
  );
}
