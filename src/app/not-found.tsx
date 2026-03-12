import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "60vh", padding: "40px 24px", textAlign: "center",
    }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>404</div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary, #e2e8f0)", margin: "0 0 8px" }}>
        Page Not Found
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary, #94a3b8)", marginBottom: 24 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/en"
        style={{
          display: "inline-block", padding: "10px 24px", background: "var(--accent, #6366f1)",
          color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
