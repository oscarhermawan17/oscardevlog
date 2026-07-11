"use client"

import { PortableText } from "next-sanity"
import { useLang } from "@/app/context/lang-context"
import type { ProjectItem, ArchNode } from "@/sanity/queries/projects"
import type { PortableTextComponents } from "next-sanity"

const descriptionComponents: PortableTextComponents = {
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-sky underline underline-offset-2 hover:text-sky/80"
      >
        {children}
      </a>
    ),
  },
}

function ArchDiagram({
  nodes,
  lang,
}: {
  nodes: ArchNode[]
  lang: "id" | "en"
}) {
  return (
    <div className="flex flex-wrap items-stretch gap-3">
      {nodes.map((node, i) => (
        <div key={node.label + i} className="flex items-stretch gap-3">
          <div className="flex min-w-36 flex-col justify-center rounded-xl border border-white/10 bg-base/60 px-4 py-3">
            <span className="text-sm font-semibold text-ink">{node.label}</span>
            <span className="font-mono text-xs text-muted">
              {node.sub[lang]}
            </span>
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

export function ProjectsList({ projects }: { projects: ProjectItem[] }) {
  const { lang, t } = useLang()

  if (projects.length === 0) {
    return <p className="text-muted">No projects yet.</p>
  }

  return (
    <div className="space-y-8">
      {projects.map((project) => (
        <article
          key={project._id}
          className="rounded-xl border border-white/5 bg-surface p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-ink sm:text-2xl">
            {project.title[lang]}
          </h2>
          <div className="mt-3 max-w-3xl leading-7 text-muted">
            <PortableText
              value={project.description[lang]}
              components={descriptionComponents}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2 font-mono text-xs">
            {project.tech.map((tag) => (
              <span
                key={tag._id}
                className="rounded-xl border border-white/10 bg-base/60 px-3 py-1 text-muted"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              <span className="text-sky">{"// "}</span>
              {t.projects.architecture.replace("// ", "")}
            </h3>
            <ArchDiagram nodes={project.arch} lang={lang} />
          </div>

          <details className="group mt-6 rounded-xl border border-white/10 bg-base/40">
            <summary className="flex cursor-pointer items-center justify-between px-5 py-3 font-mono text-sm text-ink marker:content-none">
              <span>
                <span className="text-sky">$</span> {t.projects.viewDetails}
              </span>
              <span className="text-muted transition-transform duration-200 group-open:rotate-90">
                →
              </span>
            </summary>
            <ul className="space-y-3 border-t border-white/10 px-5 py-4 text-sm leading-6 text-muted">
              {project.details.map((d, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-rose">▹</span>
                  <span>{d[lang]}</span>
                </li>
              ))}
            </ul>
          </details>
        </article>
      ))}
    </div>
  )
}
