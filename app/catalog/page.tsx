import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Catalog({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q?.trim();
  const items = await prisma.product.findMany({ where: q ? { OR: [{ titleAz: { contains: q, mode: "insensitive" } }, { titleRu: { contains: q, mode: "insensitive" } }] } : undefined, take: 30 });
  return <div><h1>Catalog</h1><div className="grid">{items.map((p) => <Link href={`/p/${p.slug}`} key={p.id} className="card">{p.titleAz}<p>₼{String(p.price)}</p></Link>)}</div></div>;
}
