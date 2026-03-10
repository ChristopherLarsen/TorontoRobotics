import { db } from "../../lib/db";
import { articles } from "../../db/schema";
import { eq, desc } from "drizzle-orm";
import ArticleCard from "../../components/ArticleCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robot Reviews",
  description: "In-depth robot reviews to help you make the right choice.",
};

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await db
    .select()
    .from(articles)
    .where(eq(articles.category, "review"))
    .orderBy(desc(articles.publishedAt))
    .limit(50);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black mb-2">Robot Reviews</h1>
      <p className="text-gray-500 mb-8">Honest, in-depth reviews of the latest robots.</p>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Reviews coming soon.</p>
      )}
    </div>
  );
}
