"use client";

import { PortableText } from "next-sanity";
import { useLang } from "@/app/context/lang-context";
import { portableTextComponents } from "@/lib/portable-text";
import type { AboutPageData } from "@/sanity/queries/about-page";

const TAGS = ["JavaScript", "Next.js", "Express", "Redis", "PostgreSQL", "Docker", "Nginx", "GitHub Actions"];

export function AboutContent({ data }: { data: AboutPageData | null }) {
  const { lang, t } = useLang();

  const title = data?.title?.[lang] ?? t.about.title;
  const subtitle = data?.subtitle?.[lang];

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:py-16">
      <h1 className="mb-12 font-mono text-2xl font-bold text-sky sm:text-3xl">
        {title}
      </h1>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        {/* Photo placeholder */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/10 bg-surface">
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-sky/15 via-surface to-rose/15 text-center">
              <span className="font-mono text-5xl">🧑‍💻</span>
              <span className="font-mono text-xs text-muted">
                ~/oscar/on-the-road.jpg
              </span>
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div className="text-lg leading-8 text-muted">
          {subtitle ? (
            <PortableText value={subtitle} components={portableTextComponents} />
          ) : null}

          <div className="flex flex-wrap gap-2 pt-6 font-mono text-xs">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-xl border border-white/10 bg-surface px-3 py-1 text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
