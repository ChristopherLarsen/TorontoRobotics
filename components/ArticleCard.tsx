import Link from "next/link";

export interface ArticleCardProps {
  slug: string;
  title: string;
  summary: string;
  publishedAt: Date;
  imageUrl?: string | null;
  category: string;
  variant?: "featured" | "standard" | "compact";
}

export default function ArticleCard({
  slug, title, summary, publishedAt, imageUrl, category, variant = "standard"
}: ArticleCardProps) {
  
  if (variant === "featured") {
    return (
      <Link href={`/news/${slug}`} className="group block relative overflow-hidden rounded-sm h-[400px] lg:h-[500px]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-[var(--color-brand-muted)] opacity-20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
          <span className="text-xs font-bold uppercase tracking-widest text-white mb-3 block">
            {category}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-white leading-tight mb-3 group-hover:text-[var(--color-brand-accent)] transition-colors duration-300">
            {title}
          </h2>
          <p className="text-gray-200 text-sm md:text-base max-w-2xl line-clamp-2 mb-4">
            {summary}
          </p>
          <time className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            {new Date(publishedAt).toLocaleDateString("en-CA", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </time>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/news/${slug}`} className="group flex gap-4 items-center">
        {imageUrl ? (
          <div className="w-24 h-24 shrink-0 overflow-hidden rounded-sm bg-gray-100">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-24 h-24 shrink-0 rounded-sm bg-[var(--color-brand-bg)] border border-[var(--color-brand-border)]" />
        )}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] block mb-1">
            {category}
          </span>
          <h3 className="text-base font-bold text-[var(--color-brand-text)] leading-snug group-hover:text-[var(--color-brand-accent)] transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <time className="text-xs text-[var(--color-brand-muted)] mt-2 block uppercase tracking-wider">
            {new Date(publishedAt).toLocaleDateString("en-CA", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </time>
        </div>
      </Link>
    );
  }

  // Standard Variant (Design Milk style - airy cards)
  return (
    <Link href={`/news/${slug}`} className="group block flex flex-col h-full">
      {imageUrl ? (
        <div className="aspect-[4/3] w-full overflow-hidden rounded-sm mb-5 bg-[var(--color-brand-bg)] border border-[var(--color-brand-border)]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] w-full mb-5 rounded-sm bg-[var(--color-brand-bg)] border border-[var(--color-brand-border)]" />
      )}
      
      <div className="flex flex-col flex-grow">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
          {category}
        </span>
        <h3 className="text-xl font-serif font-black text-[var(--color-brand-text)] leading-tight mb-3 group-hover:text-[var(--color-brand-accent)] transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed line-clamp-2 mb-4 flex-grow">
          {summary}
        </p>
        <div className="mt-auto border-t border-[var(--color-brand-border)] pt-4">
          <time className="text-[10px] text-[var(--color-brand-muted)] font-semibold uppercase tracking-wider">
            {new Date(publishedAt).toLocaleDateString("en-CA", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </time>
        </div>
      </div>
    </Link>
  );
}
