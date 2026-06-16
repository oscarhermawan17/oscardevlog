import type { PortableTextComponents } from "next-sanity";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 last:mb-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-6 text-2xl font-bold text-ink">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-5 text-xl font-semibold text-ink">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-2 border-sky pl-4 text-muted italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-sky">
        {children}
      </code>
    ),
  },
};
