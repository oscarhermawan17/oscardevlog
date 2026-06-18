import Image from "next/image";
import type { PortableTextComponents } from "next-sanity";

export const portableTextComponents: PortableTextComponents = {
  types: {
    code: ({ value, isInline }) => {
      if (!value?.code) return null;
      if (isInline) {
        return (
          <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-sky">
            {value.code}
          </code>
        );
      }
      return (
        <figure className="my-6 overflow-hidden rounded-xl border border-white/10">
          <figcaption className="border-b border-white/5 bg-[#1E1E1E] px-4 py-2 font-mono text-xs text-muted/50">
            {value.language ?? "code"}
          </figcaption>
          {value.highlightedHtml ? (
            <div
              className="[&>pre]:!m-0 [&>pre]:overflow-x-auto [&>pre]:!rounded-none [&>pre]:!p-5 [&>pre]:text-sm [&>pre]:leading-7"
              dangerouslySetInnerHTML={{ __html: value.highlightedHtml }}
            />
          ) : (
            <pre className="overflow-x-auto bg-[#1E1E1E] p-5 text-sm leading-7">
              <code className="font-mono text-[#D4D4D4]">{value.code}</code>
            </pre>
          )}
        </figure>
      );
    },
    image: ({ value }) => {
      if (!value?.asset?.url) return null;
      return (
        <figure className="my-6">
          <Image
            src={value.asset.url}
            alt={value.alt ?? ""}
            width={800}
            height={450}
            className="w-full rounded-xl"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
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
};
