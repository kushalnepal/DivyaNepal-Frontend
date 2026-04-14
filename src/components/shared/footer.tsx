import Link from "next/link";

const footerLinks = {
  destinations: [
    { name: "Pashupatinath", href: "/temples/pashupatinath" },
    { name: "Buddha", href: "/temples/buddha-nagar" },
    { name: "Lumbini", href: "/temples/lumbini" },
    { name: "Hindu Pilgrimage", href: "/temples" },
  ],
  services: [
    { name: "Temple Tours", href: "/packages" },
    { name: "Puja Booking", href: "/packages" },
    { name: "Guide Services", href: "/contact" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-warm-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-saffron">
              Divya Nepal
            </Link>
            <p className="mt-4 text-white/80 max-w-sm">
              Your spiritual journey to Nepal&apos;s sacred lands. Discover ancient temples,
              book meaningful pujas, and experience divine darshan.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-saffron">
              Destinations
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-saffron transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-saffron">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-saffron transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-center text-white/60 text-sm">
            © {new Date().getFullYear()} Divya Nepal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}