import type { Metadata } from "next";
import { getBlogPage } from "@/sanity/queries/blog-page";
import { getPosts } from "@/sanity/queries/posts";
import { BlogHeader } from "./_blog-header";
import { BlogList } from "./_blog-list";

export const metadata: Metadata = {
  title: "Blog & Vlog",
  description:
    "Written thoughts and visual logs — honest coding tutorials, absurd programmer comedy, and travel journals.",
};

export default async function BlogPage() {
  const [pageData, posts] = await Promise.all([getBlogPage(), getPosts()]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:py-16">
      <BlogHeader data={pageData} />
      <BlogList posts={posts} />
    </div>
  );
}
