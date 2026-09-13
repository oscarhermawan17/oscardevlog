import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlace } from "@/sanity/queries/place";
import { PlaceContent } from "./_place-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlace(slug);
  if (!place) return {};

  const ogImage =
    place.media.find((m) => m._type === "mediaImage")?.image?.asset?.url;

  return {
    title: place.title.id,
    description: place.shortDescription.id,
    openGraph: {
      title: place.title.id,
      description: place.shortDescription.id,
      type: "article",
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
  };
}

export default async function PlacePage({ params }: Props) {
  const { slug } = await params;
  const place = await getPlace(slug);
  if (!place) notFound();

  return <PlaceContent place={place} />;
}
