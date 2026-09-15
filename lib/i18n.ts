export type Lang = "id" | "en"

const translations = {
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      blog: "Blog",
      projects: "Proyek Internal",
      explore: "Eksplor",
      contact: "Kontak",
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
      subtitle:
        "Tutorial coding yang jujur, komedi absurd seputar realita programmer, dan jurnal perjalanan. Semua dalam satu feed.",
      readMin: "mnt baca",
      watch: "Tonton Video",
    },
    projects: {
      title: "## Dibangun & Dideploy",
      viewDetails: "$ lihat detail teknis",
      architecture: "// Arsitektur",
    },
    explore: {
      typeHotel: "Hotel",
      typeCoffeeshop: "Coffee Shop",
      typePublicSpace: "Public Space",
      overall: "Skor Keseluruhan",
      aspectTaste: "Rasa",
      aspectAmbience: "Suasana",
      aspectService: "Pelayanan",
      aspectFacilities: "Fasilitas",
      aspectValue: "Worth It",
      facilitiesTitle: "Fasilitas",
      goodForTitle: "Cocok Untuk",
      prosTitle: "Kelebihan",
      consTitle: "Kekurangan",
      openMaps: "Buka di Google Maps",
      visitedAt: "Dikunjungi",
      publishedAt: "Ditulis",
      free: "Gratis",
      pageTitle: "Eksplor",
      pageSubtitle:
        "Halaman ini saya gunakan untuk bercerita soal tempat-tempat yang pernah saya kunjungi — hunting makanan, hotel, sampai public space. Nyari warung makan yang lezat, coffee shop dengan suasana nyaman buat nugas, hotel yang worth it, sampai spot publik favorit buat healing.",
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
      projects: "Internal Projects",
      explore: "Explore",
      contact: "Contact",
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
      subtitle:
        "Honest coding tutorials, absurd programmer comedy, and travel journals. All in one feed.",
      readMin: "min read",
      watch: "Watch Video",
    },
    projects: {
      title: "[ Built, & Deployed ]",
      viewDetails: "$ view technical details",
      architecture: "// Architecture",
    },
    explore: {
      typeHotel: "Hotel",
      typeCoffeeshop: "Coffee Shop",
      typePublicSpace: "Public Space",
      overall: "Overall Score",
      aspectTaste: "Taste",
      aspectAmbience: "Ambience",
      aspectService: "Service",
      aspectFacilities: "Facilities",
      aspectValue: "Value",
      facilitiesTitle: "Facilities",
      goodForTitle: "Good For",
      prosTitle: "Pros",
      consTitle: "Cons",
      openMaps: "Open in Google Maps",
      visitedAt: "Visited",
      publishedAt: "Written",
      free: "Free",
      pageTitle: "Explore",
      pageSubtitle:
        "This is where I document the places I've actually been to — hunting good food, decent hotels, or a solid public space to hang out. Always on the lookout for tasty local eats, coffee shops with the right vibe for getting work done, hotels that are genuinely worth it, and public spots worth going back to.",
    },
    footer: {
      rights: "All rights reserved.",
      built: "Built with",
    },
  },
} as const

export type Translations = typeof translations.en
export default translations
