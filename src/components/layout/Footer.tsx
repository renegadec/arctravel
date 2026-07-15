import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { services, navLinks, contactInfo, socialLinks } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <img
                src="/arctravel_logo.svg"
                alt="ArcTravel"
                className="h-auto brightness-0 invert"
                style={{ width: "auto", height: "92px" }}
              />
            </Link>
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              Your trusted travel partner for flights, accommodations, tours, and
              everything in between. We make travel effortless.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
              Services
            </h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
                >
                  View all services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/50" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/50" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/50" />
                <span className="text-sm text-primary-foreground/70">
                  {contactInfo.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-6 sm:flex-row">
          <p className="text-xs text-primary-foreground/50">
            &copy; {new Date().getFullYear()} ArcTravel. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href={socialLinks.instagram}
              className="text-sm text-primary-foreground/50 transition-colors hover:text-primary-foreground"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href={socialLinks.facebook}
              className="text-sm text-primary-foreground/50 transition-colors hover:text-primary-foreground"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href={socialLinks.linkedin}
              className="text-sm text-primary-foreground/50 transition-colors hover:text-primary-foreground"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
