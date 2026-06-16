import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity";
import type { PortableTextBlock } from "sanity";

export type HomePageData = {
  title: { en: string; id: string };
  subtitle: { en: PortableTextBlock[]; id: PortableTextBlock[] };
};

export async function getHomePage(): Promise<HomePageData | null> {
  return sanityClient.fetch(
    groq`*[_type == "homePage" && _id == "homePage"][0]{
      title,
      subtitle
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}
