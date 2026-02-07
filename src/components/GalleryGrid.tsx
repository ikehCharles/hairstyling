"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  config,
  fetchGallery,
  extractYouTubeSrc,
  type GalleryItem,
} from "@/lib/config";

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

/* ──────────────────── Exported Gallery Component ────────────── */

/**
 * Renders with `initialData` immediately (from server/build),
 * then refetches fresh data client-side on mount.
 */
export default function GalleryGridClient({
  initialData,
}: {
  initialData: GalleryItem[];
}) {
  const [items, setItems] = useState<GalleryItem[]>(initialData);

  // Client-side refresh on mount
  useEffect(() => {
    fetchGallery().then((fresh) => {
      if (fresh.length > 0) setItems(fresh);
    });
  }, []);

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
            We&apos;re updating our gallery. Check back soon
            {config.instagramUrl && (
              <>
                {" "}or follow us on{" "}
                <a
                  href={config.instagramUrl}
                  className="text-gold-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </>
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
