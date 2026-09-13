# CLAUDE.md — Konteks Project (baca cepat, project ini kecil)

> Project kecil, personal blog/portfolio. File ini dibuat supaya AI yang membuka thread baru
> tidak perlu scan ulang seluruh codebase — cukup baca file ini dulu.

## ⚠️ Peringatan Penting

**13/09/2026 — Dependency baru saja di-update ke versi latest.**
`node_modules` dihapus lalu di-install ulang setelah insiden keamanan Next.js. Semua package
di `package.json` sudah di-bump ke versi terbaru yang saling kompatibel (React 19.3, Next 16.3,
Sanity 6.13, next-sanity 13.3). Jangan asumsikan versi lama dari training data — cek `package.json`
langsung kalau ragu.

**Warning `useMemo` di halaman Studio Sanity — INI BUG DARI SANITY, BUKAN BUG KITA. AMAN DIABAIKAN.**
Saat navigasi client-side antar document type di `/studio/structure/*` (misal dari `post` ke `tag`),
console akan menampilkan:
```
The final argument passed to useMemo changed size between renders.
Previous: []
Incoming: [structure]
```
Ini adalah dev-only warning dari internal `structureTool` milik package `sanity` sendiri (bug upstream
terkait React 19 Strict Mode), **bukan** dari kode kita. Sudah diverifikasi:
- Tidak muncul di production build.
- Tidak muncul saat first render/refresh, hanya saat pindah halaman di Studio.
- `_studio-client.tsx` tidak memanggil `useMemo` sama sekali — stack trace hanya menunjuk ke sana
  karena itu komponen React terluar.
- Sudah dicoba: hapus `transpilePackages` dari `next.config.ts` (perbaikan valid & tetap dipertahankan,
  sesuai rekomendasi Sanity supaya package `sanity`/`next-sanity` tidak di-transpile ulang), tapi warning
  spesifik ini tetap muncul karena sumbernya di dalam bundle Sanity.
- **Jangan buang waktu "memperbaiki" ini lagi** kecuali ada upgrade `sanity` yang menyebutkan fix untuk ini.
  Studio tetap berfungsi normal, ini cosmetic warning di console dev mode saja.

## Stack

- Next.js 16 (App Router, Turbopack), React 19
- Sanity CMS (headless), embedded Studio di route `/studio`
- Tailwind CSS 4
- Resend (kirim email dari form contact)
- Bahasa: TypeScript, semua komponen di `app/`

## Struktur Halaman (5 halaman publik)

| Route        | Label ID          | Label EN          | File utama |
|--------------|-------------------|--------------------|------------|
| `/`          | Beranda           | Home               | `app/(main)/page.tsx` + `_home-content.tsx` |
| `/about`     | Tentang           | About              | `app/(main)/about/page.tsx` |
| `/blog`      | Blog              | Blog               | `app/(main)/blog/page.tsx`, detail: `blog/[slug]/page.tsx` |
| `/projects`  | Proyek Internal   | Internal Projects  | `app/(main)/projects/page.tsx` |
| `/contact`   | Kontak            | Contact            | `app/(main)/contact/page.tsx` |

Ditambah `/studio` (Sanity Studio, admin CMS — bukan halaman publik).

## Cara Kerja i18n (PENTING — arsitektur khas project ini)

**Ini bukan i18n routing standar Next.js (bukan `/en/...` vs `/id/...`).** Hanya **1 URL per halaman**.

- Bahasa default: **Indonesia**. Toggle EN/ID ada di navbar, disimpan di `localStorage` (key `"lang"`),
  di-manage lewat React Context `app/context/lang-context.tsx` (`LangProvider` / `useLang()`).
- Konten statis UI (label nav, teks tombol, dll) ada di `lib/i18n.ts` — objek `translations` dengan
  key `id` dan `en`.
- Konten dari Sanity (post, project, home-page, about-page, blog-page) disimpan sebagai **field bilingual**:
  setiap field teks/rich-text disimpan sebagai object `{ id: ..., en: ... }` di schema Sanity
  (lihat helper `bilingualString()` di `sanity/schemas/post.ts` dan `project.ts`).
- **Query GROQ mengambil KEDUA versi bahasa sekaligus dalam satu request** (lihat `sanity/queries/post.ts`
  — field `title`, `excerpt`, `body` semua berbentuk `{ id, en }` utuh, tidak difilter per bahasa di query).
  Jadi payload yang dikirim ke client sudah berisi dua bahasa penuh.
