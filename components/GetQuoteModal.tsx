"use client";

import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function GetQuoteModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/60 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-xl"
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-3xl text-slate-500 shadow-sm hover:text-slate-900"
          aria-label="Close quote form"
        >
          ×
        </button>

        {/* HEADER */}
        <div className="shrink-0 px-6 pb-4 pt-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Get a Quote
          </p>

          <h2 className="pr-8 text-2xl font-bold text-slate-900 md:text-3xl">
            Tell Us About Your Project
          </h2>

          <p className="mt-3 text-sm text-slate-600 md:text-base">
            Fill out the form below and we’ll contact you shortly.
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-4 overflow-y-auto overscroll-contain px-6 pb-6 scrollbar-hide">
          <input
            type="text"
            placeholder="Your Name *"
            className="w-full rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="tel"
            placeholder="Phone Number *"
            className="w-full rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Email *"
            className="w-full rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500"
          />

          <textarea
            placeholder="Describe the job *"
            rows={4}
            className="w-full resize-none rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500"
          />

          <div>
            <input
              type="file"
              className="w-full rounded-2xl border border-blue-100 bg-white px-5 py-3 text-sm text-slate-600"
            />

            <p className="mt-2 text-sm text-slate-500">
              Uploading photos helps us give a more accurate estimate.
            </p>
          </div>

          <input
            type="text"
            placeholder="ZIP Code *"
            className="w-full rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700"
          >
            Get My Free Quote →
          </button>

          <p className="text-center text-sm text-slate-500">
            We'll respond within 2 hours during business hours
          </p>
        </form>
      </div>
    </div>
  );
}
