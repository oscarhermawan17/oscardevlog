"use client";

import { useLang } from "@/app/context/lang-context";

export function ExploreHeader() {
  const { t } = useLang();

  return (
    <header className="mb-10">
      <h1 className="mb-4 font-mono text-2xl font-bold text-sky sm:text-3xl">
        {t.explore.pageTitle}
      </h1>
      <p className="max-w-2xl text-muted">{t.explore.pageSubtitle}</p>
    </header>
  );
}
