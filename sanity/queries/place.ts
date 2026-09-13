import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity";
import type { PortableTextBlock } from "sanity";
import type { FacilityKey, GoodForKey, RatingAspectKey } from "@/lib/place-options";

export type PlaceType = "hotel" | "coffeeshop" | "public-space";

export type PlaceMediaItem =
  | {
      _type: "mediaImage";
      image: { asset: { url: string } };
      alt: string;
      caption?: string;
    }
  | {
      _type: "mediaVideo";
      youtubeUrl: string;
      caption?: string;
    };

export type PlaceRating = {
  aspect: RatingAspectKey;
  score: number;
};

export type PlaceLocation = {
  address?: string;
  area: string;
  city: string;
  googleMapsUrl: string;
};

// Bidang bersama antara listing dan detail
const PLACE_ITEM_FIELDS = groq`
  _id,
  slug,
  type,
  title,
  shortDescription,
  media[0...3] {
    _type,
    _type == "mediaImage" => { image { asset->{ url } }, alt, caption },
    _type == "mediaVideo" => { youtubeUrl, caption }
  },
  priceMin,
  priceMax,
  overall,
  location,
  visitedAt,
  publishedAt
`;

export type PlaceItem = {
  _id: string;
  slug: { current: string };
  type: PlaceType;
  title: { id: string; en: string };
  shortDescription: { id: string; en: string };
  media: PlaceMediaItem[];
  priceMin: number;
  priceMax: number;
  overall: number;
  location: PlaceLocation;
  visitedAt: string;
  publishedAt: string;
};

export async function getPlaces(): Promise<PlaceItem[]> {
  return sanityClient.fetch(
    groq`*[_type == "place"] | order(visitedAt desc) { ${PLACE_ITEM_FIELDS} }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export type PlaceDetail = PlaceItem & {
  description: { id: PortableTextBlock[]; en: PortableTextBlock[] };
  media: PlaceMediaItem[]; // full array, tidak dipotong seperti listing
  facilities: FacilityKey[];
  goodFor: GoodForKey[];
  pros: { id: string; en: string }[];
  cons: { id: string; en: string }[];
  ratings: PlaceRating[];
};

export async function getPlace(slug: string): Promise<PlaceDetail | null> {
  return sanityClient.fetch(
    groq`*[_type == "place" && slug.current == $slug][0]{
      _id,
      slug,
      type,
      title,
      shortDescription,
      description,
      media[] {
        _type,
        _type == "mediaImage" => { image { asset->{ url } }, alt, caption },
        _type == "mediaVideo" => { youtubeUrl, caption }
      },
      priceMin,
      priceMax,
      "facilities": coalesce(facilities, []),
      "goodFor": coalesce(goodFor, []),
      "pros": coalesce(pros, []),
      "cons": coalesce(cons, []),
      location,
      "ratings": coalesce(ratings, []),
      overall,
      visitedAt,
      publishedAt
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}
