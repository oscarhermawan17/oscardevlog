"use client";

import Link from "next/link";
import { useLang } from "@/app/context/lang-context";
import type { PostItem } from "@/sanity/queries/posts";

function Badge({ format }: { format: "article" | "video" }) {
  if (format === "article") {
    return (
      <span className="inline-flex items-center rounded-md bg-sky px-2.5 py-1 font-mono text-xs font-semibold text-[#0B0F19] transition-shadow group-hover:shadow-[0_0_14px_rgba(56,189,248,0.55)]">
        #Article
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-md bg-rose px-2.5 py-1 font-mono text-xs font-semibold text-white transition-shadow group-hover:shadow-[0_0_14px_rgba(244,63,94,0.55)]">
      #Video
    </span>
  );
}

const cardClass = (format: "article" | "video") =>
  `group flex h-full flex-col gap-4 rounded-xl border border-white/5 bg-surface p-6 transition-all duration-200 hover:-translate-y-1 ${
    format === "article" ? "hover:border-sky/40" : "hover:border-rose/40"
  }`;

function formatMeta(post: PostItem, lang: "en" | "id") {
  const date = new Date(post.publishedAt).toLocaleDateString(
    lang === "id" ? "id-ID" : "en-US",
    { month: "short", year: "numeric" }
  );
  if (post.format === "video") return `${post.readTime} min watch • ${date}`;
  return lang === "id"
    ? `${post.readTime} mnt baca • ${date}`
    : `${post.readTime} min read • ${date}`;
}

export function BlogList({ posts }: { posts: PostItem[] }) {
  const { lang } = useLang();

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post._id}>
          <Link href={`/blog/${post.slug.current}`} className="block h-full">
            <article className={cardClass(post.format)}>
              <div><Badge format={post.format} /></div>
              <h2 className="text-lg font-bold leading-snug text-ink">
                {post.title[lang]}
              </h2>
              <p className="flex-1 text-sm leading-6 text-muted">
                {post.excerpt[lang]}
              </p>
              <p className="font-mono text-xs text-muted">
                {formatMeta(post, lang)}
              </p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}
