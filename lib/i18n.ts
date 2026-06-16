export type Lang = "id" | "en";

const translations = {
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      blog: "Blog",
      projects: "Proyek",
    },
    home: {
      badge: "$ whoami → senior full-stack dev",
      readBlog: "Baca Blog",
      watchVlog: "Tonton Vlog",
      techTitle: "Tech yang biasa saya gunakan",
    },
    blog: {
      readMin: "mnt baca",
      watch: "Tonton Video",
    },
    projects: {
      title: "## Dibangun & Dideploy",
      viewDetails: "$ lihat detail teknis",
      architecture: "// Arsitektur",
    },
    footer: {
      rights: "Hak cipta dilindungi.",
      built: "Dibangun dengan",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      blog: "Blog",
      projects: "Projects",
    },
    home: {
      badge: "$ whoami → senior full-stack dev",
      readBlog: "Read My Blog",
      watchVlog: "Watch My Vlog",
      techTitle: "Tech I build with",
    },
    blog: {
      readMin: "min read",
      watch: "Watch Video",
    },
    projects: {
      title: "## Built & Deployed",
      viewDetails: "$ view technical details",
      architecture: "// Architecture",
    },
    footer: {
      rights: "All rights reserved.",
      built: "Built with",
    },
  },
} as const;

export type Translations = typeof translations.en;
export default translations;
