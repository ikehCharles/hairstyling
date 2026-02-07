import Image from "next/image";
import Link from "next/link";
import {
  config,
  fetchGallery,
  extractYouTubeSrc,
  type GalleryItem,
} from "@/lib/config";

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

/* ──────────────────────────── Image Card ────────────────────── */

function GalleryImageCard({ item }: { item: GalleryItem }) {
  return (
    <div className="break-inside-avoid group relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500">
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src={item.ImageUrl!}
          alt={item.Caption}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
          <div className="p-6">
            <p className="text-gold-400 text-sm font-medium uppercase tracking-wider">
              {item.Caption}
            </p>
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-black/50 text-white text-xs uppercase tracking-wider rounded-full backdrop-blur-md">
            {item.Caption}
          </span>
        </div>
      </div>

      <div className="p-6">
        <svg
          className="w-8 h-8 text-gold-500/30 mb-3"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
        </svg>
        <p className="text-charcoal font-[family-name:var(--font-heading)] text-lg font-semibold">
          {item.Caption}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────── Video Card ────────────────────── */

function GalleryVideoCard({ item }: { item: GalleryItem }) {
  const src = extractYouTubeSrc(item.VideoUrl ?? "");
  if (!src) return null;

  return (
    <div className="break-inside-avoid group bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500">
      <div className="relative w-full aspect-video overflow-hidden">
        <iframe
          src={src}
          title={item.Caption}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          {/* Play icon */}
          <svg
            className="w-5 h-5 text-gold-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-xs uppercase tracking-wider text-gold-600 font-medium">
            Video
          </span>
        </div>
        <p className="text-charcoal font-[family-name:var(--font-heading)] text-lg font-semibold">
          {item.Caption}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────── Gallery Grid ──────────────────── */

async function GalleryGrid() {
  const items = await fetchGallery();

  if (items.length === 0) {
    return (
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gold-600 uppercase tracking-[0.3em] text-sm mb-4">
            Our Work
          </p>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold text-charcoal mb-6">
            Gallery Coming Soon
          </h2>
          <p className="text-charcoal/60 text-lg">
            We&apos;re updating our gallery. Check back soon or follow us on{" "}
            {config.instagramUrl && (
              <a
                href={config.instagramUrl}
                className="text-gold-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            )}
            .
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold-600 uppercase tracking-[0.3em] text-sm mb-4">
            Our Work
          </p>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold text-charcoal mb-6">
            Previous Work
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto text-lg">
            Every style tells a story. Browse our latest creations.
          </p>
        </div>

        {/* Masonry-style Gallery */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item, index) =>
            item.ImageUrl ? (
              <GalleryImageCard key={`img-${index}`} item={item} />
            ) : item.VideoUrl ? (
              <GalleryVideoCard key={`vid-${index}`} item={item} />
            ) : null,
          )}
        </div>
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
  return (
    <>
      <GalleryHero />
      <GalleryGrid />
      <GalleryCTA />
    </>
  );
}
