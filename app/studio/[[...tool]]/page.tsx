import type { Metadata, Viewport } from "next";
import StudioClient from "./_studio-client";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  referrer: "same-origin",
  robots: "noindex",
};

export default function StudioPage() {
  return <StudioClient />;
}
