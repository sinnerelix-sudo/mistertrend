import Link from "next/link";
import { prisma } from "@/lib/db";

export const metadata = { title: "MISTER TREND" };

export default async function Home() {
  const [banners, products, categories] = await Promise.all([
    prisma.banner.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({ where: { OR: [{ featured: true }, { trending: true }] }, take: 8 }),
    prisma.category.findMany({ take: 8 })
  ]);
  return <div>
    <h1>Premium essentials in AZN ₼</h1>
    <div className="grid">{banners.map((b) => <div key={b.id} className="card"><b>{b.titleAz}</b><p>{b.subtitleAz}</p></div>)}</div>
    <h2>Categories</h2>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{categories.map((c) => <Link className="card" key={c.id} href={`/c/${c.slug}`}>{c.nameAz}</Link>)}</div>
    <h2>Trending & Featured</h2>
    <div className="grid">{products.map((p) => <Link className="card" key={p.id} href={`/p/${p.slug}`}><b>{p.titleAz}</b><p>₼{String(p.price)}</p></Link>)}</div>
    <section><h3>Trust</h3><p className="muted">Fast delivery • Easy returns • 7/24 support</p></section>
  </div>;
}
