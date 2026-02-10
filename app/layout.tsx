import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <body>
        <header className="container" style={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="/">MISTER TREND</Link>
          <nav style={{ display: "flex", gap: 10 }}><Link href="/catalog">Catalog</Link><Link href="/favorites">Favorites</Link><Link href="/cart">Cart</Link><Link href="/orders">Orders</Link></nav>
        </header>
        <main className="container" style={{ paddingBottom: 70 }}>{children}</main>
        <footer className="bottom-nav"><Link href="/">Home</Link><Link href="/catalog">Catalog</Link><Link href="/favorites">Fav</Link><Link href="/cart">Cart</Link><Link href="/auth">Profile</Link></footer>
      </body>
    </html>
  );
}
