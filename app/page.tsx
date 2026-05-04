export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="px-6 py-16 text-center">
        <h1 className="text-4xl font-bold">Reliable Handyman Services</h1>
        <p className="mt-4 text-lg text-gray-600">
          Fast, affordable, and professional home repairs.
        </p>

        <a
          href="#form"
          className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-xl"
        >
          Get a Quote
        </a>
      </section>

      <section className="px-6 py-12 bg-gray-50">
        <h2 className="text-2xl text-center mb-6">Services</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border p-4 rounded-xl">TV Mounting</div>
          <div className="border p-4 rounded-xl">Drywall Repair</div>
          <div className="border p-4 rounded-xl">Installations</div>
        </div>
      </section>

      <section className="px-6 py-12">
        <h2 className="text-2xl text-center mb-6">Reviews</h2>
        <div className="max-w-xl mx-auto space-y-4">
          <div className="border p-4 rounded-xl">
            ⭐⭐⭐⭐⭐ Great service and quality work
          </div>
          <div className="border p-4 rounded-xl">
            ⭐⭐⭐⭐⭐ Fast and professional
          </div>
        </div>
      </section>

      <section id="form" className="px-6 py-12 bg-gray-50">
        <h2 className="text-2xl text-center mb-6">Get a Quote</h2>

        <form className="max-w-md mx-auto space-y-4">
          <input placeholder="Name" className="w-full border p-3 rounded-xl" />
          <input
            placeholder="Phone or Email"
            className="w-full border p-3 rounded-xl"
          />
          <textarea
            placeholder="Describe your job"
            className="w-full border p-3 rounded-xl"
          />

          <button className="w-full bg-black text-white p-3 rounded-xl">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
 