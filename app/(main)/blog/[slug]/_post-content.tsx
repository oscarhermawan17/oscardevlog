"use client";

import Image from "next/image";
import { PortableText } from "next-sanity";
import { useLang } from "@/app/context/lang-context";
import { portableTextComponents } from "@/lib/portable-text";
import type { PostDetail } from "@/sanity/queries/post";

function Badge({ format }: { format: "article" | "video" }) {
  if (format === "article") {
    return (
      <span className="inline-flex items-center rounded-md bg-sky px-2.5 py-1 font-mono text-xs font-semibold text-[#0B0F19]">
        #Article
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-md bg-rose px-2.5 py-1 font-mono text-xs font-semibold text-white">
      #Video
    </span>
  );
}

export function PostContent({ post }: { post: PostDetail }) {
  const { lang } = useLang();

  const date = new Date(post.publishedAt).toLocaleDateString(
    lang === "id" ? "id-ID" : "en-US",
    { day: "numeric", month: "long", year: "numeric" }
  );
  const meta =
    post.format === "video"
      ? `${post.readTime} min watch`
      : lang === "id"
        ? `${post.readTime} mnt baca`
        : `${post.readTime} min read`;

  return (
    <article className="mx-auto max-w-3xl px-6 py-8 lg:py-16">
      {/* Meta */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge format={post.format} />
        {post.tags?.map((tag) => (
          <span key={tag.slug.current} className="font-mono text-xs text-muted">
            #{tag.name}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
        {post.title[lang]}
      </h1>

      {/* Date + read time */}
      <p className="mb-10 font-mono text-sm text-muted">
        {date} · {meta}
      </p>

      {/* Cover image */}
      {post.coverImage?.asset?.url && (
        <div className="mb-10 overflow-hidden rounded-xl">
          <Image
            src={post.coverImage.asset.url}
            alt={post.coverImage.alt ?? post.title[lang]}
            width={1200}
            height={630}
            className="w-full object-cover"
            priority
          />
        </div>
      )}

      {/* YouTube embed */}
      {post.format === "video" && post.youtubeUrl && (
        <div className="mb-10 aspect-video overflow-hidden rounded-xl">
          <iframe
            src={post.youtubeUrl.replace("watch?v=", "embed/")}
            title={post.title[lang]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      )}

      {/* Body */}
      <div className="text-lg leading-8 text-muted">
        <PortableText
          value={post.body[lang]}
          components={portableTextComponents}
        />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2 border-t border-white/5 pt-8">
          {post.tags.map((tag) => (
            <span
              key={tag.slug.current}
              className="rounded-xl border border-white/10 bg-surface px-3 py-1 font-mono text-xs text-muted"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Author footer */}
      <div className="mt-12 flex items-center gap-4 border-t border-white/5 pt-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky/30 to-rose/30 font-mono text-lg font-bold text-ink">
          O
        </div>
        <div>
          <p className="font-semibold text-ink">Oscar Hermawan</p>
          <p className="text-sm text-muted">Full-stack JavaScript Engineer</p>
        </div>
      </div>
    </article>
  );
}
