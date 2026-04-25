import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WebKosice — Custom web development in Kosice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0a0a0b",
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(34, 211, 238, 0.25), rgba(10,10,11,0) 70%)",
          color: "#e7e7ea",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              border: "1px solid rgba(34, 211, 238, 0.5)",
              background: "#16161a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#22d3ee",
              fontFamily: "monospace",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            w/
          </div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>
            web<span style={{ color: "#22d3ee" }}>kosice</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 20,
              color: "#22d3ee",
              fontFamily: "monospace",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            &gt; freelance_web_developer.sk
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            Websites that <span style={{ color: "#22d3ee" }}>sell</span>.
            <br />
            Custom-built in Kosice.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#a0a0a8",
            fontSize: 20,
          }}
        >
          <div>webkosice.sk</div>
          <div style={{ fontFamily: "monospace" }}>Kosice · Slovakia</div>
        </div>
      </div>
    ),
    size,
  );
}
