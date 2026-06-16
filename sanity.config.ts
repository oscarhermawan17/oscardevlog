import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const SINGLETONS = new Set(["homePage", "aboutPage"]);

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
              ),
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .child(
                S.document()
                  .schemaType("aboutPage")
                  .documentId("aboutPage")
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // Sembunyikan singleton dari menu "New document"
    templates: (templates) =>
      templates.filter((t) => !SINGLETONS.has(t.schemaType)),
  },
});
