import { ImageResponse } from "next/og";

export const alt = "oscardevlog.me — Oscar Hermawan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0F19",
          gap: 32,
        }}
      >
        {/* Icon — dibuat dari div/span, bukan SVG, agar Satori bisa render */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 80,
            fontWeight: 800,
          }}
        >
          <span style={{ color: "#38BDF8" }}>&lt;</span>
          <span style={{ color: "#F43F5E", fontSize: 60 }}>/</span>
          <span style={{ color: "#38BDF8" }}>&gt;</span>
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            color: "#F8FAFC",
            letterSpacing: "-2px",
          }}
        >
          oscardevlog
          <span style={{ color: "#38BDF8" }}>.me</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#64748B",
          }}
        >
          Oscar Hermawan — Full-stack JavaScript Engineer
        </div>
      </div>
    ),
    size
  );
}
