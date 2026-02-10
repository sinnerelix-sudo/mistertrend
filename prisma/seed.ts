import { PrismaClient, Role, DiscountType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminPhone = process.env.SEED_ADMIN_PHONE ?? "+994500000000";
  await prisma.user.upsert({
    where: { phone: adminPhone },
    update: { role: Role.ADMIN, name: "Admin" },
    create: { phone: adminPhone, role: Role.ADMIN, name: "Admin" }
  });

  const cat = await prisma.category.upsert({
    where: { slug: "shoes" },
    update: {},
    create: { slug: "shoes", nameAz: "Ayaqqabı", nameRu: "Обувь" }
  });

  await prisma.product.upsert({
    where: { slug: "trend-sneaker" },
    update: {},
    create: {
      slug: "trend-sneaker",
      titleAz: "Trend Sneaker",
      titleRu: "Trend Кроссовки",
      descAz: "Gündəlik istifadə üçün rahat model",
      descRu: "Удобная модель на каждый день",
      price: 79,
      discountType: DiscountType.PERCENT,
      discountValue: 10,
      stock: 15,
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
      keywordsAz: ["sneaker"],
      keywordsRu: ["кроссовки"],
      featured: true,
      trending: true,
      categoryId: cat.id
    }
  });

  await prisma.banner.create({
    data: {
      titleAz: "Yeni kolleksiya",
      titleRu: "Новая коллекция",
      subtitleAz: "Sürətli çatdırılma",
      subtitleRu: "Быстрая доставка",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8"
    }
  });

  await prisma.settings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });
}

main().finally(() => prisma.$disconnect());
