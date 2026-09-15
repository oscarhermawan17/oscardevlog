"use client";

import Link from "next/link";
import { useLang } from "@/app/context/lang-context";
import type { PlaceItem } from "@/sanity/queries/place";
import { PLACE_TYPE_LABEL } from "@/lib/place-options";

const TYPE_BADGE: Record<PlaceItem["type"], string> = {
  hotel: "bg-sky text-[#0B0F19]",
  coffeeshop: "bg-rose text-white",
  "public-space": "border border-white/20 bg-white/5 text-ink",
  eatery: "border border-rose/40 bg-rose/10 text-rose",
};

function formatPrice(min: number, max: number, freeLabel: string) {
  if (min === 0 && max === 0) return freeLabel;
  const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
  if (min === max) return fmt(min);
  return `${fmt(min)} – ${fmt(max)}`;
}

function CoverThumb({ place }: { place: PlaceItem }) {
  const first = place.media[0];
  if (!first) return null;
  if (first._type === "mediaVideo") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rose/15 via-surface to-sky/15">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(11,15,25,0.6)] text-ink">
          <span className="ml-0.5 text-base">▶</span>
        </div>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- listing thumbnail sederhana
    <img
      src={first.image.asset.url}
      alt={first.alt}
      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
    />
  );
}

export function ExploreList({ places }: { places: PlaceItem[] }) {
  const { lang, t } = useLang();

  if (places.length === 0) {
    return <p className="text-muted">Belum ada tempat yang di-review.</p>;
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place) => (
        <li key={place._id}>
          <Link href={`/explore/${place.slug.current}`} className="group block h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-sky/40">
              <div className="aspect-video w-full overflow-hidden">
                <CoverThumb place={place} />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs font-semibold ${TYPE_BADGE[place.type]}`}
                  >
                    {PLACE_TYPE_LABEL[place.type][lang]}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {formatPrice(place.priceMin, place.priceMax, t.explore.free)}
                  </span>
                </div>
                <h2 className="text-lg font-bold leading-snug text-ink">
                  {place.title[lang]}
                </h2>
                <p className="flex-1 text-sm leading-6 text-muted">
                  {place.shortDescription[lang]}
                </p>
                <div className="flex items-center justify-between font-mono text-xs text-muted">
                  <span>
                    {place.location.area}, {place.location.city}
                  </span>
                  <span className="font-semibold text-sky">
                    {place.overall.toFixed(1)}
                    <span className="text-muted">/10</span>
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}
