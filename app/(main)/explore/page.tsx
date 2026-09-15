import type { Metadata } from "next";
import { getPlaces } from "@/sanity/queries/place";
import { ExploreHeader } from "./_explore-header";
import { ExploreList } from "./_explore-list";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Review jujur hotel, coffee shop, dan public space yang pernah dikunjungi.",
};

export default async function ExplorePage() {
  const places = await getPlaces();

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:py-16">
      <ExploreHeader />
      <ExploreList places={places} />
    </div>
  );
}
