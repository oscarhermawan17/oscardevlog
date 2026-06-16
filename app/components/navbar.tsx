"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/app/context/lang-context";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { lang, t, toggle } = useLang();

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/blog", label: t.nav.blog },
    { href: "/projects", label: t.nav.projects },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[rgba(11,15,25,0.8)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-tight text-sky transition-colors hover:text-rose"
        >
          oscardevlog.me
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop links */}
          <ul className="hidden items-center gap-8 sm:flex">
            {links.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative py-1 text-sm font-medium transition-colors hover:text-ink ${
                      isActive ? "text-ink" : "text-muted"
                    }`}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute inset-x-0 -bottom-0.5 h-px rounded-full bg-rose" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Language toggle — desktop */}
          <button
            onClick={toggle}
            className="hidden items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-sky/40 hover:text-sky sm:flex"
          >
            <span className={lang === "id" ? "text-sky" : "text-muted/50"}>ID</span>
            <span className="text-white/20">/</span>
            <span className={lang === "en" ? "text-sky" : "text-muted/50"}>EN</span>
          </button>

          {/* Burger button — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-white/5 sm:hidden"
          >
            <span className={`h-px w-5 rounded-full bg-ink transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-px w-5 rounded-full bg-ink transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-5 rounded-full bg-ink transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-white/5 bg-[rgba(11,15,25,0.95)] px-6 py-4 sm:hidden">
          <ul className="flex flex-col gap-1">
            {links.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white/5 text-ink"
                        : "text-muted hover:bg-white/5 hover:text-ink"
                    }`}
                  >
                    {label}
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Language toggle — mobile */}
          <button
            onClick={toggle}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 font-mono text-xs text-muted transition-colors hover:border-sky/40 hover:text-sky"
          >
            <span className={lang === "id" ? "text-sky" : "text-muted/50"}>ID</span>
            <span className="text-white/20">/</span>
            <span className={lang === "en" ? "text-sky" : "text-muted/50"}>EN</span>
          </button>
        </div>
      )}
    </header>
  );
}
