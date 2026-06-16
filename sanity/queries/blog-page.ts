import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity";
import type { PortableTextBlock } from "sanity";

export type BlogPageData = {
  title: { en: string; id: string };
  subtitle: { en: PortableTextBlock[]; id: PortableTextBlock[] };
};

export async function getBlogPage(): Promise<BlogPageData | null> {
  return sanityClient.fetch(
    groq`*[_type == "blogPage" && _id == "blogPage"][0]{
      title,
      subtitle
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}
