import Link from "next/link";

interface ArticleCardProps {
  slug: string;
  title: string;
  summary: string;
  publishedAt: Date;
  imageUrl?: string | null;
  category: string;
}

export default function ArticleCard({
  slug, title, summary, publishedAt, imageUrl, category,
}: ArticleCardProps) {
  return (
    <Link href={`/news/${slug}`} className="group block">
      {imageUrl && (
        <div className="aspect-video w-full overflow-hidden rounded-lg mb-3 bg-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--tr-red)]">
        {category}
      </span>
      <h3 className="text-lg font-bold leading-tight mt-1 group-hover:text-[var(--tr-red)] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{summary}</p>
      <time className="text-xs text-gray-400 mt-2 block">
        {new Date(publishedAt).toLocaleDateString("en-CA", {
          year: "numeric", month: "long", day: "numeric",
        })}
      </time>
    </Link>
  );
}
