import Image from "next/image";
import Link from "next/link";
import { config, fetchGallery } from "@/lib/config";
import GalleryGridClient from "@/components/GalleryGrid";

const clientName = config.clientName;

/* ──────────────────────────── Hero ──────────────────────────── */

function GalleryHero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1920&h=1080&fit=crop"
          alt="Hair salon styling tools"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
      <div className="relative z-10 text-center px-6">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4 animate-fade-in">
          {clientName} Portfolio
        </p>
        <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] text-white font-bold mb-6 animate-fade-in-up">
          The Gallery
        </h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto animate-fade-in-up animate-delay-200">
          Browse our collection of transformations and see the artistry behind
          every style.
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────── CTA ───────────────────────────── */

function GalleryCTA() {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold text-white mb-6">
          Ready to Be Our Next
          <br />
          <span className="gradient-text">Masterpiece?</span>
        </h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Join our growing family of happy clients. Book your appointment today
          and let us create something beautiful together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${config.phoneNumber.replace(/\s/g, "")}`}
            className="px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-700 text-white uppercase tracking-widest text-sm rounded-full hover:from-gold-600 hover:to-gold-800 transition-all shadow-2xl shadow-gold-500/30"
          >
            Call {config.phoneNumber}
          </a>
          <Link
            href="/#services"
            className="px-10 py-4 border border-white/30 text-white uppercase tracking-widest text-sm rounded-full hover:bg-white/10 transition-all"
          >
            View Services & Prices
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── Page ──────────────────────────── */

export default async function Gallery() {
  // Server-side: fetch at build time → baked into static HTML
  const initialGallery = await fetchGallery();

  return (
    <>
      <GalleryHero />
      {/* Client component: renders initialData immediately, then refetches fresh */}
      <GalleryGridClient initialData={initialGallery} />
      <GalleryCTA />
    </>
  );
}
