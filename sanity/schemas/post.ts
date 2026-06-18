import { defineArrayMember, defineField, defineType } from "sanity";

const bilingualString = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "object",
    description,
    fields: [
      defineField({
        name: "id",
        title: "Indonesian",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "en",
        title: "English",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
    ],
  });

const bodyImageBlock = defineArrayMember({
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the image for screen readers and SEO.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption shown below the image.",
    }),
  ],
});

const bodyCodeBlock = defineArrayMember({
  type: "code",
  options: {
    language: "javascript",
    languageAlternatives: [
      { title: "JavaScript", value: "javascript" },
      { title: "TypeScript", value: "typescript" },
      { title: "JSX", value: "jsx" },
      { title: "TSX", value: "tsx" },
      { title: "HTML", value: "html" },
      { title: "CSS", value: "css" },
      { title: "Bash / Shell", value: "bash" },
      { title: "JSON", value: "json" },
      { title: "SQL", value: "sql" },
      { title: "Python", value: "python" },
      { title: "Plain text", value: "text" },
    ],
  },
});

const bodyBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "Heading 2", value: "h2" },
    { title: "Heading 3", value: "h3" },
    { title: "Heading 4", value: "h4" },
    { title: "Quote", value: "blockquote" },
  ],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
      { title: "Code", value: "code" },
    ],
    annotations: [
      defineArrayMember({
        name: "link",
        type: "object",
        title: "Link",
        fields: [
          defineField({
            name: "href",
            title: "URL",
            type: "url",
            validation: (Rule) =>
              Rule.uri({ scheme: ["http", "https", "mailto"] }),
          }),
          defineField({
            name: "blank",
            title: "Open in new tab",
            type: "boolean",
            initialValue: true,
          }),
        ],
      }),
    ],
  },
});

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Metadata" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Metadata ──────────────────────────────────────────
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      description: "URL identifier in English. e.g. docker-setup-from-scratch",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      group: "meta",
      description: "How is this content delivered?",
      options: {
        list: [
          { title: "Article (written)", value: "article" },
          { title: "Video (YouTube)", value: "video" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read / watch time (minutes)",
      type: "number",
      group: "meta",
      description: "Estimated minutes to read the article or watch the video.",
      validation: (Rule) => Rule.required().min(1).max(240),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "meta",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "tag" }],
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),

    // ── Media ─────────────────────────────────────────────
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      description: "Optional. Shown at the top of the post.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) =>
            Rule.custom((alt, ctx) => {
              if (ctx.document?.coverImage && !alt) {
                return "Alt text is required when a cover image is set.";
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      group: "content",
      description: 'Required for "Video" format.',
      hidden: ({ document }) => document?.format !== "video",
      validation: (Rule) =>
        Rule.uri({ scheme: ["https"] }).custom((url, ctx) => {
          if (ctx.document?.format === "video" && !url) {
            return "YouTube URL is required for video posts.";
          }
          return true;
        }),
    }),

    // ── Bilingual content ──────────────────────────────────
    bilingualString(
      "title",
      "Title",
      "Post title in both languages. Slug is auto-generated from the English title.",
    ),
    bilingualString(
      "excerpt",
      "Excerpt",
      "Short summary shown on the blog listing card and used for SEO description.",
    ),
    defineField({
      name: "body",
      title: "Body",
      type: "object",
      group: "content",
      description: "Full post content. Images are shared via Sanity asset library — upload once, insert in both.",
      fields: [
        defineField({
          name: "id",
          title: "Indonesian",
          type: "array",
          of: [bodyBlock, bodyImageBlock, bodyCodeBlock],
        }),
        defineField({
          name: "en",
          title: "English",
          type: "array",
          of: [bodyBlock, bodyImageBlock, bodyCodeBlock],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title.id",
      subtitle: "format",
      media: "coverImage",
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title ?? "Untitled",
      subtitle: subtitle === "video" ? "🎬 Video" : "✍️ Article",
      media,
    }),
  },

  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Oldest first",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
});
