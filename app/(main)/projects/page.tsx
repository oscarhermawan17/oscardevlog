import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
  description: "Built & deployed — architecture-first project breakdowns.",
}

type Project = {
  title: string
  description: string
  tech: string[]
  arch: { label: string; sub: string }[]
  details: string[]
}

const PROJECTS: Project[] = [
  {
    title: "Multi-tenant SaaS E-Commerce Platform",
    description:
      "Membangun platform toko online multi-tenant massal yang efisien. Fokus pada pemisahan logika database, optimasi query, dan automasi deployment.",
    tech: ["Next.js", "Express", "PostgreSQL", "Docker", "GitHub Actions"],
    arch: [
      { label: "Next.js", sub: "Storefront SSR" },
      { label: "Express API", sub: "Tenant routing" },
      { label: "PostgreSQL", sub: "Schema-per-tenant" },
      { label: "Docker + Nginx", sub: "VPS deploy" },
    ],
    details: [
      "Isolasi data per-tenant lewat schema terpisah dengan satu connection pool yang dibagikan.",
      "Optimasi query lewat indexing terarah dan caching layer Redis untuk endpoint katalog.",
      "Deploy otomatis ke VPS via GitHub Actions: build image, push, lalu rolling restart container.",
    ],
  },
  {
    title: "Personal Devlog & Vlog Platform",
    description:
      "Platform konten yang Anda lihat sekarang — dark-themed, cepat, dan dibangun dengan App Router Next.js terbaru di atas infrastruktur self-hosted.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Docker"],
    arch: [
      { label: "Next.js App Router", sub: "Static-first" },
      { label: "Tailwind v4", sub: "Design system" },
      { label: "Docker", sub: "Self-hosted" },
    ],
    details: [
      "Halaman fully static sehingga navigasi terasa instan tanpa data fetching di runtime.",
      "Design system berbasis token warna konsisten dengan grid spacing kelipatan 8.",
      "Dikemas dalam container dan dideploy di belakang reverse proxy Nginx.",
    ],
  },
]

function ArchDiagram({ nodes }: { nodes: Project["arch"] }) {
  return (
    <div className="flex flex-wrap items-stretch gap-3">
      {nodes.map((node, i) => (
        <div key={node.label} className="flex items-stretch gap-3">
          <div className="flex min-w-36 flex-col justify-center rounded-xl border border-white/10 bg-base/60 px-4 py-3">
            <span className="text-sm font-semibold text-ink">{node.label}</span>
            <span className="font-mono text-xs text-muted">{node.sub}</span>
          </div>
          {i < nodes.length - 1 && (
            <span className="flex items-center font-mono text-lg text-sky">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:py-16">
      <h1 className="mb-12 font-mono text-2xl font-bold text-sky sm:text-3xl">
        [ Built, & Deployed ]
      </h1>

      <div className="space-y-8">
        {PROJECTS.map((project) => (
          <article
            key={project.title}
            className="rounded-xl border border-white/5 bg-surface p-6 sm:p-8"
          >
            <h2 className="text-xl font-bold text-ink sm:text-2xl">
              {project.title}
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2 font-mono text-xs">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-xl border border-white/10 bg-base/60 px-3 py-1 text-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
                <span className="text-sky">//</span> Architecture
              </h3>
              <ArchDiagram nodes={project.arch} />
            </div>

            <details className="group mt-6 rounded-xl border border-white/10 bg-base/40">
              <summary className="flex cursor-pointer items-center justify-between px-5 py-3 font-mono text-sm text-ink marker:content-none">
                <span>
                  <span className="text-sky">$</span> view technical details
                </span>
                <span className="text-muted transition-transform duration-200 group-open:rotate-90">
                  →
                </span>
              </summary>
              <ul className="space-y-3 border-t border-white/10 px-5 py-4 text-sm leading-6 text-muted">
                {project.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="text-rose">▹</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </details>
          </article>
        ))}
      </div>
    </div>
  )
}
