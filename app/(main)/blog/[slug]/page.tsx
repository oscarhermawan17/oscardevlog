import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost } from "@/sanity/queries/post";
import { highlightCode } from "@/lib/highlight-code";
import { PostContent } from "./_post-content";

type Props = { params: Promise<{ slug: string }> };

async function processBody(body: unknown[]): Promise<unknown[]> {
  return Promise.all(
    body.map(async (block: any) => {
      if (block._type === "code" && block.code) {
        const highlightedHtml = await highlightCode(
          block.code,
          block.language ?? "text"
        );
        return { ...block, highlightedHtml };
      }
      return block;
    })
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const ogImage = post.coverImage?.asset?.url
    ? `${post.coverImage.asset.url}?w=1200&h=630&fit=crop&auto=format`
    : undefined;

  return {
    title: post.title.en,
    description: post.excerpt.en,
    openGraph: {
      title: post.title.en,
      description: post.excerpt.en,
      type: "article",
      publishedTime: post.publishedAt,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: post.title.en,
      description: post.excerpt.en,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const processedPost = {
    ...post,
    body: {
      en: await processBody(post.body.en ?? []),
      id: await processBody(post.body.id ?? []),
    },
  };

  return <PostContent post={processedPost as typeof post} />;
}
