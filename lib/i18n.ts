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
      greeting: "Halo, saya",
      bio: "Full-stack JavaScript Engineer di malam hari, kreator konten absurd dan traveler di siang hari. Membangun web app scalable sejak 2018, dan membuat teknologi lebih seru satu video sekali waktu.",
      readBlog: "Baca Blog",
      watchVlog: "Tonton Vlog",
      techTitle: "Tech yang saya pakai",
    },
    about: {
      title: "## Di Dalam Terminal & Lebih Jauh",
      readMore: "Selengkapnya",
    },
    blog: {
      title: "## Tulisan & Visual Log",
      subtitle: "Tutorial coding yang jujur, komedi absurd seputar realita programmer, dan jurnal perjalanan. Semua dalam satu feed.",
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
      greeting: "Hi, I'm",
      bio: "Full-stack JavaScript Engineer by night, absurd content creator and traveler by day. Building scalable web apps since 2018, and making tech less boring one video at a time.",
      readBlog: "Read My Blog",
      watchVlog: "Watch My Vlog",
      techTitle: "Tech I build with",
    },
    about: {
      title: "## Inside the Terminal & Beyond",
      readMore: "Read more",
    },
    blog: {
      title: "## Written Thoughts & Visual Logs",
      subtitle: "Honest coding tutorials, absurd programmer comedy, and travel journals. All in one feed.",
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
