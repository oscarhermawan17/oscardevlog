"use client";

import { useEffect, useState } from "react";
import { PortableText, type PortableTextComponents } from "next-sanity";
import {
  Coffee,
  Sparkles,
  ConciergeBell,
  Wifi,
  Wallet,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  Star,
  StarHalf,
  Snowflake,
  Plug,
  ParkingCircle,
  Landmark,
  Bath,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/app/context/lang-context";
import type { PlaceDetail, PlaceMediaItem } from "@/sanity/queries/place";
import {
  FACILITY_LABEL,
  GOOD_FOR_LABEL,
  RATING_ASPECT_LABEL,
  PLACE_TYPE_LABEL,
  type FacilityKey,
  type GoodForKey,
  type RatingAspectKey,
} from "@/lib/place-options";

const TYPE_BADGE: Record<PlaceDetail["type"], string> = {
  hotel: "bg-sky text-[#0B0F19]",
  coffeeshop: "bg-rose text-white",
  "public-space": "border border-white/20 bg-white/5 text-ink",
  eatery: "border border-rose/40 bg-rose/10 text-rose",
};

const ASPECT_ICON: Record<RatingAspectKey, LucideIcon> = {
  taste: Coffee,
  ambience: Sparkles,
  service: ConciergeBell,
  facilities: Wifi,
  value: Wallet,
};

const FACILITY_ICON: Record<FacilityKey, LucideIcon> = {
  wifi: Wifi,
  ac: Snowflake,
  "prayer-room": Landmark,
  "power-outlet": Plug,
  restroom: Bath,
  "motorcycle-parking": ParkingCircle,
  "car-parking": ParkingCircle,
};

/** Konversi skor skala 1-10 ke 5 bintang (mendukung setengah bintang). */
function StarRow({ score }: { score: number }) {
  const starsOutOf5 = score / 2;
  const full = Math.floor(starsOutOf5);
  const hasHalf = starsOutOf5 - full >= 0.5;

  return (
    <div className="flex items-center gap-0.5 text-sky">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <Star key={i} size={16} fill="currentColor" />;
        if (i === full && hasHalf) return <StarHalf key={i} size={16} fill="currentColor" />;
        return <Star key={i} size={16} className="text-white/15" />;
      })}
    </div>
  );
}

/**
 * Konversi URL YouTube (watch, share, atau embed) jadi URL embed yang valid.
 * Menangani query string (?v=, &t=, dsb) dengan parsing URL asli, bukan
 * string replace naif — string replace akan merusak parameter setelah "?".
 */
function toYouTubeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    let videoId = parsed.searchParams.get("v");

    if (!videoId && parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    }
    if (!videoId && parsed.pathname.startsWith("/embed/")) {
      videoId = parsed.pathname.replace("/embed/", "");
    }
    if (!videoId) return url;

    const start = parsed.searchParams.get("t") ?? parsed.searchParams.get("start");
    const embed = new URL(`https://www.youtube.com/embed/${videoId}`);
    if (start) embed.searchParams.set("start", start.replace(/s$/, ""));
    return embed.toString();
  } catch {
    return url;
  }
}

function formatPriceRange(min: number, max: number, freeLabel: string) {
  if (min === 0 && max === 0) return freeLabel;
  const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
  if (min === max) return fmt(min);
  return `${fmt(min)} – ${fmt(max)}`;
}

function PriceBadge({ min, max, freeLabel }: { min: number; max: number; freeLabel: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-white/10 bg-surface px-2.5 py-1 font-mono text-xs font-semibold text-muted">
      {formatPriceRange(min, max, freeLabel)}
    </span>
  );
}

function MediaThumb({ item }: { item: PlaceMediaItem }) {
  if (item._type === "mediaVideo") {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-rose/15 via-surface to-sky/15">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(11,15,25,0.6)] text-ink">
          <span className="ml-0.5 text-lg">▶</span>
        </div>
        {item.caption && (
          <span className="absolute bottom-2 left-2 rounded-md bg-[rgba(11,15,25,0.7)] px-2 py-0.5 font-mono text-xs text-muted">
            {item.caption}
          </span>
        )}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- galeri custom (lightbox + bento), belum pakai next/image
    <img
      src={item.image.asset.url}
      alt={item.alt}
      className="h-full w-full object-cover"
    />
  );
}

/**
 * Preview statis (bento): 1 foto besar + hingga 2 thumbnail di kanan.
 * Klik mana pun membuka lightbox di index yang sesuai — interaksi selalu
 * konsisten terlepas dari jumlah media (tidak ada slide langsung di preview).
 */
