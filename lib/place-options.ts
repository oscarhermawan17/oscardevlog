/**
 * Daftar predefined untuk field `facilities`, `goodFor`, dan `ratings.aspect`
 * di schema Sanity `place`. Key di Sanity disimpan dalam bahasa Inggris
 * (lihat sanity/schemas/place.ts) — terjemahan id/en HANYA didefinisikan
 * di sini, satu sumber kebenaran, tidak disimpan di database.
 *
 * Menambah opsi baru = tambah entry di sini + di options.list schema terkait.
 */

export type FacilityKey =
  | "wifi"
  | "ac"
  | "prayer-room"
  | "power-outlet"
  | "restroom"
  | "motorcycle-parking"
  | "car-parking";

export type GoodForKey =
  | "me-time"
  | "wfa"
  | "group-hangout"
  | "staycation"
  | "meeting"
  | "photo-spot";

export type RatingAspectKey =
  | "taste"
  | "ambience"
  | "service"
  | "facilities"
  | "value";

export const FACILITY_LABEL: Record<FacilityKey, { id: string; en: string }> = {
  wifi: { id: "WiFi", en: "WiFi" },
  ac: { id: "AC", en: "AC" },
  "prayer-room": { id: "Musholla", en: "Prayer Room" },
  "power-outlet": { id: "Colokan Listrik", en: "Power Outlet" },
  restroom: { id: "WC", en: "Restroom" },
  "motorcycle-parking": { id: "Parkir Motor", en: "Motorcycle Parking" },
  "car-parking": { id: "Parkir Mobil", en: "Car Parking" },
};

export const GOOD_FOR_LABEL: Record<GoodForKey, { id: string; en: string }> = {
  "me-time": { id: "Me Time", en: "Me Time" },
  wfa: { id: "WFA", en: "WFA" },
  "group-hangout": { id: "Nongkrong Rame", en: "Group Hangout" },
  staycation: { id: "Staycation", en: "Staycation" },
  meeting: { id: "Meeting", en: "Meeting" },
  "photo-spot": { id: "Spot Foto", en: "Photo Spot" },
};

export const RATING_ASPECT_LABEL: Record<RatingAspectKey, { id: string; en: string }> = {
  taste: { id: "Rasa", en: "Taste" },
  ambience: { id: "Suasana", en: "Ambience" },
  service: { id: "Pelayanan", en: "Service" },
  facilities: { id: "Fasilitas", en: "Facilities" },
  value: { id: "Worth It", en: "Value" },
};

export const PLACE_TYPE_LABEL = {
  hotel: { id: "Hotel", en: "Hotel" },
  coffeeshop: { id: "Coffee Shop", en: "Coffee Shop" },
  "public-space": { id: "Public Space", en: "Public Space" },
} as const;
