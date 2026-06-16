import Link from "next/link";
import { TechStack } from "@/app/components/tech-stack";

export default function Home() {
  return (
    <div className="hero-glow">
      <div className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col items-start gap-6">
            <span className="rounded-full border border-white/10 bg-surface/60 px-3 py-1 font-mono text-xs text-muted">
              <span className="text-sky">$</span> whoami → senior full-stack dev
            </span>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Hi, I&apos;m <span className="text-gradient">Oscar</span>.
            </h1>

            <p className="max-w-xl text-lg leading-8 text-muted">
              Full-stack JavaScript Engineer by night, absurd content creator
              and traveler by day. Building scalable web apps since 2018, and
              making tech less boring one video at a time.
            </p>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-sky px-6 font-medium text-[#0B0F19] transition-all duration-200 hover:shadow-[0_0_20px_rgba(56,189,248,0.45)]"
              >
                Read My Blog
              </Link>
              <Link
                href="/blog"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-rose px-6 font-medium text-rose transition-all duration-200 hover:bg-rose/10 hover:shadow-[0_0_20px_rgba(244,63,94,0.35)]"
              >
                Watch My Vlog
              </Link>
            </div>
          </div>

          {/* Avatar / terminal motif */}
          <div className="hidden lg:flex lg:justify-end">
            <div className="w-full max-w-xs rounded-xl border border-white/10 bg-surface/70 p-5 font-mono text-sm shadow-2xl backdrop-blur">
              <div className="mb-4 flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose/80" />
                <span className="h-3 w-3 rounded-full bg-sky/70" />
                <span className="h-3 w-3 rounded-full bg-muted/40" />
              </div>
              <p className="text-muted">
                <span className="text-sky">const</span>{" "}
                <span className="text-ink">oscar</span> = {"{"}
              </p>
              <p className="pl-4 text-muted">
                role: <span className="text-rose">&apos;builder&apos;</span>,
              </p>
              <p className="pl-4 text-muted">
                stack: <span className="text-rose">&apos;js&apos;</span>,
              </p>
              <p className="pl-4 text-muted">
                vibe: <span className="text-rose">&apos;absurd&apos;</span>,
              </p>
              <p className="text-muted">{"}"}</p>
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="border-t border-white/5 py-16">
          <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-muted">
            <span className="text-sky">//</span> Tech I build with
          </h2>
          <TechStack />
        </section>
      </div>
    </div>
  );
}