function MediaGallery({
  media,
  onOpen,
}: {
  media: PlaceMediaItem[];
  onOpen: (index: number) => void;
}) {
  const extraCount = media.length - 3;

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:grid-rows-2">
      {/*
        Mobile: cuma foto utama yang tampil (aspect-video, full width).
        Di sm ke atas baru muncul bento 3-foto. Overlay "+N" tetap
        ditampilkan di mobile lewat foto utama supaya user tetap tahu
        ada lebih banyak media untuk dibuka lewat lightbox.
      */}
      <button
        onClick={() => onOpen(0)}
        aria-label="Buka galeri"
        className="relative col-span-1 row-span-2 aspect-video overflow-hidden rounded-xl sm:col-span-2 sm:aspect-auto"
      >
        <MediaThumb item={media[0]} />
        {media.length > 1 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-md bg-[rgba(11,15,25,0.7)] px-2.5 py-1 font-mono text-xs text-ink sm:hidden">
            <Images size={14} />
            {media.length}
          </div>
        )}
      </button>

      {media[1] && (
        <button
          onClick={() => onOpen(1)}
          aria-label="Buka galeri"
          className="hidden aspect-video overflow-hidden rounded-xl sm:block sm:aspect-auto"
        >
          <MediaThumb item={media[1]} />
        </button>
      )}

      {media[2] && (
        <button
          onClick={() => onOpen(2)}
          aria-label="Buka galeri"
          className="relative hidden aspect-video overflow-hidden rounded-xl sm:block sm:aspect-auto"
        >
          <MediaThumb item={media[2]} />
          {extraCount > 0 && (
            <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-[rgba(11,15,25,0.65)] font-mono text-sm font-semibold text-ink">
              <Images size={16} />+{extraCount}
            </div>
          )}
        </button>
      )}
    </div>
  );
}

