"use client";

import { PortableText } from "next-sanity";
import { useLang } from "@/app/context/lang-context";
import { portableTextComponents } from "@/lib/portable-text";
import type { BlogPageData } from "@/sanity/queries/blog-page";

export function BlogHeader({ data }: { data: BlogPageData | null }) {
  const { lang } = useLang();

  const title = data?.title?.[lang] ?? "";
  const subtitle = data?.subtitle?.[lang];

  return (
    <header className="mb-12">
      <h1 className="font-mono text-2xl font-bold text-sky sm:text-3xl">
        {title}
      </h1>
      {subtitle ? (
        <div className="mt-3 max-w-2xl text-muted">
          <PortableText value={subtitle} components={portableTextComponents} />
        </div>
      ) : null}
    </header>
  );
}
