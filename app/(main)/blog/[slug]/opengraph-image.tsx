import { ImageResponse } from "next/og";
import { getPost } from "@/sanity/queries/post";

export const alt = "oscardevlog.me";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  const title = post?.title.id ?? "oscardevlog.me";
  const excerpt = post?.excerpt.id ?? "Oscar Hermawan — Full-stack JavaScript Engineer";
  const badge = post?.format === "video" ? "#Video" : "#Article";
  const badgeColor = post?.format === "video" ? "#F43F5E" : "#38BDF8";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0F19",
          padding: "64px",
        }}
      >
        {/* Top: site name + badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "#38BDF8", fontSize: 20, fontWeight: 700 }}>
            oscardevlog.me
          </span>
          <span
            style={{
              backgroundColor: badgeColor,
              color: post?.format === "video" ? "#fff" : "#0B0F19",
              fontSize: 14,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: "6px",
            }}
          >
            {badge}
          </span>
        </div>

        {/* Middle: title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 48 : 60,
            fontWeight: 800,
            color: "#F8FAFC",
            lineHeight: 1.2,
            letterSpacing: "-1px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Bottom: excerpt + author */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontSize: 24, color: "#64748B", maxWidth: "800px" }}>
            {excerpt.length > 120 ? excerpt.slice(0, 120) + "…" : excerpt}
          </div>
          <div style={{ fontSize: 18, color: "#475569" }}>
            Oscar Hermawan · Full-stack JavaScript Engineer
          </div>
        </div>
      </div>
    ),
    size
  );
}
