export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-blue-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#about" className="text-xl font-bold text-slate-900">
          TurchV LLC Handyman
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#about" className="hover:text-blue-600">
            About
          </a>
          <a href="#services" className="hover:text-blue-600">
            Services
          </a>
          <a href="#work" className="hover:text-blue-600">
            Before & After
          </a>
          <a href="#reviews" className="hover:text-blue-600">
            Reviews
          </a>
          <a href="#contact" className="hover:text-blue-600">
            Contact Us
          </a>
        </div>

        <a
          href="#contact"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          Get a Quote
        </a>
      </div>
    </nav>
  );
}
