import { ImageResponse } from "next/og";

export const runtime = "edge";
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
          fontFamily: "monospace",
          gap: 32,
        }}
      >
        {/* Icon */}
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" rx="20" fill="#0B0F19" />
          <rect
            x="2" y="2" width="96" height="96" rx="18"
            stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.2"
          />
          <path
            d="M30 35L15 50L30 65"
            stroke="#38BDF8" strokeWidth="10"
            strokeLinecap="round" strokeLinejoin="round"
          />
          <path
            d="M70 35L85 50L70 65"
            stroke="#38BDF8" strokeWidth="10"
            strokeLinecap="round" strokeLinejoin="round"
          />
          <path
            d="M55 25L45 75"
            stroke="#F43F5E" strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
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
            fontSize: 28,
            color: "#64748B",
            letterSpacing: "1px",
          }}
        >
          Oscar Hermawan — Full-stack JavaScript Engineer
        </div>
      </div>
    ),
    size
  );
}
