import { db } from "../lib/db";
import { articles } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import ArticleCard from "../components/ArticleCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredArticle] = await db
    .select()
    .from(articles)
    .where(eq(articles.isFeatured, true))
    .orderBy(desc(articles.publishedAt))
    .limit(1);

  const latestNews = await db
    .select()
    .from(articles)
    .where(eq(articles.category, "news"))
    .orderBy(desc(articles.publishedAt))
    .limit(6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      {featuredArticle ? (
        <Link href={`/news/${featuredArticle.slug}`} className="group block mb-12">
          {featuredArticle.imageUrl && (
            <div className="aspect-[21/9] w-full overflow-hidden rounded-xl mb-6 bg-gray-100">
              <img
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--tr-red)]">
            Today&apos;s Featured Story
          </span>
          <h1 className="text-4xl font-black leading-tight mt-2 group-hover:text-[var(--tr-red)] transition-colors">
            {featuredArticle.title}
          </h1>
          <p className="text-lg text-gray-600 mt-3 max-w-3xl">
            {featuredArticle.summary}
          </p>
        </Link>
      ) : (
        <div className="mb-12 py-16 text-center text-gray-400">
          <p className="text-lg">Fresh robot news arriving soon.</p>
        </div>
      )}

      {/* Latest News Grid */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <Link href="/news" className="text-sm text-[var(--tr-red)] font-medium hover:underline">
            All news →
          </Link>
        </div>
        {latestNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No articles yet. Check back soon.</p>
        )}
      </div>
    </div>
  );
}
