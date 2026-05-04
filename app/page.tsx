import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import Services from "@/components/Services";
// import WorkGallery from "@/components/WorkGallery";
// import Reviews from "@/components/Reviews";
// import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3FAFF] text-slate-900">
      <Navbar />
      <Hero />
      {/* <Services />
      <WorkGallery />
      <Reviews />
      <Contact /> */}
    </main>
  );
}
