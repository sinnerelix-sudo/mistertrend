import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://mistertrend.az", changeFrequency: "daily", priority: 1 }];
}