function MediaLightbox({
  media,
  title,
  index,
  onClose,
  onNavigate,
}: {
  media: PlaceMediaItem[];
  title: string;
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index - 1 + media.length) % media.length);
      if (e.key === "ArrowRight") onNavigate((index + 1) % media.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, media.length, onClose, onNavigate]);

  const item = media[index];

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[rgba(11,15,25,0.96)] backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="font-mono text-xs text-muted">
          {index + 1} / {media.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-white/10"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16">
        <div className="aspect-video w-[min(100%,calc(75vh*16/9),56rem)] overflow-hidden rounded-xl">
          {item._type === "mediaVideo" ? (
            <iframe
              src={toYouTubeEmbedUrl(item.youtubeUrl)}
              title={`${title} — video ${index + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <MediaThumb item={item} />
          )}
        </div>

        {media.length > 1 && (
          <>
            <button
              onClick={() => onNavigate((index - 1 + media.length) % media.length)}
              aria-label="Sebelumnya"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-ink backdrop-blur transition-colors hover:bg-white/15 sm:left-6"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => onNavigate((index + 1) % media.length)}
              aria-label="Berikutnya"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-ink backdrop-blur transition-colors hover:bg-white/15 sm:right-6"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function SidebarCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-surface p-6">
      <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
        {title}
      </h3>
      {children}
    </div>
  );
}

const descriptionComponents: PortableTextComponents = {
  block: {
    // Setiap block "normal" dirender sebagai <p> dengan margin bawah —
    // ini juga membuat paragraf kosong (baris kosong yang sengaja
    // ditambahkan di Studio) tetap terlihat sebagai jarak antar paragraf.
    normal: ({ children }) => <p className="mb-4 last:mb-0 min-h-[1em]">{children}</p>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-sky underline underline-offset-2 hover:text-sky/80"
      >
        {children}
      </a>
    ),
  },
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-xl border border-white/10 bg-base/60 px-3 py-1.5 text-sm text-muted">
      {children}
    </span>
  );
}

function FacilityChip({ facilityKey, lang }: { facilityKey: FacilityKey; lang: "id" | "en" }) {
  const Icon = FACILITY_ICON[facilityKey] ?? Landmark;
  return (
    <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-base/60 px-3 py-1.5 text-sm text-muted">
      <Icon size={15} className="text-sky" />
      {FACILITY_LABEL[facilityKey][lang]}
    </span>
  );
}

export function PlaceContent({ place }: { place: PlaceDetail }) {
  const { lang, t } = useLang();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visitedDate = new Date(place.visitedAt).toLocaleDateString(
    lang === "id" ? "id-ID" : "en-US",
    { day: "numeric", month: "long", year: "numeric" }
  );
  const publishedDate = new Date(place.publishedAt).toLocaleDateString(
    lang === "id" ? "id-ID" : "en-US",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <article className="mx-auto max-w-6xl px-6 py-8 lg:py-16">
      {/* Meta badges */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span
          className={`inline-flex items-center rounded-md px-2.5 py-1 font-mono text-xs font-semibold ${TYPE_BADGE[place.type]}`}
        >
          {PLACE_TYPE_LABEL[place.type][lang]}
        </span>
        <PriceBadge min={place.priceMin} max={place.priceMax} freeLabel={t.explore.free} />
      </div>

      {/* Title */}
      <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
        {place.title[lang]}
      </h1>
      <p className="mb-6 max-w-3xl text-lg leading-7 text-muted">
        {place.shortDescription[lang]}
      </p>

      {/* Location + dates */}
      <div className="mb-10 flex flex-wrap items-center gap-3 font-mono text-sm text-muted">
        <span>
          {place.location.area}, {place.location.city}
        </span>
        <span className="text-white/20">•</span>
        <span>
          {t.explore.visitedAt} {visitedDate}
        </span>
        <a
          href={place.location.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-sky transition-colors hover:border-sky/40"
        >
          {t.explore.openMaps} ↗
        </a>
      </div>

      {/* Media gallery — preview statis, slide hanya di lightbox */}
      <div className="mb-10">
        <MediaGallery media={place.media} onOpen={setLightboxIndex} />
      </div>

      {lightboxIndex !== null && (
        <MediaLightbox
          media={place.media}
          title={place.title[lang]}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      {/* Ratings — full width, lingkaran overall di kiri + detail aspek di kanan */}
      <div className="mb-10 rounded-xl border border-white/5 bg-surface p-6 sm:p-8">
        <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
          {/* Overall score circle */}
          <div className="flex flex-col items-center justify-center gap-3 sm:pr-8 sm:border-r sm:border-white/5">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {t.explore.overall}
            </span>
            <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border-4 border-sky/25 bg-base">
              <span className="font-mono text-4xl font-bold leading-none text-sky">
                {place.overall.toFixed(1)}
              </span>
              <span className="mt-1 font-mono text-xs text-muted">/ 10</span>
            </div>
            <StarRow score={place.overall} />
          </div>

          {/* Aspect breakdown */}
          <ul className="grid gap-4 sm:grid-cols-2">
            {place.ratings.map((r) => {
              const Icon = ASPECT_ICON[r.aspect];
              return (
                <li
                  key={r.aspect}
                  className="flex items-center gap-3 rounded-lg bg-base/40 px-4 py-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky/10 text-sky">
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm text-ink">
                        {RATING_ASPECT_LABEL[r.aspect][lang]}
                      </span>
                      <span className="font-mono text-sm font-semibold text-sky">
                        {r.score.toFixed(1)}
                      </span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-sky/70"
                        style={{ width: `${(r.score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Main 8/4 layout */}
      <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        {/* Left column — description */}
        <div className="text-lg leading-8 text-muted">
          <PortableText
            value={place.description[lang]}
            components={descriptionComponents}
          />
        </div>

        {/* Right column — sidebar cards */}
        <div className="flex flex-col gap-6">
          <SidebarCard title={t.explore.facilitiesTitle}>
            <div className="flex flex-wrap gap-2">
              {place.facilities.map((f) => (
                <FacilityChip key={f} facilityKey={f} lang={lang} />
              ))}
            </div>
          </SidebarCard>

          <SidebarCard title={t.explore.goodForTitle}>
            <div className="flex flex-wrap gap-2">
              {place.goodFor.map((g: GoodForKey) => (
                <Chip key={g}>{GOOD_FOR_LABEL[g][lang]}</Chip>
              ))}
            </div>
          </SidebarCard>

          {/* Pros / Cons — hanya tampil kalau ada isinya */}
          {place.pros.length > 0 && (
            <SidebarCard title={t.explore.prosTitle}>
              <ul className="space-y-2.5 text-sm leading-6 text-muted">
                {place.pros.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-sky">▹</span>
                    <span>{p[lang]}</span>
                  </li>
                ))}
              </ul>
            </SidebarCard>
          )}

          {place.cons.length > 0 && (
            <SidebarCard title={t.explore.consTitle}>
              <ul className="space-y-2.5 text-sm leading-6 text-muted">
                {place.cons.map((c, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-rose">▹</span>
                    <span>{c[lang]}</span>
                  </li>
                ))}
              </ul>
            </SidebarCard>
          )}
        </div>
      </div>

      {/* Author footer */}
      <div className="mt-12 flex items-center gap-4 border-t border-white/5 pt-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky/30 to-rose/30 font-mono text-lg font-bold text-ink">
          O
        </div>
        <div>
          <p className="font-semibold text-ink">Oscar Hermawan</p>
          <p className="text-sm text-muted">
            {t.explore.publishedAt} {publishedDate}
          </p>
        </div>
      </div>
    </article>
  );
}
