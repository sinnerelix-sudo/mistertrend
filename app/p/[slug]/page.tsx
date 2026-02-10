import { prisma } from "@/lib/db";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const p = await prisma.product.findUniqueOrThrow({ where: { slug: params.slug } });
  return <div><h1>{p.titleAz}</h1><p>{p.descAz}</p><p>₼{String(p.price)}</p><button className="btn">Add to cart</button></div>;
}
