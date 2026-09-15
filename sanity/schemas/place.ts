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

// Deskripsi naratif — hanya bold + link, tidak ada heading/list (sama seperti project.ts)
const bilingualPortableText = (name: string, title: string, description?: string) => {
  const block = defineArrayMember({
    type: "block",
    styles: [{ title: "Normal", value: "normal" }],
    lists: [],
    marks: {
      decorators: [{ title: "Bold", value: "strong" }],
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

  return defineField({
    name,
    title,
    type: "object",
    description,
    fields: [
      defineField({
        name: "id",
        title: "Indonesian",
        type: "array",
        of: [block],
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "en",
        title: "English",
        type: "array",
        of: [block],
        validation: (Rule) => Rule.required(),
      }),
    ],
  });
};

// Array bilingual string sederhana — dipakai untuk pros/cons (boleh kosong)
const bilingualStringListItem = defineArrayMember({
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
  preview: {
    select: { title: "en" },
  },
});

// Daftar tetap — key dalam bahasa Inggris, label ditentukan di kode (lib/place-options.ts)
// Nambah opsi baru = tambah entry di sini + di lib/place-options.ts
const FACILITY_OPTIONS = [
  { title: "WiFi", value: "wifi" },
  { title: "AC", value: "ac" },
  { title: "Prayer Room", value: "prayer-room" },
  { title: "Power Outlet", value: "power-outlet" },
  { title: "Restroom", value: "restroom" },
  { title: "Motorcycle Parking", value: "motorcycle-parking" },
  { title: "Car Parking", value: "car-parking" },
];

const GOOD_FOR_OPTIONS = [
  { title: "Me Time", value: "me-time" },
  { title: "WFA", value: "wfa" },
  { title: "Group Hangout", value: "group-hangout" },
  { title: "Staycation", value: "staycation" },
  { title: "Meeting", value: "meeting" },
  { title: "Photo Spot", value: "photo-spot" },
];

const RATING_ASPECT_OPTIONS = [
  { title: "Taste", value: "taste" },
  { title: "Ambience", value: "ambience" },
  { title: "Service", value: "service" },
  { title: "Facilities", value: "facilities" },
  { title: "Value", value: "value" },
];

export const place = defineType({
  name: "place",
  title: "Place",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "rating", title: "Rating" },
    { name: "meta", title: "Metadata" },
  ],
  fields: [
    // ── Metadata ──────────────────────────────────────────
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      description: "URL slug otomatis dari judul Indonesia.",
      options: { source: "title.id", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "Hotel", value: "hotel" },
          { title: "Coffee Shop", value: "coffeeshop" },
          { title: "Public Space", value: "public-space" },
          { title: "Eatery", value: "eatery" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "visitedAt",
      title: "Visited at",
      type: "datetime",
      group: "meta",
      description: "Tanggal kunjungan asli — boleh beda dengan tanggal publish.",
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

    // ── Price range ───────────────────────────────────────
    defineField({
      name: "priceMin",
      title: "Price — minimum (Rp)",
      type: "number",
      group: "meta",
      description: "Isi 0 untuk tempat gratis (misal public space).",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "priceMax",
      title: "Price — maximum (Rp)",
      type: "number",
      group: "meta",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .custom((max, ctx) => {
            const min = (ctx.document as { priceMin?: number })?.priceMin;
            if (typeof min === "number" && typeof max === "number" && max < min) {
              return "Maximum price harus >= minimum price.";
            }
            return true;
          }),
    }),

    // ── Location ──────────────────────────────────────────
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "address",
          title: "Address",
          type: "string",
          description: "Optional, alamat lengkap jika perlu.",
        }),
        defineField({
          name: "area",
          title: "Area",
          type: "string",
          description: 'e.g. "Braga"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "city",
          title: "City",
          type: "string",
          description: 'e.g. "Bandung"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "googleMapsUrl",
          title: "Google Maps URL",
          type: "url",
          validation: (Rule) =>
            Rule.required().uri({ scheme: ["http", "https"] }),
        }),
      ],
    }),

    // ── Media ─────────────────────────────────────────────
    defineField({
      name: "media",
      title: "Media",
      type: "array",
      group: "content",
      description:
        "Foto & video (YouTube) dalam satu urutan — urutan ini menentukan urutan slide di galeri.",
      of: [
        defineArrayMember({
          type: "object",
          name: "mediaImage",
          title: "Image",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
          preview: {
            select: { media: "image", title: "alt" },
          },
        }),
        defineArrayMember({
          type: "object",
          name: "mediaVideo",
          title: "Video (YouTube)",
          fields: [
            defineField({
              name: "youtubeUrl",
              title: "YouTube URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({ scheme: ["https"] }),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "caption", subtitle: "youtubeUrl" },
            prepare: ({ title, subtitle }) => ({
              title: title || "Video",
              subtitle,
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // ── Bilingual content ──────────────────────────────────
    bilingualString(
      "title",
      "Title",
      "Nama tempat. Slug di-generate otomatis dari versi Indonesia.",
    ),
    bilingualString(
      "shortDescription",
      "Short description",
      "Ringkasan singkat, ditampilkan di card listing.",
    ),
    bilingualPortableText(
      "description",
      "Description",
      "Narasi lengkap. Hanya mendukung bold & link.",
    ),

    // ── Facilities / Good for ──────────────────────────────
    defineField({
      name: "facilities",
      title: "Facilities",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { list: FACILITY_OPTIONS },
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "goodFor",
      title: "Good for",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { list: GOOD_FOR_OPTIONS },
      validation: (Rule) => Rule.unique(),
    }),

    // ── Pros / Cons ─────────────────────────────────────────
    defineField({
      name: "pros",
      title: "Pros",
      type: "array",
      group: "content",
      description: "Boleh kosong.",
      of: [bilingualStringListItem],
    }),
    defineField({
      name: "cons",
      title: "Cons",
      type: "array",
      group: "content",
      description: "Boleh kosong — pertimbangkan baik-baik sebelum mengkritik usaha kecil.",
      of: [bilingualStringListItem],
    }),

    // ── Ratings ─────────────────────────────────────────────
    defineField({
      name: "ratings",
      title: "Ratings per aspect",
      type: "array",
      group: "rating",
      description:
        "Isi hanya aspek yang relevan. Contoh: Public Space biasanya tidak perlu 'Taste'.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "aspect",
              title: "Aspect",
              type: "string",
              options: { list: RATING_ASPECT_OPTIONS },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "score",
              title: "Score",
              type: "number",
              validation: (Rule) =>
                Rule.required().min(1).max(10).precision(1),
            }),
          ],
          preview: {
            select: { title: "aspect", subtitle: "score" },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((ratings: { aspect: string }[] | undefined) => {
          if (!ratings) return true;
          const aspects = ratings.map((r) => r.aspect);
          const hasDuplicate = aspects.length !== new Set(aspects).size;
          return hasDuplicate ? "Setiap aspect hanya boleh muncul sekali." : true;
        }),
    }),
    defineField({
      name: "overall",
      title: "Overall score",
      type: "number",
      group: "rating",
      description: "Skor keseluruhan — boleh berbeda dari rata-rata aspek (gut feeling).",
      validation: (Rule) => Rule.required().min(1).max(10).precision(1),
    }),
  ],

  preview: {
    select: {
      title: "title.id",
      subtitle: "type",
      media: "media.0.image",
    },
    prepare: ({ title, subtitle, media }) => {
      const typeLabel: Record<string, string> = {
        hotel: "🏨 Hotel",
        coffeeshop: "☕ Coffee Shop",
        "public-space": "🌳 Public Space",
        eatery: "🍜 Eatery",
      };
      return {
        title: title ?? "Untitled Place",
        subtitle: typeLabel[subtitle as string] ?? subtitle,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Newest visited",
      name: "visitedAtDesc",
      by: [{ field: "visitedAt", direction: "desc" }],
    },
    {
      title: "Newest published",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
