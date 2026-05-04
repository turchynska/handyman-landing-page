"use client";

import Image from "next/image";
import { useState } from "react";

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

  function goNext() {
    setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
  }

  function goPrev() {
    setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  }

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

  const currentImage = lightboxIndex !== null ? works[lightboxIndex] : null;

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
              <div
                key={work.title}
                onClick={() => setLightboxIndex(realIndex)}
                className="cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm transition hover:scale-[1.02] hover:shadow-md"
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
              </div>
            );
          })}
        </div>

        {/* CONTROLS */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={goPrev}
            className="rounded-full bg-white px-4 py-2 shadow"
          >
            ‹
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-3 w-3 rounded-full ${
                  page === i ? "bg-blue-600" : "bg-blue-200"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="rounded-full bg-white px-4 py-2 shadow"
          >
            ›
          </button>
        </div>
      </div>

      {/* LIGHTBOX */}
      {currentImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ✕
          </button>

          <Image
            src={currentImage.image}
            alt={currentImage.title}
            width={1200}
            height={900}
            className="max-h-[85vh] w-auto rounded-2xl"
          />

          <p className="absolute bottom-10 text-white text-lg">
            {currentImage.title}
          </p>
        </div>
      )}
    </section>
  );
}
