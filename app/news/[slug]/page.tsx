import { db } from "../../../lib/db";
import { articles } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [article] = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  if (!article) return {};
  return { title: article.title, description: article.summary };
}

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const [article] = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  if (!article) notFound();

  const isReview = article.category === "review" || article.category === "buy-guide";

  if (isReview) {
    return (
      <div className="bg-[var(--color-brand-bg)] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[var(--color-brand-accent)] block mb-6">
              {article.category.replace("-", " ")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[var(--color-brand-text)] leading-tight mb-8">
              {article.title}
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-brand-muted)] leading-relaxed max-w-3xl mx-auto mb-8">
              {article.summary}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm font-semibold uppercase tracking-wider text-[var(--color-brand-muted)] border-t border-b border-[var(--color-brand-border)] py-4 max-w-2xl mx-auto">
              <time>
                {new Date(article.publishedAt).toLocaleDateString("en-CA", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </time>
              <span className="w-1 h-1 rounded-full bg-[var(--color-brand-border)]" />
              <span>By Toronto Robotics Editorial</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 bg-[var(--color-brand-surface)] p-6 border border-[var(--color-brand-border)] rounded-sm shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-text)] mb-4 border-b border-[var(--color-brand-border)] pb-3">
                  In This Guide
                </h3>
                <ul className="space-y-3 text-sm text-[var(--color-brand-muted)]">
                  <li className="hover:text-[var(--color-brand-accent)] cursor-pointer transition-colors font-semibold">Our Verdict</li>
                  <li className="hover:text-[var(--color-brand-accent)] cursor-pointer transition-colors">Who It&apos;s For</li>
                  <li className="hover:text-[var(--color-brand-accent)] cursor-pointer transition-colors">How We Tested</li>
                  <li className="hover:text-[var(--color-brand-accent)] cursor-pointer transition-colors">Key Specs</li>
                  <li className="hover:text-[var(--color-brand-accent)] cursor-pointer transition-colors">Alternatives</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8 bg-[var(--color-brand-surface)] p-6 md:p-12 border border-[var(--color-brand-border)] rounded-sm shadow-sm">
              
              {article.imageUrl && (
                <div className="aspect-[4/3] w-full overflow-hidden rounded-sm mb-12 bg-[var(--color-brand-bg)] border border-[var(--color-brand-border)]">
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="prose prose-lg md:prose-xl max-w-none text-[var(--color-brand-text)] font-serif leading-relaxed whitespace-pre-wrap
                prose-headings:font-serif prose-headings:font-black prose-headings:tracking-tight prose-headings:text-[var(--color-brand-text)]
                prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-[var(--color-brand-border)] prose-h2:pb-4
                prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
                prose-p:mb-8 prose-p:leading-relaxed
                prose-a:text-[var(--color-brand-accent)] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:font-bold prose-strong:text-[var(--color-brand-text)]
                prose-ul:my-8 prose-ul:list-square prose-ul:pl-6
                prose-li:my-2
              ">
                {article.body}
              </div>

              {article.sourceUrl && (
                <div className="mt-16 pt-8 border-t border-[var(--color-brand-border)]">
                  <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-brand-bg)] border border-[var(--color-brand-border)] rounded-sm text-sm font-bold uppercase tracking-widest text-[var(--color-brand-text)] hover:text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)] transition-all">
                    View Source <span className="text-lg">→</span>
                  </a>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-brand-surface)]">
      
      <div className="w-full bg-[var(--color-brand-bg)] border-b border-[var(--color-brand-border)]">
        {article.imageUrl && (
           <div className="aspect-[21/9] w-full max-w-7xl mx-auto overflow-hidden bg-[var(--color-brand-bg)]">
             <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
           </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
        
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] block mb-6">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black leading-tight text-[var(--color-brand-text)] mb-8">
            {article.title}
          </h1>
          <div className="flex justify-center items-center gap-6 text-xs font-bold uppercase tracking-widest text-[var(--color-brand-muted)] border-t border-b border-[var(--color-brand-border)] py-4">
            <time>
              {new Date(article.publishedAt).toLocaleDateString("en-CA", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </time>
          </div>
        </div>

        <div className="max-w-none text-[var(--color-brand-text)] font-serif leading-relaxed whitespace-pre-wrap
          text-lg md:text-xl
          [&>p]:mb-8 [&>p]:leading-relaxed
          [&>h2]:font-serif [&>h2]:font-black [&>h2]:text-3xl [&>h2]:mt-16 [&>h2]:mb-6
          [&>h3]:font-serif [&>h3]:font-black [&>h3]:text-2xl [&>h3]:mt-12 [&>h3]:mb-4
          [&>a]:text-[var(--color-brand-accent)] [&>a]:font-semibold hover:[&>a]:underline
        ">
          <p className="text-2xl lg:text-3xl font-serif font-normal text-[var(--color-brand-muted)] leading-relaxed mb-12 border-l-4 border-[var(--color-brand-accent)] pl-6">
            {article.summary}
          </p>

          {article.body}
        </div>

        {article.sourceUrl && (
          <div className="mt-20 pt-10 border-t-2 border-[var(--color-brand-text)] text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-brand-muted)] mb-6">Read More</p>
            <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-brand-text)] text-[var(--color-brand-surface)] rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-[var(--color-brand-accent)] border border-transparent hover:border-[var(--color-brand-accent)] transition-all">
              Original Source <span className="text-lg">→</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
