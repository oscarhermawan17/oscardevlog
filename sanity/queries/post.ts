import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity";
import type { PortableTextBlock } from "sanity";

export type PostDetail = {
  _id: string;
  slug: { current: string };
  format: "article" | "video";
  publishedAt: string;
  readTime: number;
  youtubeUrl?: string;
  coverImage?: { asset: { url: string }; alt?: string };
  title: { en: string; id: string };
  excerpt: { en: string; id: string };
  body: { en: PortableTextBlock[]; id: PortableTextBlock[] };
  tags?: { name: string; slug: { current: string } }[];
};

export async function getPost(slug: string): Promise<PostDetail | null> {
  return sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      slug,
      format,
      publishedAt,
      readTime,
      youtubeUrl,
      coverImage { asset->{ url }, alt },
      title,
      excerpt,
      body,
      "tags": tags[]->{ name, slug }
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}
