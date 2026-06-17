import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity";

export type PostItem = {
  _id: string;
  slug: { current: string };
  format: "article" | "video";
  publishedAt: string;
  readTime: number;
  title: { en: string; id: string };
  excerpt: { en: string; id: string };
  tags?: { name: string; slug: { current: string } }[];
};

export async function getPosts(): Promise<PostItem[]> {
  return sanityClient.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      slug,
      format,
      publishedAt,
      readTime,
      title,
      excerpt,
      "tags": tags[]->{ name, slug }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}