- Rendering di client tinggal pilih `post.title[lang]`, `post.body[lang]`, dst berdasarkan `lang` dari
  `useLang()` — lihat `_post-content.tsx`. Tidak ada request ulang ke Sanity saat toggle bahasa,
  karena data dua bahasa sudah ada di memory.
- Konsekuensi: 1 dokumen Sanity = 1 baris di DB, tapi menyimpan 2 versi konten. Kalau bikin field baru
  yang perlu bilingual, ikuti pola `bilingualString()` yang sudah ada, jangan bikin dokumen terpisah per bahasa.

## Sanity — struktur singkat

- Schema ada di `sanity/schemas/`: `home-page`, `about-page`, `blog-page` (semua singleton, id dokumen
  fixed: `homePage`/`aboutPage`/`blogPage`), lalu `post`, `tag`, `project` (dokumen biasa/repeatable).
- Query GROQ ada di `sanity/queries/`, satu file per jenis dokumen.
- Client Sanity: `lib/sanity.ts` (`useCdn: false` — selalu fresh data, bukan CDN cache).
- Studio config: `sanity.config.ts`, di-render lewat `app/studio/[[...tool]]/_studio-client.tsx`.

## Yang perlu diingat saat mengubah kode

- Kalau menambah field bilingual baru di Sanity schema, jangan lupa update query GROQ terkait supaya
  field itu ikut terambil dalam bentuk `{ id, en }`.
- `AGENTS.md` di root menyebutkan bahwa versi Next.js ini bisa punya breaking changes dari training data —
  cek `node_modules/next/dist/docs/` kalau ada API yang terasa aneh/tidak sesuai ekspektasi.
- `.env` menyimpan kredensial Sanity/Resend — jangan pernah nge-print isinya, cukup rujuk nama key-nya.

## Fitur Explore ("Eksplor") — review Hotel/Coffee Shop/Public Space

Halaman ke-6 di navbar (setelah Projects, sebelum Contact). Ini bagian "personal
lifestyle" dari Oscar — review tempat yang dikunjungi (hotel, coffee shop, public
space), gaya POV vlog tanpa menampilkan wajah (rekam dari dada pakai DJI Osmo,
video di-host di YouTube, di web cuma ditaruh URL-nya). **Status: v1 sudah live,
sudah ada 1 data asli di Sanity ("Gayo Kedai Roster").**

### File-file terkait

- Schema: `sanity/schemas/place.ts` (registered di `schemas/index.ts` &
  `sanity.config.ts`, muncul di Studio sebagai "Places")
- Query: `sanity/queries/place.ts` — `getPlaces()` (listing), `getPlace(slug)` (detail)
- Terjemahan predefined list: `lib/place-options.ts` — **satu-satunya tempat**
  untuk translasi key `facilities`/`goodFor`/`ratings.aspect`/`type`
- Route: `app/(main)/explore/page.tsx` + `_explore-list.tsx` (listing),
  `app/(main)/explore/[slug]/page.tsx` + `_place-content.tsx` (detail)
- i18n label statis UI (bukan predefined list): `lib/i18n.ts` → `explore.*`

### Struktur data `place` (v1)

```
place
├── slug                  (auto dari title.id)
├── type                  (radio: hotel | coffeeshop | public-space)
├── visitedAt             (datetime — tanggal kunjungan asli)
├── publishedAt           (datetime — bisa beda dari visitedAt, sengaja dipisah)
├── priceMin, priceMax    (number, Rupiah — BUKAN tier $/$$/$$$, lihat alasan di bawah)
├── location
│   ├── address (optional), area, city
│   └── googleMapsUrl    (cuma link "Buka di Google Maps", TIDAK ada lat/long
│                          atau embed map — diputuskan skip di v1)
├── media[]               (union: mediaImage { image, alt, caption } |
│                          mediaVideo { youtubeUrl, caption } — urutan bebas,
│                          foto & video bisa diselang-seling)
├── title, shortDescription   (bilingual string: { id, en })
├── description               (bilingual portable text: bold+link only, TIDAK ada
│                              heading/list — sama pola dengan project.description)
├── facilities[]          (array string, PREDEFINED, checkbox di Studio — lihat
│                          daftar key di bawah)
├── goodFor[]              (array string, PREDEFINED, checkbox di Studio)
├── pros[], cons[]          (array bilingual string, BOLEH KOSONG — lihat catatan
│                          sensitivitas kritik di bawah)
├── ratings[]               (array { aspect, score } — HANYA isi aspek yang relevan,
│                          misal Public Space biasanya skip "taste")
└── overall                 (number 1-10, 1 desimal, WAJIB, independen dari
                            rata-rata ratings[] — ini gut-feeling, bukan hasil kalkulasi)
```

