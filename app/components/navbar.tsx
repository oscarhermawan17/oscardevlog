"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Tutup menu saat navigasi
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Tutup menu saat tekan Escape
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

        {/* Burger button — mobile only */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-white/5 sm:hidden"
        >
          <span
            className={`h-px w-5 rounded-full bg-ink transition-all duration-300 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 rounded-full bg-ink transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-5 rounded-full bg-ink transition-all duration-300 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
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
        </div>
      )}
    </header>
  );
}
