import Image from "next/image";

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
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Services
          </p>

          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            What We Can Help You With
          </h2>

        
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* LEFT — SERVICES */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-3xl border border-blue-100 bg-[#F3FAFF] p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-sm font-semibold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT — MAP */}
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/images/service-area.jpg"
              alt="Service Area"
              width={800}
              height={600}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* BOTTOM TEXT */}
        <p className="mt-10 text-center text-slate-600">
          Serving Charlotte and surrounding areas within 25 miles
        </p>
      </div>
    </section>
  );
}
