"use client";

import Image from "next/image";
import { useState } from "react";

export default function Reviews() {
  const reviews = [
    { title: "Customer Review 1", image: "/images/reviews/review1.jpg" },
    { title: "Customer Review 2", image: "/images/reviews/review2.jpg" },
    { title: "Customer Review 3", image: "/images/reviews/review3.jpg" },
    { title: "Customer Review 4", image: "/images/reviews/review4.jpg" },
    { title: "Customer Review 5", image: "/images/reviews/review5.jpg" },
    { title: "Customer Review 6", image: "/images/reviews/review6.jpg" },
  ];

  const [page, setPage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const desktopItemsPerPage = 2;
  const totalPages = Math.ceil(reviews.length / desktopItemsPerPage);

  const visibleReviews = reviews.slice(
    page * desktopItemsPerPage,
    page * desktopItemsPerPage + desktopItemsPerPage,
  );

  const currentReview = lightboxIndex !== null ? reviews[lightboxIndex] : null;

  function goNext() {
    setPage((currentPage) =>
      currentPage === totalPages - 1 ? 0 : currentPage + 1,
    );
  }

  function goPrevious() {
    setPage((currentPage) =>
      currentPage === 0 ? totalPages - 1 : currentPage - 1,
    );
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) goNext();
    if (distance < -minSwipeDistance) goPrevious();
  }

  return (
    <section id="reviews" className="bg-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Reviews
          </p>

          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            What Customers Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Real customer feedback from completed handyman projects.
          </p>

          <div className="mt-5 inline-flex rounded-full bg-[#F3FAFF] px-5 py-2 font-semibold text-blue-700">
            4.9 ★ rating on Thumbtack
          </div>
        </div>

        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="select-none"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {visibleReviews.map((review) => {
              const realIndex = reviews.findIndex(
                (item) => item.image === review.image,
              );

              return (
                <button
                  key={review.image}
                  type="button"
                  onClick={() => setLightboxIndex(realIndex)}
                  className="overflow-hidden rounded-3xl bg-[#F3FAFF] p-3 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <Image
                    src={review.image}
                    alt={review.title}
                    width={700}
                    height={500}
                    className="h-80 w-full rounded-2xl object-contain bg-white"
                    draggable={false}
                  />

                  <p className="mt-3 text-center text-sm font-medium text-slate-600">
                    Click to view full review
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrevious}
            className="rounded-full bg-[#F3FAFF] px-4 py-2 text-2xl font-bold text-blue-700 shadow-sm hover:bg-blue-50"
          >
            ‹
          </button>

          <div className="flex gap-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index)}
                className={`h-3 w-3 rounded-full transition ${
                  page === index ? "bg-blue-600" : "bg-blue-200"
                }`}
                aria-label={`Show review page ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="rounded-full bg-[#F3FAFF] px-4 py-2 text-2xl font-bold text-blue-700 shadow-sm hover:bg-blue-50"
          >
            ›
          </button>
        </div>
      </div>

      {currentReview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4">
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-xl font-bold text-slate-900"
          >
            ×
          </button>

          <Image
            src={currentReview.image}
            alt={currentReview.title}
            width={1200}
            height={900}
            className="max-h-[85vh] w-auto rounded-2xl object-contain"
          />
        </div>
      )}
    </section>
  );
}
