"use client";

import { useState, useEffect } from "react";
import type { GalleryImage } from "@/lib/gallery";

interface PhotoGalleryProps {
  images: GalleryImage[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % images.length : null,
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + images.length) % images.length : null,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📷</div>
        <p className="text-white/50 text-lg">
          Henüz fotoğraf eklenmemiş.
          <br />
          <code className="text-sm text-[#c8a55a]">
            public/photo-gallery/
          </code>{" "}
          dizinine fotoğraf ekleyebilirsiniz.
        </p>
      </div>
    );
  }

  function getBentoSpan(width: number, height: number): string {
    const ratio = width / height;

    if (ratio < 0.8) {
      return "col-span-1 row-span-2";
    }

    if (ratio > 1.6) {
      return "col-span-2 row-span-1";
    }

    return "col-span-1 row-span-1";
  }

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[140px] md:auto-rows-[180px] grid-flow-row-dense">
          {images.map((img, idx) => {
            const spanClass = getBentoSpan(img.width, img.height);
            return (
              <button
                key={img.filename}
                type="button"
                className={`group relative cursor-pointer text-left focus:outline-none overflow-hidden rounded-3xl border border-white/10 bg-white/2 outline-none transition-all duration-500 hover:border-[#c8a55a]/50 hover:shadow-[0_0_35px_rgba(99,102,241,0.25)] hover:-translate-y-1 ${spanClass}`}
                onClick={() => setSelectedIndex(idx)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 pointer-events-none backdrop-blur-[1px]">
                  <p className="text-xs text-[#c8a55a] font-semibold uppercase tracking-widest translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    Mezuniyet Anısı
                  </p>
                </div>

                <div className="absolute inset-0 border-2 border-[#c8a55a]/0 group-hover:border-[#c8a55a]/40 rounded-3xl transition-colors duration-500 pointer-events-none" />
              </button>
            );
          })}
        </div>
      </div>

      {selectedIndex !== null && selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-all duration-300"
          onClick={() => setSelectedIndex(null)}
          style={{ zIndex: 99999 }}
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:scale-110 transition-all cursor-pointer focus:outline-none bg-white/5 hover:bg-white/10 p-2.5 rounded-full"
            onClick={() => setSelectedIndex(null)}
            aria-label="Kapat"
            style={{ zIndex: 100000 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            type="button"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:scale-110 transition-all cursor-pointer focus:outline-none bg-white/5 hover:bg-white/10 p-4 rounded-full select-none"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev !== null
                  ? (prev - 1 + images.length) % images.length
                  : null,
              );
            }}
            aria-label="Önceki Fotoğraf"
            style={{ zIndex: 100000 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div
            className="relative max-w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl transition-all duration-300 border border-white/10"
            />
            <div className="mt-4 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-center">
              <span className="text-xs text-white/50 tracking-wider">
                {selectedIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:scale-110 transition-all cursor-pointer focus:outline-none bg-white/5 hover:bg-white/10 p-4 rounded-full select-none"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev !== null ? (prev + 1) % images.length : null,
              );
            }}
            aria-label="Sonraki Fotoğraf"
            style={{ zIndex: 100000 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
