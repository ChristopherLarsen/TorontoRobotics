import { db } from "../lib/db";
import { articles } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import ArticleCard from "../components/ArticleCard";
import RobotCarousel from "../components/RobotCarousel";

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
    .limit(7);

  // Spotlight specifically targets reviews (or falls back to latest articles if none exist)
  let spotlightArticles = await db
    .select()
    .from(articles)
    .where(eq(articles.category, "review"))
    .orderBy(desc(articles.publishedAt))
    .limit(3);

  // If there are no reviews yet, use some generic articles for the spotlight so it isn't empty in demo
  // Make sure not to include the featured article in the spotlight fallback!
  if (spotlightArticles.length === 0) {
    spotlightArticles = latestNews
      .filter((a) => a.id !== featuredArticle?.id)
      .slice(0, 3);
  }

  // Create a set of IDs already shown in the spotlight so we don't duplicate them in the "Latest" section
  const spotlightIds = new Set(spotlightArticles.map((a) => a.id));

  // If there's a featured article or spotlight articles, exclude them from the latest news
  const feedNews = latestNews
    .filter((a) => a.id !== featuredArticle?.id && !spotlightIds.has(a.id))
    .slice(0, 6);
  
  // Split feed news for the "Strategist energy" layout
  const topNews = feedNews.slice(0, 2);
  const remainingNews = feedNews.slice(2);

  return (
    <div className="py-12 lg:py-20">
      
      {/* Container for Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {/* Hero Section (Wallpaper* calm) */}
        <section>
          {featuredArticle ? (
            <ArticleCard 
              {...featuredArticle} 
              variant="featured" 
            />
          ) : (
            <div className="py-32 text-center bg-[var(--color-brand-bg)] border border-[var(--color-brand-border)] rounded-sm">
              <h2 className="text-2xl font-serif font-black text-[var(--color-brand-muted)] mb-2">Editor's Picks</h2>
              <p className="text-sm text-[var(--color-brand-muted)]">Fresh robot news and reviews arriving soon.</p>
            </div>
          )}
        </section>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RobotCarousel />
      </div>

      {/* Editor's Spotlight - Premium Teal Section (Full Bleed) */}
      {spotlightArticles.length > 0 && (
        <section className="relative overflow-hidden py-24 mb-24 bg-[var(--color-brand-accent)]">
          {/* Subtle animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_70%)] animate-breathe mix-blend-overlay"></div>
            <div className="absolute -bottom-[50%] -right-[10%] w-[70%] h-[150%] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.15)_0%,transparent_70%)] animate-breathe mix-blend-overlay" style={{ animationDelay: "5s" }}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-baseline mb-12 border-b-2 border-white/20 pb-4">
              <h2 className="text-3xl font-serif font-black tracking-tight text-white">Editor's Spotlight</h2>
              <Link href="/reviews" className="text-sm font-bold tracking-widest uppercase text-white/80 hover:text-white transition-colors">
                All Reviews
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {spotlightArticles.map((article) => (
                <div key={article.id} className="bg-[var(--color-brand-surface)] text-[var(--color-brand-text)] rounded-sm p-4 h-full shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                  <ArticleCard {...article} variant="standard" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Container for the rest of the page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Picks / Latest Grid (Design Milk elegant cards + Dezeen grid) */}
        <section className="mb-24">
          <div className="flex justify-between items-baseline mb-10 border-b-2 border-[var(--color-brand-text)] pb-4">
            <h2 className="text-3xl font-serif font-black tracking-tight">The Latest</h2>
            <Link href="/news" className="text-sm font-bold tracking-widest uppercase text-[var(--color-brand-accent)] hover:text-[var(--color-brand-text)] transition-colors">
              View All
            </Link>
          </div>
          
          {feedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Left column: larger cards */}
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
                {topNews.map((article) => (
                  <ArticleCard key={article.id} {...article} variant="standard" />
                ))}
              </div>
              
              {/* Right column: compact list (Strategist energy) */}
              <div className="md:col-span-4 flex flex-col gap-8 bg-[var(--color-brand-bg)] p-6 rounded-sm border border-[var(--color-brand-border)]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-text)] mb-2 border-b border-[var(--color-brand-border)] pb-4">
                  Trending Now
                </h3>
                {remainingNews.map((article) => (
                  <ArticleCard key={article.id} {...article} variant="compact" />
                ))}
                {remainingNews.length === 0 && (
                  <p className="text-sm text-[var(--color-brand-muted)]">Check back for more updates.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-[var(--color-brand-muted)] border border-[var(--color-brand-border)]">
              <p className="text-lg">No recent articles found.</p>
            </div>
          )}
        </section>
        
        {/* Which Humanoid Robot Should You Buy? */}
        <section className="mb-24">
          <div className="flex justify-between items-baseline mb-10 border-b-2 border-[var(--color-brand-text)] pb-4">
            <h2 className="text-3xl font-serif font-black tracking-tight">Which Humanoid Robot Should You Buy?</h2>
            <Link href="/buy" className="text-sm font-bold tracking-widest uppercase text-[var(--color-brand-accent)] hover:text-[var(--color-brand-text)] transition-colors">
              View All
            </Link>
          </div>

          <Link href="/news/unitree-robot-review" className="group block">
            <div className="relative overflow-hidden rounded-sm border border-[var(--color-brand-border)] hover:border-[var(--color-brand-accent)] transition-colors">
              <div className="aspect-[21/9] w-full bg-[var(--color-brand-bg)] overflow-hidden">
                <img
                  src="https://www.unitree.com/upload/g1/g1-hero.webp"
                  alt="Unitree humanoid robot"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-8 md:p-12 bg-[var(--color-brand-surface)]">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] block mb-4">
                  Buying Guide
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black text-[var(--color-brand-text)] leading-tight mb-4 group-hover:text-[var(--color-brand-accent)] transition-colors">
                  Unitree Robot: The Most Accessible Humanoid You Can Actually Buy
                </h3>
                <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed max-w-3xl">
                  Unitree is shipping more humanoid robots than anyone else on the planet. Here is everything you need to know about their lineup, pricing, and what it is actually like to own one.
                </p>
              </div>
            </div>
          </Link>
        </section>
        
      </div>
    </div>
  );
}
