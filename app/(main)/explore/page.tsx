import type { Metadata } from "next";
import { getPlaces } from "@/sanity/queries/place";
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
      <h1 className="mb-4 font-mono text-2xl font-bold text-sky sm:text-3xl">
        Eksplor
      </h1>
      <p className="mb-10 max-w-2xl text-muted">
        Review hotel, coffee shop, dan public space yang pernah dikunjungi.
      </p>
      <ExploreList places={places} />
    </div>
  );
}
