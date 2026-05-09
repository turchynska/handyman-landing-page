"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type Status = "idle" | "loading" | "success" | "error";

export default function GetQuoteModal({ isOpen, onClose }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [photoName, setPhotoName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    jobDescription: "",
    zipCode: "",
  });

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPhotoName(file ? file.name : null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      // Use FormData so we can send the photo file alongside text fields
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("phone", formData.phone);
      payload.append("email", formData.email);
      payload.append("jobDescription", formData.jobDescription);
      payload.append("zipCode", formData.zipCode);

      const file = fileRef.current?.files?.[0];
      if (file) payload.append("photo", file);

      const response = await fetch("/api/quote", {
        method: "POST",
        body: payload, // no Content-Type header — browser sets it with boundary
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error);
        setStatus("error");
        return;
      }

      setStatus("success");

      // Reset after 2.5 s then close
      setTimeout(() => {
        setStatus("idle");
        setPhotoName(null);
        setFormData({
          name: "",
          phone: "",
          email: "",
          jobDescription: "",
          zipCode: "",
        });
        if (fileRef.current) fileRef.current.value = "";
        onClose();
      }, 2500);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  const isLoading = status === "loading";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/60 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-xl"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-3xl text-slate-500 shadow-sm hover:text-slate-900"
          aria-label="Close quote form"
        >
          ×
        </button>

        {/* Header */}
        <div className="shrink-0 px-6 pb-4 pt-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Get a Quote
          </p>
          <h2 className="pr-8 text-2xl font-bold text-slate-900 md:text-3xl">
            Tell Us About Your Project
          </h2>
          <p className="mt-3 text-sm text-slate-600 md:text-base">
            Fill out the form and we'll get back to you within 2 hours.
          </p>
        </div>

        {/* ── SUCCESS state ── */}
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center gap-4 px-6 pb-10 pt-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-4xl">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-900">Request Sent!</h3>
            <p className="text-slate-600">
              We received your request and will contact you shortly.
            </p>
          </div>
        ) : (
          /* ── FORM ── */
          <form
            onSubmit={handleSubmit}
            className="space-y-4 overflow-y-auto overscroll-contain px-6 pb-6 scrollbar-hide"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name *"
              required
              disabled={isLoading}
              className="w-full rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500 disabled:opacity-50"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number *"
              required
              disabled={isLoading}
              className="w-full rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500 disabled:opacity-50"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              required
              disabled={isLoading}
              className="w-full rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500 disabled:opacity-50"
            />

            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Describe the job *"
              rows={4}
              required
              disabled={isLoading}
              className="w-full resize-none rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500 disabled:opacity-50"
            />

            {/* Photo upload — styled */}
            <div>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-blue-200 bg-blue-50 px-5 py-4 text-center hover:border-blue-400 transition">
                <span className="text-2xl">📷</span>
                <span className="text-sm font-medium text-blue-700">
                  {photoName ? photoName : "Upload a photo (optional)"}
                </span>
                <span className="text-xs text-slate-500">
                  Helps Vlad give a more accurate estimate
                </span>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isLoading}
                  className="hidden"
                />
              </label>
              {photoName && (
                <button
                  type="button"
                  onClick={() => {
                    setPhotoName(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  className="mt-1 text-xs text-slate-400 hover:text-red-500"
                >
                  ✕ Remove photo
                </button>
              )}
            </div>

            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="ZIP Code *"
              required
              disabled={isLoading}
              className="w-full rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500 disabled:opacity-50"
            />

            {/* Error message */}
            {status === "error" && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                Something went wrong. Please try again or call us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 transition"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Get My Free Quote →"
              )}
            </button>

            <p className="text-center text-sm text-slate-500">
              Respond quickly!
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
