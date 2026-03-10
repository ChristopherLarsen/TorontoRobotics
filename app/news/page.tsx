import { db } from "../../lib/db";
import { articles } from "../../db/schema";
import { eq, desc } from "drizzle-orm";
import ArticleCard from "../../components/ArticleCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robot News & Updates",
  description: "The latest news and developments in the world of robotics.",
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
    <div className="bg-[var(--color-brand-bg)] min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[var(--color-brand-text)] leading-tight mb-6">
            Robot News
          </h1>
          <p className="text-xl text-[var(--color-brand-muted)] leading-relaxed">
            The latest announcements, breakthroughs, and developments in robotics.
          </p>
        </div>

        {allNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {allNews.map((article) => (
              <ArticleCard key={article.id} {...article} variant="standard" />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] rounded-sm">
            <p className="text-lg text-[var(--color-brand-muted)]">No articles yet. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
