export default function Contact() {
  return (
    <section id="contact" className="bg-[#F3FAFF] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* TITLE */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Contact Us
          </p>

          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Let’s Talk About Your Project
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Have questions or need help with a home project? Contact us directly
            anytime.
          </p>
        </div>

        {/* CONTACT CARD */}
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2">
            {/* LEFT */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Turch LLC Handyman
              </h3>

              <p className="mt-4 text-slate-600">
                Professional handyman services in Charlotte and surrounding
                areas.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Phone</p>

                  <a
                    href="tel:+17049128521"
                    className="text-lg font-semibold text-blue-700 hover:text-blue-800"
                  >
                    +1 (704) 912-8521
                  </a>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500">Email</p>

                  <a
                    href="mailto:drop2093@gmail.com"
                    className="text-lg font-semibold text-blue-700 hover:text-blue-800"
                  >
                    drop2093@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Service Area
                  </p>

                  <p className="text-lg font-semibold text-slate-900">
                    Charlotte, NC + 25 miles
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="rounded-3xl bg-[#F3FAFF] p-6">
              <h4 className="text-lg font-semibold text-slate-900">
                Business Hours
              </h4>

              <div className="mt-5 space-y-3 text-slate-700">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span>9:00 AM – 8:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM – 6:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="tel:+17049128521"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                >
                  Call Now
                </a>

                <a
                  href="mailto:drop2093@gmail.com"
                  className="rounded-xl border border-blue-200 bg-white px-5 py-3 text-center font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
