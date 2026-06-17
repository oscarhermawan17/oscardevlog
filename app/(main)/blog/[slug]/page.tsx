import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost } from "@/sanity/queries/post";
import { PostContent } from "./_post-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title.en,
    description: post.excerpt.en,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <PostContent post={post} />;
}
