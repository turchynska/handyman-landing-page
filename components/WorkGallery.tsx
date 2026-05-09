"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function WorkGallery() {
  const works = [
    {
      title: "Dog Door Installation",
      image: "/images/work-gallery/dog-door.jpg",
    },
    { title: "Custom Shelving", image: "/images/work-gallery/shelves.jpg" },
    {
      title: "Attic Ladder Installation",
      image: "/images/work-gallery/attic.jpg",
    },
    { title: "TV Mounting", image: "/images/work-gallery/tv.jpg" },
    {
      title: "Kids Play Area Setup",
      image: "/images/work-gallery/kids-gym.jpg",
    },
    {
      title: "Recessed Medicine Cabinet Installation",
      image: "/images/work-gallery/medicine-cabinet.jpg",
    },
    { title: "Roof Repair", image: "/images/work-gallery/roof-repair.jpg" },
    {
      title: "Garbage Disposal Installation",
      image: "/images/work-gallery/garbage-disposal.jpg",
    },
    {
      title: "Bathroom Vanity Replacement",
      image: "/images/work-gallery/vanity-replacement.jpg",
    },
    {
      title: "Exterior Siding Repair",
      image: "/images/work-gallery/siding-repair.jpg",
    },
    {
      title: "Custom Garden Beds Construction",
      image: "/images/work-gallery/garden-beds.jpg",
    },
  ];

  const [page, setPage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(works.length / itemsPerPage);

  const visibleWorks = works.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  const currentImage = lightboxIndex !== null ? works[lightboxIndex] : null;

  // ── Gallery pagination ────────────────────────────────────────────────────
  function goNext() {
    setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
  }

  function goPrev() {
    setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  }

  // ── Lightbox navigation ───────────────────────────────────────────────────
  const lightboxNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % works.length));
  }, [works.length]);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + works.length) % works.length,
    );
  }, [works.length]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // ✅ FIX: keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "Escape") closeLightbox();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, lightboxNext, lightboxPrev, closeLightbox]);

  // ── Touch swipe for gallery ───────────────────────────────────────────────
  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) goNext();
    if (distance < -50) goPrev();
  }

  return (
    <section id="work" className="bg-[#F3FAFF] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Real Projects & Results
          </h2>
        </div>

        {/* GRID */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="grid gap-6 md:grid-cols-3"
        >
          {visibleWorks.map((work, index) => {
            const realIndex = page * itemsPerPage + index;

            return (
              // ✅ FIX: button element for proper keyboard focus + Enter/Space support
              <button
                key={work.title}
                type="button"
                onClick={() => setLightboxIndex(realIndex)}
                className="cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm transition hover:scale-[1.02] hover:shadow-md text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{work.title}</h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous page"
            className="rounded-full bg-white px-4 py-2 shadow hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            ‹
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-3 w-3 rounded-full transition ${
                  page === i ? "bg-blue-600" : "bg-blue-200"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next page"
            className="rounded-full bg-white px-4 py-2 shadow hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            ›
          </button>
        </div>
      </div>

      {/* ✅ FIX: LIGHTBOX with arrow buttons + keyboard support */}
      {currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          role="dialog"
          aria-modal="true"
          aria-label={currentImage.title}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            ✕
          </button>

          {/* Image + arrows grouped together */}
          <div
            className="relative flex items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={lightboxPrev}
              aria-label="Previous image"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 text-white text-2xl hover:bg-white/40 transition focus-visible:ring-2 focus-visible:ring-white"
            >
              ‹
            </button>

            <Image
              src={currentImage.image}
              alt={currentImage.title}
              width={1200}
              height={900}
              className="max-h-[80vh] w-auto rounded-2xl"
            />

            <button
              type="button"
              onClick={lightboxNext}
              aria-label="Next image"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 text-white text-2xl hover:bg-white/40 transition focus-visible:ring-2 focus-visible:ring-white"
            >
              ›
            </button>
          </div>

          {/* Counter + title */}
          <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1">
            <p className="text-white text-lg font-medium">
              {currentImage.title}
            </p>
            <p className="text-white/60 text-sm">
              {lightboxIndex! + 1} / {works.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
