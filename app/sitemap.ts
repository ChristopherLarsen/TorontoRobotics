import type { MetadataRoute } from "next";
import { db } from "../lib/db";
import { articles } from "../db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

const BASE_URL = "https://torontorobotics.carapaceos.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allArticles = await db
    .select({ slug: articles.slug, publishedAt: articles.publishedAt })
    .from(articles)
    .orderBy(desc(articles.publishedAt))
    .limit(100);

  const articleEntries: MetadataRoute.Sitemap = allArticles.map((a) => ({
    url: `${BASE_URL}/news/${a.slug}`,
    lastModified: a.publishedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/news`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/reviews`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/buy`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.4 },
    ...articleEntries,
  ];
}
