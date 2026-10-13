import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <SiteChrome>
      <main
        style={{
          paddingTop: "calc(var(--announce-h) + var(--header-h) + 80px)",
          paddingBottom: 96,
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 style={{ marginBottom: 12 }}>Page not found</h1>
          <p style={{ color: "var(--sysco-muted)", marginBottom: 24 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <Link href="/" className="btn btn-green">
            Back to home
          </Link>
        </div>
      </main>
    </SiteChrome>
  );
}
