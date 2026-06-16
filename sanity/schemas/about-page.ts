import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "id", title: "Indonesian", type: "string" }),
      ],
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Bio",
      type: "object",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }],
        }),
        defineField({
          name: "id",
          title: "Indonesian",
          type: "array",
          of: [{ type: "block" }],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title.en" },
    prepare: ({ title }) => ({ title: title ?? "About Page" }),
  },
});
