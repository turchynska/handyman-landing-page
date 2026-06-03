"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GetQuoteModal from "@/components/GetQuoteModal";

export default function QuoteProvider() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenQuote={() => setIsModalOpen(true)} />
      <Hero onOpenQuote={() => setIsModalOpen(true)} />
      <GetQuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