### Kenapa `priceMin`/`priceMax` (bukan tier $/$$/$$$)

Awalnya disarankan tier simbolis, tapi user (Oscar) lebih suka rentang nominal
Rupiah karena lebih informatif ("Rp 10.000 – Rp 35.000" lebih jelas daripada
`$$`). 2 field angka dipilih (bukan 1 field teks bebas) supaya format tampilan
selalu konsisten (diformat di kode, bukan diketik manual tiap kali). Isi
`priceMin: 0, priceMax: 0` untuk tempat gratis (public space) — kode otomatis
render label "Gratis"/"Free" untuk kasus ini (lihat `formatPriceRange()` di
`_place-content.tsx`).

### Kenapa `facilities[]`/`goodFor[]` predefined di kode (bukan Sanity collection)

Diputuskan **tidak** membuat document type terpisah (seperti `tag.ts`) untuk
facilities/goodFor, karena:
1. Daftarnya jarang berubah (dikonfirmasi user: "sepertinya jarang berganti").
2. Project skala kecil, di-develop sendiri oleh Oscar — nambah opsi baru cukup
   commit code (3 baris: 1 di `schema options.list`, 1 di `place-options.ts`
   label, 1 di icon mapping kalau perlu), tidak perlu deploy ulang schema besar.
3. Key disimpan sebagai string bahasa Inggris di Sanity (misal `"prayer-room"`),
   TIDAK bilingual di database — terjemahan id/en HANYA ada di
   `lib/place-options.ts`. Ini juga yang bikin filter GROQ jadi mudah
   (`"wifi" in facilities`) tanpa risiko typo/inkonsistensi penulisan antar
   dokumen (beda dari kalau user ngetik "WiFi" vs "Wifi" vs "wi-fi" manual).

**Daftar final `facilities` (key → label id/en):**
| key | id | en |
|---|---|---|
| `wifi` | WiFi | WiFi |
| `ac` | AC | AC |
| `prayer-room` | Musholla | Prayer Room |
| `power-outlet` | Colokan Listrik | Power Outlet |
| `restroom` | WC | Restroom |
| `motorcycle-parking` | Parkir Motor | Motorcycle Parking |
| `car-parking` | Parkir Mobil | Car Parking |

**Daftar final `goodFor` (key → label id/en):**
| key | id | en |
|---|---|---|
| `me-time` | Me Time | Me Time |
| `wfa` | WFA | WFA |
| `group-hangout` | Nongkrong Rame | Group Hangout |
| `staycation` | Staycation | Staycation |
| `meeting` | Meeting | Meeting |
| `photo-spot` | Spot Foto | Photo Spot |

Catatan keputusan: awalnya dipikirkan `wfc` (Work From Cafe) terpisah dari
`wfa` (Work From Anywhere), tapi digabung jadi `wfa` saja karena maknanya
superset (kalau tempat cocok utk kerja, WFA selalu valid apa pun jenis
tempatnya — tidak perlu 2 tag yang tumpang tindih).

**Daftar `ratings.aspect`:** `taste`, `ambience`, `service`, `facilities`,
`value` — skala 1-10, 1 desimal (`precision(1)` di validation).

### Kenapa `pros`/`cons` boleh array kosong

Oscar punya concern soal mengkritik usaha kecil (terutama coffee shop
independen) di konteks sosial Indonesia — kritik terbuka bisa "memanaskan
kondisi" bagi pemilik usaha perorangan. Keputusannya: field tetap ada (bukan
dihapus dari schema), tapi TIDAK wajib diisi — ini editorial call yang
diserahkan ke penulis (Oscar) per kasus, bukan dipaksa lewat validasi schema.
Kalau `cons` kosong, section itu otomatis tidak dirender di UI (conditional,
tidak muncul sebagai section kosong yang aneh).

### UI Detail Page (`_place-content.tsx`)

- **Width**: `max-w-6xl` (1152px) — SENGAJA lebih lebar dari standar situs
  (`max-w-5xl`/1024px dipakai di semua halaman lain: navbar, footer, blog,
  about, projects, contact). Alasan: halaman ini padat elemen visual (bento
  gallery + rating full-width + 2 kolom sidebar), 1024px kerasa "mepet". Kalau
  masih kurang lega di masa depan, next step adalah `max-w-7xl` (1280px) —
  sudah didiskusikan sebagai opsi lanjutan, belum diterapkan.
