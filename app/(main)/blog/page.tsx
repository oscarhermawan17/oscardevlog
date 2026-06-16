import type { Metadata } from "next";
import { getBlogPage } from "@/sanity/queries/blog-page";
import { BlogHeader } from "./_blog-header";

export const metadata: Metadata = {
  title: "Blog & Vlog",
  description:
    "Written thoughts and visual logs — honest coding tutorials, absurd programmer comedy, and travel journals.",
};

type ContentItem = {
  kind: "tech" | "vlog";
  title: string;
  meta: string;
  blurb: string;
};

const ITEMS: ContentItem[] = [
  {
    kind: "tech",
    title: "Gak Usah Takut Docker: Panduan Setup VPS Kosongan dari Nol",
    meta: "5 min read • Jun 2026",
    blurb:
      "Dari VPS kosong sampai aplikasi jalan di belakang Nginx — langkah demi langkah, tanpa drama.",
  },
  {
    kind: "vlog",
    title:
      "POV: Ketika Klien Minta Revisi Urgent Pas Lagi Kulineran di Sleman",
    meta: "Watch Video • 1 min watch",
    blurb:
      "Realita freelancer: laptop kebuka di warung, sambal masih nempel di keyboard.",
  },
  {
    kind: "tech",
    title: "Multi-tenant PostgreSQL: Memisahkan Data Tanpa Bikin Pusing",
    meta: "8 min read • May 2026",
    blurb:
      "Strategi schema vs row-level security, plus jebakan yang sering bikin query melambat.",
  },
  {
    kind: "vlog",
    title: "Coding 12 Jam Sambil Jalan-jalan: Worth It atau Nggak?",
    meta: "Watch Video • 6 min watch",
    blurb:
      "Eksperimen jadi digital nomad dadakan keliling Jogja sambil ngejar deadline.",
  },
  {
    kind: "tech",
    title: "CI/CD GitHub Actions: Deploy Otomatis ke VPS Sendiri",
    meta: "6 min read • Apr 2026",
    blurb:
      "Bikin pipeline yang build, test, dan deploy tiap kali push ke main. Sekali setup, lupa selamanya.",
  },
  {
    kind: "vlog",
    title: "Reaksi Programmer Lihat Kode Sendiri Setahun yang Lalu",
    meta: "Watch Video • 2 min watch",
    blurb: "Spoiler: cringe, ketawa, lalu refactor diam-diam.",
  },
];

function Badge({ kind }: { kind: ContentItem["kind"] }) {
  if (kind === "tech") {
    return (
      <span className="inline-flex items-center rounded-md bg-sky px-2.5 py-1 font-mono text-xs font-semibold text-[#0B0F19] transition-shadow group-hover:shadow-[0_0_14px_rgba(56,189,248,0.55)]">
        #Tech
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-md bg-rose px-2.5 py-1 font-mono text-xs font-semibold text-white transition-shadow group-hover:shadow-[0_0_14px_rgba(244,63,94,0.55)]">
      #Vlog
    </span>
  );
}

export default async function BlogPage() {
  const data = await getBlogPage();

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:py-16">
      <BlogHeader data={data} />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item) => (
          <li key={item.title}>
            <article
              className={`group flex h-full flex-col gap-4 rounded-xl border border-white/5 bg-surface p-6 transition-all duration-200 hover:-translate-y-1 ${
                item.kind === "tech"
                  ? "hover:border-sky/40"
                  : "hover:border-rose/40"
              }`}
            >
              <div>
                <Badge kind={item.kind} />
              </div>
              <h2 className="text-lg font-bold leading-snug text-ink">
                {item.title}
              </h2>
              <p className="flex-1 text-sm leading-6 text-muted">
                {item.blurb}
              </p>
              <p className="font-mono text-xs text-muted">{item.meta}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
