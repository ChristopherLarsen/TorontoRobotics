import { db } from "../../lib/db";
import { articles } from "../../db/schema";
import { eq, desc } from "drizzle-orm";
import ArticleCard from "../../components/ArticleCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robot News",
  description: "The latest robot news from around the world, curated daily.",
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const allNews = await db
    .select()
    .from(articles)
    .where(eq(articles.category, "news"))
    .orderBy(desc(articles.publishedAt))
    .limit(50);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black mb-2">Robot News</h1>
      <p className="text-gray-500 mb-8">Updated daily by our AI editor.</p>
      {allNews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allNews.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No articles yet. Check back soon.</p>
      )}
    </div>
  );
}