- **Media gallery**: bento preview statis — foto/video PERTAMA besar (2/3
  lebar di desktop), 2 thumbnail lain di sampingnya (total 3 media terlihat
  di preview). Kalau media > 3, thumbnail ke-3 dapat overlay gelap "+N".
  **Mobile**: HANYA foto/video pertama yang tampil (full width, aspect-video)
  — thumbnail ke-2 & ke-3 disembunyikan (`hidden sm:block`) supaya tidak
  kepanjangan di layar kecil, tapi badge kecil jumlah total media (misal
  ikon galeri + angka) tetap muncul di pojok foto utama.
- **Lightbox**: klik preview mana pun membuka modal fullscreen (`z-[60]`)
  berisi SEMUA item `media[]` (foto DAN video jadi satu urutan slide, gaya
  Google Maps review — video muncul di antara foto sesuai urutan yang
  ditentukan di Studio). Navigasi: tombol chevron kiri/kanan, keyboard arrow
  keys, Escape untuk tutup. Interaksi selalu konsisten berapa pun jumlah
  media (preview selalu statis, slide selalu di lightbox — tidak ada
  percabangan perilaku berdasarkan count).
- **Rating**: full-width card di atas, layout `grid-cols-[auto_1fr]` —
  lingkaran skor overall besar (angka + "/10" DI DALAM lingkaran, border
  sky/25) + baris bintang (`StarRow`, konversi skala 1-10 → 5 bintang,
  mendukung half-star) di bawah lingkaran, sisi kanan grid 2 kolom breakdown
  per aspek dengan icon (`lucide-react`) + progress bar tipis. SEMUA bar
  pakai 1 warna aksen (`sky`), TIDAK gantian sky/rose per aspek — user
  awalnya komplain rating "kerasa over-justified" saat pakai bintang +
  warna ganda + bar tebal, jadi disederhanakan ke 1 warna + bar tipis.
