import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = await prisma.category.findUniqueOrThrow({ where: { slug: params.slug }, include: { products: true } });
  return <div><h1>{cat.nameAz}</h1><div className="grid">{cat.products.map((p) => <Link href={`/p/${p.slug}`} key={p.id} className="card">{p.titleAz}</Link>)}</div></div>;
}
