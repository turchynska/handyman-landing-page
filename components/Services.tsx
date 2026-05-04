export default function Services() {
  const services = [
    {
      title: "TV Mounting",
      description:
        "Safe and clean TV installation with proper alignment and cable management.",
    },
    {
      title: "Drywall Repair",
      description:
        "Fix holes, cracks, and damaged walls with smooth and clean finish.",
    },
    {
      title: "Furniture Assembly",
      description:
        "Fast and correct assembly of furniture from IKEA and other brands.",
    },
    {
      title: "Light Fixtures",
      description:
        "Installation and replacement of ceiling lights, fans, and fixtures.",
    },
    {
      title: "Shelves & Hardware",
      description:
        "Mount shelves, mirrors, curtains, and other home accessories.",
    },
    {
      title: "Small Home Repairs",
      description:
        "General handyman help for small fixes and home improvements.",
    },
  ];

  return (
    <section id="services" className="bg-white px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* TITLE */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Services
          </p>

          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            What We Can Help You With
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Professional handyman services for your home — fast, reliable, and
            clean.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-blue-100 bg-[#F3FAFF] p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
