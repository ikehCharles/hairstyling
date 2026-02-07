"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { fetchServices, type ServiceItem } from "@/lib/config";

/* ──────────────────────── Lightbox Modal ────────────────────── */

function Lightbox({
  item,
  onClose,
}: {
  item: ServiceItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      <div
        className="relative z-10 max-w-4xl w-full animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:right-0 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative w-full aspect-[3/4] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={item.ImageUrl}
            alt={item.Title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-24 pb-8 px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-gold-500/90 text-white text-xs uppercase tracking-wider rounded-full mb-3">
                  {item.Category}
                </span>
                <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] font-bold text-white">
                  {item.Title}
                </h2>
                <p className="text-white/70 mt-2 text-sm md:text-base max-w-xl leading-relaxed">
                  {item.Description}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-3xl md:text-4xl font-bold text-gold-400">
                  {item.Price}
                </p>
                <p className="text-white/50 text-sm mt-1">{item.Duration}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────── Service Card ──────────────────────── */

function ServiceCard({
  item,
  index,
  onSelect,
}: {
  item: ServiceItem;
  index: number;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-72 overflow-hidden">
        <Image
          src={item.ImageUrl}
          alt={item.Title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gold-500/90 text-white text-xs uppercase tracking-wider rounded-full backdrop-blur-sm">
            {item.Category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 text-charcoal font-bold text-sm rounded-full backdrop-blur-sm">
            {item.Price}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal mb-2">
          {item.Title}
        </h3>
        <p className="text-charcoal/50 text-sm leading-relaxed mb-4">
          {item.Description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-charcoal/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">{item.Duration}</span>
          </div>
          <span className="text-gold-600 text-sm font-medium">
            View &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── Exported Grid Component ──────────────── */

/**
 * Renders with `initialData` immediately (from server/build),
 * then refetches fresh data client-side on mount.
 */
export default function ServiceCardsGrid({
  initialData,
}: {
  initialData: ServiceItem[];
}) {
  const [services, setServices] = useState<ServiceItem[]>(initialData);
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  // Client-side refresh on mount
  useEffect(() => {
    fetchServices().then((fresh) => {
      if (fresh.length > 0) setServices(fresh);
    });
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  if (services.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((item, index) => (
          <ServiceCard
            key={item.Title}
            item={item}
            index={index}
            onSelect={() => setSelected(item)}
          />
        ))}
      </div>

      {selected && <Lightbox item={selected} onClose={handleClose} />}
    </>
  );
}
