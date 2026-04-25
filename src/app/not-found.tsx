import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0b",
          color: "#e7e7ea",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "0.75rem",
              color: "#22d3ee",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            404
          </div>
          <h1 style={{ fontSize: "2.5rem", margin: "1rem 0" }}>
            Page not found
          </h1>
          <p style={{ color: "#a0a0a8", marginBottom: "2rem" }}>
            Looks like you hit a dead end. Let&apos;s head back.
          </p>
          <Link
            href="/sk"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              background: "#22d3ee",
              color: "#0a0a0b",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Back home
          </Link>
        </div>
      </body>
    </html>
  );
}
