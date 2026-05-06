"use client";

import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function GetQuoteModal({ isOpen, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    jobDescription: "",
    zipCode: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      alert("Quote request sent successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        jobDescription: "",
        zipCode: "",
      });

      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/60 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-3xl text-slate-500 shadow-sm hover:text-slate-900"
          aria-label="Close quote form"
        >
          ×
        </button>

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
            className="w-full rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number *"
            required
            className="w-full rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email *"
            required
            className="w-full rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500"
          />

          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Describe the job *"
            rows={4}
            required
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
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="ZIP Code *"
            required
            className="w-full rounded-2xl border border-blue-100 px-5 py-3 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "Sending..." : "Get My Free Quote →"}
          </button>

          <p className="text-center text-sm text-slate-500">
            We'll respond within 2 hours during business hours
          </p>
        </form>
      </div>
    </div>
  );
}
