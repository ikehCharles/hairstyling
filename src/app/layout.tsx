import type { Metadata } from "next";
import Link from "next/link";
import { config } from "@/lib/config";
import "./globals.css";

const clientName = config.clientName;
const brandInitial = clientName.charAt(0).toUpperCase();

export const metadata: Metadata = {
  title: `${clientName} | Premium Hairstyling`,
  description: config.clientIntro,
};

function SocialIcon({ platform, url }: { platform: string; url: string }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/30 hover:text-gold-400 transition-colors text-sm"
    >
      {platform}
    </a>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {brandInitial}
            </span>
          </div>
          <span className="text-xl font-bold tracking-wide text-white">
            {clientName}
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-white/80 hover:text-gold-400 transition-colors text-sm uppercase tracking-widest"
          >
            Home
          </Link>
          <Link
            href="/#services"
            className="text-white/80 hover:text-gold-400 transition-colors text-sm uppercase tracking-widest"
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="text-white/80 hover:text-gold-400 transition-colors text-sm uppercase tracking-widest"
          >
            Gallery
          </Link>
          <Link
            href="/#contact"
            className="text-white/80 hover:text-gold-400 transition-colors text-sm uppercase tracking-widest"
          >
            Contact
          </Link>
          <Link
            href="/#services"
            className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-700 text-white text-sm uppercase tracking-widest rounded-full hover:from-gold-600 hover:to-gold-800 transition-all shadow-lg shadow-gold-500/25"
          >
            Book Now
          </Link>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Link
            href="/#services"
            className="px-5 py-2 bg-gradient-to-r from-gold-500 to-gold-700 text-white text-xs uppercase tracking-widest rounded-full"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const socials = [
    { platform: "Instagram", url: config.instagramUrl },
    { platform: "Facebook", url: config.facebookUrl },
    { platform: "Twitter", url: config.twitterUrl },
    { platform: "TikTok", url: config.tiktokUrl },
  ];

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {brandInitial}
                </span>
              </div>
              <span className="text-xl font-bold tracking-wide">
                {clientName}
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              {config.clientIntro}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "Services", "Gallery", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "Gallery"
                        ? "/gallery"
                        : item === "Home"
                          ? "/"
                          : `/#${item.toLowerCase()}`
                    }
                    className="text-white/50 hover:text-gold-400 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-4">
              Hours
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>Mon - Fri: 9AM - 8PM</li>
              <li>Saturday: 9AM - 6PM</li>
              <li>Sunday: 10AM - 5PM</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <a
                  href={`tel:${config.phoneNumber.replace(/\s/g, "")}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {config.phoneNumber}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} {clientName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socials.map(
              (s) =>
                s.url && (
                  <SocialIcon
                    key={s.platform}
                    platform={s.platform}
                    url={s.url}
                  />
                ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-charcoal font-[var(--font-body)]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
