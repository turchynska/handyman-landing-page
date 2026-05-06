import Image from "next/image";

export default function Hero() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-6 md:py-6">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <p className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Trusted Local Handyman Service
          </p>

          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
           Handyman Services for Your Home in Charlotte NC
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Most jobs range from 130$.
            
            Professional help with TV mounting, furniture assembly, drywall
            repair, small installations, and home maintenance.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Get a Free Quote
            </a>

            <a
              href="tel:+17049128521"
              className="rounded-xl border border-blue-200 bg-white px-6 py-3 text-center font-semibold text-blue-700 hover:bg-blue-50"
            >
              Call Now
            </a>
          </div>

          <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-blue-700">4.9★</p>
              <p className="text-sm text-slate-500">Reviews</p>
            </div>

            <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-blue-700">Fast</p>
              <p className="text-sm text-slate-500">Response</p>
            </div>

            <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-blue-700">Local</p>
              <p className="text-sm text-slate-500">Service</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-blue-200 blur-3xl" />
          <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-cyan-200 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-xl">
            <Image
              src="/hero-handyman.jpg"
              alt="Handyman work"
              width={700}
              height={800}
              className="h-[420px] w-full rounded-[1.5rem] object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-5 left-6 rounded-2xl bg-white px-5 py-4 shadow-lg">
            <p className="font-semibold text-slate-900">Vlad</p>
            <p className="text-sm text-slate-500">+1 (704) 912-8521</p>
          </div>
        </div>
      </div>
    </section>
  );
}
