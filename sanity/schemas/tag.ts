import { defineField, defineType } from "sanity";

export const tag = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: 'Display name. e.g. "JavaScript", "Travelling", "Docker"',
      validation: (Rule) => Rule.required().min(1).max(50),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generated from name. Used in URLs.",
      options: { source: "name", maxLength: 50 },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current" },
  },
  orderings: [
    {
      title: "Name A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
