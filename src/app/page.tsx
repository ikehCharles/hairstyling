import Image from "next/image";
import Link from "next/link";
import { config, fetchServices } from "@/lib/config";
import ServiceCardsGrid from "@/components/ServiceCards";

const clientName = config.clientName;

/* ──────────────────────────── Hero ──────────────────────────── */

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop"
          alt="Luxury hair salon interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-6 animate-fade-in">
          Welcome to {clientName}
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-heading)] text-white font-bold leading-tight mb-6 animate-fade-in-up">
          Where Beauty
          <br />
          <span className="gradient-text">Meets Artistry</span>
        </h1>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200 leading-relaxed">
          {config.clientIntro}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
          <a
            href="#services"
            className="px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-700 text-white uppercase tracking-widest text-sm rounded-full hover:from-gold-600 hover:to-gold-800 transition-all shadow-2xl shadow-gold-500/30 hover:shadow-gold-500/50"
          >
            View Services
          </a>
          <Link
            href="/gallery"
            className="px-10 py-4 border border-white/30 text-white uppercase tracking-widest text-sm rounded-full hover:bg-white/10 transition-all"
          >
            Our Gallery
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-gold-400" />
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── Stats ─────────────────────────── */

function StatsSection() {
  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "10K+", label: "Happy Clients" },
    { number: "25+", label: "Expert Stylists" },
    { number: "50+", label: "Awards Won" },
  ];

  return (
    <section className="bg-charcoal py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold gradient-text mb-2">
              {stat.number}
            </p>
            <p className="text-white/50 text-sm uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────── Services ──────────────────────── */

async function ServicesSection() {
  const services = await fetchServices();

  if (services.length === 0) {
    return (
      <section id="services" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gold-600 uppercase tracking-[0.3em] text-sm mb-4">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold text-charcoal mb-6">
            Signature Hairstyles
          </h2>
          <p className="text-charcoal/60 text-lg">
            Services are being updated. Please check back soon or call us at{" "}
            <a
              href={`tel:${config.phoneNumber.replace(/\s/g, "")}`}
              className="text-gold-600 underline"
            >
              {config.phoneNumber}
            </a>
            .
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold-600 uppercase tracking-[0.3em] text-sm mb-4">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold text-charcoal mb-6">
            Signature Hairstyles
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto text-lg leading-relaxed">
            From classic cuts to bold transformations, our expert stylists bring
            your vision to life with precision and passion.
          </p>
        </div>

        <ServiceCardsGrid services={services} />
      </div>
    </section>
  );
}

/* ──────────────────────────── Why Us ────────────────────────── */

function WhyUsSection() {
  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
      ),
      title: "Master Stylists",
      description:
        "Our team of award-winning stylists brings decades of combined experience to every appointment.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      ),
      title: "Premium Products",
      description:
        "We exclusively use luxury, salon-grade products that nourish and protect your hair.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
      ),
      title: "Personalized Service",
      description:
        "Every visit begins with a detailed consultation to understand your unique style and goals.",
    },
  ];

  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-gold-500 uppercase tracking-[0.3em] text-sm mb-4">
            Why Choose Us
          </p>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold text-white mb-6">
            The {clientName} Difference
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-8 rounded-2xl border border-white/10 hover:border-gold-500/30 transition-all duration-500 group hover:bg-white/5"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-[family-name:var(--font-heading)] font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/50 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── CTA ───────────────────────────── */

function CTASection() {
  const phone = config.phoneNumber;
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <section id="contact" className="py-24 bg-cream relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-gold-600 uppercase tracking-[0.3em] text-sm mb-4">
          Ready for a Change?
        </p>
        <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold text-charcoal mb-6">
          Book Your Transformation
        </h2>
        <p className="text-charcoal/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Whether it&apos;s a fresh cut, a bold new color, or a special occasion
          style, we&apos;re here to make you look and feel extraordinary.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={phoneHref}
            className="px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-700 text-white uppercase tracking-widest text-sm rounded-full hover:from-gold-600 hover:to-gold-800 transition-all shadow-2xl shadow-gold-500/30"
          >
            Call {phone}
          </a>
          {config.instagramUrl && (
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 border-2 border-charcoal/20 text-charcoal uppercase tracking-widest text-sm rounded-full hover:bg-charcoal hover:text-white transition-all"
            >
              Follow on Instagram
            </a>
          )}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg shadow-black/5 max-w-lg mx-auto">
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-4">
            Get In Touch
          </h3>
          <p className="text-charcoal/60 mb-2">{config.phoneNumber}</p>
          <div className="text-sm text-charcoal/40 space-y-1">
            <p>Mon - Fri: 9AM - 8PM</p>
            <p>Sat: 9AM - 6PM &bull; Sun: 10AM - 5PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── Page ──────────────────────────── */

export default async function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyUsSection />
      <CTASection />
    </>
  );
}