- **Layout utama**: grid `lg:grid-cols-[1.7fr_1fr]` — kolom kiri (lebar)
  cuma `description` (PortableText), kolom kanan sidebar berisi card
  terpisah untuk Facilities, Good For, Pros (conditional), Cons
  (conditional) — masing-masing `SidebarCard` dengan padding lega (`p-6`),
  BUKAN grid mepet (ini juga hasil revisi dari komplain user soal "layout
  terlalu dijejalkan").
- **Facilities chip**: icon (lucide) + teks, bukan teks polos — user minta
  eksplisit "misal iconwifi + Wifi". Icon mapping ada di `FACILITY_ICON`
  dalam `_place-content.tsx` (bukan di `place-options.ts`, karena JSX
  komponen icon tidak boleh dobel-diimpor lintas file untuk hindari
  duplikasi state — cukup key/label yang dipusatkan).
- **Good For chip**: teks polos saja (tanpa icon) — beda dari Facilities.

### Icon library

`lucide-react` (exact version pinned: `1.45.0`, dikonfirmasi kompatibel
React 19). Dipilih karena tree-shakeable, SVG native (`currentColor` ikut
token warna Tailwind yang ada), tidak perlu load font CDN eksternal (beda
dari draft awal yang pakai Material Symbols via Google Fonts CDN — ditolak
karena nambah request eksternal + kurang cocok temanya).

### Gotcha teknis yang sudah pernah kejadian (baca sebelum ubah kode ini)

1. **JANGAN** convert YouTube URL pakai `.replace("watch?v=", "embed/")` —
   ini RUSAK kalau URL punya parameter tambahan (misal `&t=10s`), karena
   replace naif menghilangkan `?` tapi menyisakan `&...` yang jadi query
   string tidak valid → video gagal play ("An error occurred..."). Sudah
   diperbaiki jadi `toYouTubeEmbedUrl()` (parsing pakai `URL`/
   `URLSearchParams`, handle format `watch?v=`, `youtu.be/`, `embed/`, dan
   convert `&t=10s` → `?start=10`).
2. **Field array opsional di GROQ (`pros`, `cons`, `facilities`, `goodFor`,
   `ratings`) HARUS di-`coalesce(field, [])`** di query — kalau dokumen
   Sanity belum pernah mengisi field itu, GROQ balikin `null`, bukan `[]`,
   dan `place.cons.length` di komponen React akan crash
   ("Cannot read properties of null (reading 'length')"). Semua field
   array opsional di `sanity/queries/place.ts` sudah pakai `coalesce()` —
   pertahankan pola ini kalau nambah field array opsional baru.
3. **Portable text `descriptionComponents` WAJIB mendefinisikan
   `block.normal`** dengan margin (`mb-4`) — kalau tidak didefinisikan,
   next-sanity fallback ke renderer default yang tidak punya spacing,
   sehingga baris kosong (paragraf sengaja dikosongkan di Studio untuk
   bikin jarak) collapse dan tidak kelihatan di halaman, walau data di
   Sanity sudah benar. ClassName `min-h-[1em]` ditambahkan supaya paragraf
   yang isinya cuma string kosong `""` tetap punya tinggi visual.
4. Query pakai `revalidate: 60` (Next.js fetch cache) — perubahan data di
   Studio butuh waktu hingga 60 detik untuk muncul di halaman publik.
   Kalau butuh lihat perubahan instan saat development, restart `npm run dev`.

### Yang SENGAJA di-skip di v1 (bukan lupa, ini keputusan sadar)

- **`visits[]`** (revisit tracking / multiple kunjungan ke tempat yang sama
  dengan note terpisah per kunjungan) — ditunda ke v2, alasan: butuh "bank
  data" dulu sebelum tau apakah fitur ini kepake, dan kalau nanti balik ke
  suatu tempat, sementara cukup edit langsung dokumen yang sudah ada
  (update `description`/`ratings`/`visitedAt`).
- **`location.latitude`/`longitude`** dan mini-map embed interaktif — cukup
  `googleMapsUrl` (link keluar ke Google Maps). Alasan: Maps Embed API
  Google sebenarnya gratis tanpa limit, TAPI butuh API key terdaftar di
  Google Cloud yang belum ada urgensinya di v1 — bisa ditambah nanti sebagai
  field opsional baru (non-breaking).
- **`tags[]`** deskriptif (vibe: Cozy/Aesthetic/dll) — di-drop total, karena
  kebutuhan "filter tempat" ternyata terjawab oleh `facilities[]` (fixed
  list yang sudah bisa di-GROQ-filter), jadi tidak perlu layer tag tambahan.
- **Filter UI di halaman listing** (`/explore`) — v1 cuma grid semua tempat
  tanpa filter tab. Filter by `type` (Hotel/Coffeeshop/Public Space) dan
  filter by `facilities` ("advanced filter") ditunda ke v2, nunggu jumlah
  data cukup banyak dulu supaya filter kerasa gunanya.
- **Fake telemetry/gimmick** (WiFi speedtest, ambient noise dB, badge
  "Verified Visit", tombol Save/Share, related-places carousel, quote card
  editorial, rekomendasi menu dengan harga) — semua ini muncul di draft
  mockup awal (dibuat pakai Stitch/AI design tool) tapi DITOLAK karena data
  fiktif yang tidak pernah benar-benar dikumpulkan Oscar, atau nambah scope
  (auth, backend) yang belum dibahas. Kalau menemukan referensi ke
  fitur-fitur ini di file lama, itu SUDAH DIPUTUSKAN untuk tidak dipakai.

### Alur kerja isi data (buat Oscar sendiri, bukan buat AI)

1. Buka `/studio` → "Places" → New document
2. Isi title (id wajib, en wajib — slug auto dari title.id)
3. Pilih `type`, isi `visitedAt`/`publishedAt`, `priceMin`/`priceMax`
4. Isi `location` (area, city wajib; address optional; googleMapsUrl wajib)
5. Upload `media[]` — urutan bebas, campur foto & video sesuka hati (video
   pakai field "Video (YouTube)", tinggal paste URL biasa dari YouTube,
   TIDAK perlu convert ke format embed manual — itu urusan kode)
6. Isi `title`/`shortDescription`/`description` (bilingual, description
   support bold+link doang lewat toolbar block editor)
7. Centang `facilities`/`goodFor` dari checklist yang sudah ada
8. Isi `pros`/`cons` (boleh dikosongkan, terutama `cons` untuk usaha kecil
   kalau merasa kurang nyaman mengkritik)
9. Isi `ratings[]` — HANYA tambah aspek yang relevan (skip yang tidak
   relevan, misal `taste` untuk Public Space)
10. Isi `overall` (wajib, gut-feeling, tidak harus rata-rata dari ratings[])
