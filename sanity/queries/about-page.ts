import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity";
import type { PortableTextBlock } from "sanity";

export type AboutPageData = {
  title: { en: string; id: string };
  subtitle: { en: PortableTextBlock[]; id: PortableTextBlock[] };
};

export async function getAboutPage(): Promise<AboutPageData | null> {
  return sanityClient.fetch(
    groq`*[_type == "aboutPage" && _id == "aboutPage"][0]{
      title,
      subtitle
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}
