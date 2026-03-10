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

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {article.imageUrl && (
        <div className="aspect-video w-full overflow-hidden rounded-xl mb-8 bg-gray-100">
          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}
      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--tr-red)]">
        {article.category}
      </span>
      <h1 className="text-4xl font-black leading-tight mt-2 mb-4">{article.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-200">
        <time>
          {new Date(article.publishedAt).toLocaleDateString("en-CA", {
            year: "numeric", month: "long", day: "numeric",
          })}
        </time>
        {article.sourceUrl && (
          <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer"
            className="hover:text-[var(--tr-red)] transition-colors">
            Source →
          </a>
        )}
      </div>
      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
        {article.body}
      </div>
    </div>
  );
}
