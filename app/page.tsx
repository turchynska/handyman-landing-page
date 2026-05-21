"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WorkGallery from "@/components/WorkGallery";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import GetQuoteModal from "@/components/GetQuoteModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F3FAFF] text-slate-900">
      <Navbar onOpenQuote={() => setIsModalOpen(true)} />
      <Hero onOpenQuote={() => setIsModalOpen(true)} />
      <Services />
      <WorkGallery />
      <Reviews />
      <Contact />
      <GetQuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
