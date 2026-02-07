// Environment configuration with fallbacks

export const config = {
  // API URLs
  sheetsApiUrl: process.env.NEXT_PUBLIC_SHEETS_API_URL ?? "",
  sheetsApiGalleryUrl: process.env.NEXT_PUBLIC_SHEETS_API_GALLERY_URL ?? "",

  // Client Information
  clientName: process.env.NEXT_PUBLIC_CLIENT_NAME ?? "Luxe Hair Studio",
  clientIntro:
    process.env.NEXT_PUBLIC_CLIENT_INTRO ??
    "Welcome to our modern hair styling studio.",
  phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+1 (555) 123-4567",

  // Social Links
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  twitterUrl: process.env.NEXT_PUBLIC_TWITTER_URL ?? "",
  tiktokUrl: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "",
};

// ─── API Types ───

export interface ServiceItem {
  Title: string;
  Price: string;
  Description: string;
  Category: string;
  Duration: string;
  ImageUrl: string;
  Active: boolean;
}

export interface GalleryItem {
  Caption: string;
  ImageUrl?: string;
  VideoUrl?: string;
}

// ─── Fetch helpers ───

export async function fetchServices(): Promise<ServiceItem[]> {
  if (!config.sheetsApiUrl) return [];
  try {
    const res = await fetch(config.sheetsApiUrl, {
      next: { revalidate: 60 }, // revalidate every 60 seconds
    });
    if (!res.ok) return [];
    const data: ServiceItem[] = await res.json();
    return data.filter((item) => item.Active !== false);
  } catch {
    console.error("Failed to fetch services");
    return [];
  }
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  if (!config.sheetsApiGalleryUrl) return [];
  try {
    const res = await fetch(config.sheetsApiGalleryUrl, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data: GalleryItem[] = await res.json();
    return data;
  } catch {
    console.error("Failed to fetch gallery");
    return [];
  }
}

/**
 * Extract the YouTube embed src URL from an iframe HTML string.
 * Returns the src or null if not found.
 */
export function extractYouTubeSrc(iframeHtml: string): string | null {
  const match = iframeHtml.match(/src="([^"]+)"/);
  return match ? match[1] : null;
}
