import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Inside the terminal and beyond — Oscar's story as a full-stack engineer and beginner content creator.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-12 font-mono text-2xl font-bold text-sky sm:text-3xl">
        ## Inside the Terminal &amp; Beyond
      </h1>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        {/* Casual / travel photo placeholder */}
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
        <div className="space-y-6 text-lg leading-8 text-muted">
          <p>
            Saya memulai karier profesional di dunia web development sejak{" "}
            <span className="text-ink">2018</span>. Sehari-hari, saya berteman
            dekat dengan ekosistem JavaScript—mulai dari menyusun komponen di{" "}
            <span className="text-sky">Next.js/React</span> hingga merancang
            arsitektur backend menggunakan{" "}
            <span className="text-sky">Express, Redis, dan PostgreSQL</span>.
          </p>
          <p>
            Di sisi infrastruktur, saya lebih suka mengulik VPS kosongan secara
            manual: membungkus aplikasi dengan{" "}
            <span className="text-sky">Docker</span>, mengatur reverse proxy{" "}
            <span className="text-sky">Nginx</span>, hingga mengotomatisasi
            semuanya lewat <span className="text-sky">CI/CD GitHub Actions</span>
            .
          </p>
          <p>
            Namun, hidup bukan cuma tentang memandangi error log. Lewat platform
            ini, saya mendokumentasikan perjalanan saya sebagai kreator konten
            pemula. Di sini Anda akan menemukan tutorial coding yang jujur (kita
            belajar bareng!), video komedi{" "}
            <span className="text-rose">absurd</span> seputar realita
            programmer, hingga jurnal perjalanan saya menjelajahi berbagai
            tempat baru.
          </p>

          <div className="flex flex-wrap gap-2 pt-4 font-mono text-xs">
            {["JavaScript", "Next.js", "Express", "Redis", "PostgreSQL", "Docker", "Nginx", "GitHub Actions"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-xl border border-white/10 bg-surface px-3 py-1 text-muted"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
