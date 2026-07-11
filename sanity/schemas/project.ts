import { defineArrayMember, defineField, defineType } from "sanity"

const bilingualString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
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
  })

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  fields: [
    bilingualString("title", "Title"),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        defineField({
          name: "id",
          title: "Indonesian",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "en",
          title: "English",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "tech",
      title: "Tech Stack",
      description: "Pilih dari daftar Tags yang sudah ada",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "tag" }],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "arch",
      title: "Architecture Nodes",
      description:
        "Nodes shown in the architecture diagram, in order (left → right)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              description: "Tech/layer name, e.g. 'Next.js'",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "sub",
              title: "Subtitle",
              type: "object",
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
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "sub.en" },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "details",
      title: "Technical Details",
      description:
        "Bullet points shown inside the collapsible 'view technical details' section",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "Indonesian",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "en",
              title: "English",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "en" },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      description: "Lower number = shown first",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "title.id" },
    prepare: ({ title, subtitle }) => ({
      title: title ?? "Untitled Project",
      subtitle,
    }),
  },
})
