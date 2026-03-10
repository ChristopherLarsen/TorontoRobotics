# Toronto Robotics — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the Triggerfishh Next.js codebase into Toronto Robotics — a clean editorial robot news and review site served from the CarapaceOS VPS.

**Architecture:** Next.js 16 app, Neon Postgres + Drizzle ORM (extend existing DB with `articles` table), Nginx reverse proxy + PM2 on CarapaceOS VPS (76.13.120.97). OpenClaw writes articles to the DB nightly; the site reads them.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Drizzle ORM, Neon Postgres, Nginx, PM2, TypeScript

---

## Task 1: Delete All Triggerfishh Content

**Files:**
- Delete: `app/buy/`, `app/download/`, `app/keys/`, `app/landing/`, `app/privacy-policy/`, `app/refund/`, `app/refund-request/`, `app/products/`, `app/social/`, `app/support/`, `app/terms-of-service/`, `app/tips/`, `app/triggerfish/`
- Delete: `app/api/licenses/`, `app/api/refund-request/`, `app/api/webhooks/`
- Delete: `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `app/manifest.ts`
- Delete: `components/SiteFooter.tsx`
- Delete: `assets/` (all Triggerfishh assets)
- Delete: `product.md`, `SEO.md`, `tasks.md`, `AGENTS.md`

**Step 1: Remove all Triggerfishh pages and API routes**

```bash
rm -rf app/buy app/download app/keys app/landing app/privacy-policy
rm -rf app/refund app/refund-request app/products app/social
rm -rf app/support app/terms-of-service app/tips app/triggerfish
rm -rf app/api
rm -f app/opengraph-image.tsx app/twitter-image.tsx app/manifest.ts
rm -f components/SiteFooter.tsx
rm -rf assets
rm -f product.md SEO.md tasks.md AGENTS.md
```

**Step 2: Verify only core files remain**

```bash
find app -type f | sort
# Expected: app/globals.css, app/layout.tsx, app/page.tsx, app/robots.ts, app/sitemap.ts
```

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: delete all Triggerfishh content"
```

---

## Task 2: Update package.json and Root Config

**Files:**
- Modify: `package.json`
- Modify: `next.config.ts`
- Modify: `drizzle.config.ts`

**Step 1: Update package.json name and dev port**

In `package.json`, change:
```json
{
  "name": "toronto-robotics",
  "scripts": {
    "dev": "next dev --port 3004"
  }
}
```
(Port 3004 — CarapaceOS is on 3000, Triggerfishh VPS on 3001.)

**Step 2: Read and update next.config.ts**

Read `next.config.ts` first, then ensure it has no Triggerfishh-specific config. Replace contents with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
```

**Step 3: Commit**

```bash
git add package.json next.config.ts
git commit -m "chore: rename project to toronto-robotics, set port 3004"
```

---

## Task 3: Add Articles Table to DB Schema

**Files:**
- Modify: `db/schema.ts`
- Create: `drizzle/` migration (auto-generated)

**Step 1: Add articles table to `db/schema.ts`**

Append after the existing tables:

```ts
/* ─────────────────────────────────────────────
   articles
   ───────────────────────────────────────────── */

export const articles = pgTable(
  "articles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").unique().notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    body: text("body").notNull(),
    category: varchar("category", { length: 50 }).notNull().default("news"),
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
    sourceUrl: text("source_url"),
    isFeatured: boolean("is_featured").default(false),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_articles_slug").on(table.slug),
    index("idx_articles_category").on(table.category),
    index("idx_articles_published_at").on(table.publishedAt),
    index("idx_articles_is_featured").on(table.isFeatured),
  ]
);
```

**Step 2: Generate and run migration**

```bash
npm run db:generate
npm run db:migrate
```

Expected: new migration file in `drizzle/`, table created in Neon DB.

**Step 3: Commit**

```bash
git add db/schema.ts drizzle/
git commit -m "feat: add articles table for Toronto Robotics content"
```

---

## Task 4: Update Root Layout (Metadata + Fonts)

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Step 1: Replace `app/layout.tsx` with Toronto Robotics metadata**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Toronto Robotics — Robot News, Reviews & Buying Guide",
    template: "%s | Toronto Robotics",
  },
  description:
    "Your source for robot news, reviews, and how to buy a robot in Toronto. Updated daily.",
  keywords: [
    "robots Toronto",
    "robot news",
    "robot reviews",
    "buy robot Toronto",
    "robotics Canada",
    "home robots",
    "robot buying guide",
  ],
  authors: [{ name: "Toronto Robotics" }],
  creator: "Toronto Robotics",
  metadataBase: new URL("https://torontorobotics.carapaceos.com"),
  alternates: { canonical: "https://torontorobotics.carapaceos.com" },
  openGraph: {
    title: "Toronto Robotics",
    description: "Robot news, reviews, and buying guide for Toronto.",
    url: "https://torontorobotics.carapaceos.com",
    siteName: "Toronto Robotics",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Reset `app/globals.css` to a clean Toronto Robotics base**

Replace the file entirely:

```css
@import "tailwindcss";

:root {
  --tr-red: #E63329;
  --tr-black: #0a0a0a;
  --tr-gray: #6b7280;
  --tr-light: #f9fafb;
  --font-inter: "Inter", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-inter);
  background: #ffffff;
  color: var(--tr-black);
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}
```

**Step 3: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: update layout and styles for Toronto Robotics"
```

---

## Task 5: Build Shared Components

**Files:**
- Create: `components/NavBar.tsx`
- Create: `components/Footer.tsx`
- Create: `components/ArticleCard.tsx`

**Step 1: Create `components/NavBar.tsx`**

```tsx
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Toronto <span style={{ color: "var(--tr-red)" }}>Robotics</span>
        </Link>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/news" className="hover:text-black transition-colors">News</Link>
          <Link href="/reviews" className="hover:text-black transition-colors">Reviews</Link>
          <Link href="/buy" className="hover:text-black transition-colors">Buy a Robot</Link>
          <Link href="/about" className="hover:text-black transition-colors">About</Link>
        </div>
      </div>
    </nav>
  );
}
```

**Step 2: Create `components/Footer.tsx`**

```tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16 py-8 text-sm text-gray-500">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <span>© {new Date().getFullYear()} Toronto Robotics</span>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-black">About</Link>
          <Link href="/buy" className="hover:text-black">Buy a Robot</Link>
        </div>
      </div>
    </footer>
  );
}
```

**Step 3: Create `components/ArticleCard.tsx`**

```tsx
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
```

**Step 4: Update `app/layout.tsx` to include NavBar and Footer**

Modify the body in `app/layout.tsx`:

```tsx
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// inside RootLayout return:
<html lang="en">
  <body className={`${inter.variable} antialiased`}>
    <NavBar />
    <main>{children}</main>
    <Footer />
  </body>
</html>
```

**Step 5: Commit**

```bash
git add components/ app/layout.tsx
git commit -m "feat: add NavBar, Footer, ArticleCard components"
```

---

## Task 6: Build Front Page (`/`)

**Files:**
- Modify: `app/page.tsx`

**Step 1: Replace `app/page.tsx` with the front page**

```tsx
import { db } from "../lib/db";
import { articles } from "../db/schema";
import { eq, desc, and } from "drizzle-orm";
import Link from "next/link";
import ArticleCard from "../components/ArticleCard";

export const revalidate = 3600; // revalidate every hour

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
    .where(and(eq(articles.category, "news")))
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
```

**Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build Toronto Robotics front page with hero + news grid"
```

---

## Task 7: Build News List Page (`/news`)

**Files:**
- Create: `app/news/page.tsx`

**Step 1: Create `app/news/page.tsx`**

```tsx
import { db } from "../../lib/db";
import { articles } from "../../db/schema";
import { eq, desc } from "drizzle-orm";
import ArticleCard from "../../components/ArticleCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robot News",
  description: "The latest robot news from around the world, curated daily.",
};

export const revalidate = 3600;

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
```

**Step 2: Commit**

```bash
git add app/news/page.tsx
git commit -m "feat: add /news list page"
```

---

## Task 8: Build Article Detail Page (`/news/[slug]`)

**Files:**
- Create: `app/news/[slug]/page.tsx`

**Step 1: Create `app/news/[slug]/page.tsx`**

```tsx
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

export const revalidate = 3600;

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
```

**Step 2: Commit**

```bash
git add app/news/
git commit -m "feat: add /news/[slug] article detail page"
```

---

## Task 9: Build Reviews Page (`/reviews`)

**Files:**
- Create: `app/reviews/page.tsx`

**Step 1: Create `app/reviews/page.tsx`**

```tsx
import { db } from "../../lib/db";
import { articles } from "../../db/schema";
import { eq, desc } from "drizzle-orm";
import ArticleCard from "../../components/ArticleCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robot Reviews",
  description: "In-depth robot reviews to help you make the right choice.",
};

export const revalidate = 3600;

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
```

**Step 2: Commit**

```bash
git add app/reviews/page.tsx
git commit -m "feat: add /reviews page"
```

---

## Task 10: Build Buy a Robot Page (`/buy`)

**Files:**
- Create: `app/buy/page.tsx`

**Step 1: Create `app/buy/page.tsx`**

The top 3 robot manufacturers with Toronto/Canada presence: Boston Dynamics, iRobot (home robots), and Unitree Robotics.

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy a Robot in Toronto",
  description: "How to buy a robot in Toronto — top manufacturers and where to get them in Canada.",
};

const manufacturers = [
  {
    name: "Boston Dynamics",
    description:
      "The world leader in advanced robotics. Spot and Stretch are available for business and research customers in Canada.",
    url: "https://bostondynamics.com",
    category: "Industrial / Research",
    price: "From ~$75,000 USD",
  },
  {
    name: "iRobot",
    description:
      "Home robots for everyday life. The Roomba lineup is widely available at Best Buy, Costco, and Amazon Canada.",
    url: "https://irobot.ca",
    category: "Home / Consumer",
    price: "From ~$300 CAD",
  },
  {
    name: "Unitree Robotics",
    description:
      "Affordable quadruped robots for research and developers. Ships to Canada direct. The Go2 is a popular entry-level research platform.",
    url: "https://unitree.com",
    category: "Research / Developer",
    price: "From ~$1,600 USD",
  },
];

export default function BuyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black mb-2">Buy a Robot in Toronto</h1>
      <p className="text-gray-500 mb-10">
        Whether you&apos;re a business, researcher, or just want a robot at home — here are
        the top three places to start.
      </p>

      <div className="space-y-8">
        {manufacturers.map((m, i) => (
          <a
            key={m.name}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-gray-200 rounded-xl p-6 hover:border-[var(--tr-red)] transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-white bg-[var(--tr-red)] rounded px-2 py-0.5">
                    #{i + 1}
                  </span>
                  <h2 className="text-xl font-bold group-hover:text-[var(--tr-red)] transition-colors">
                    {m.name}
                  </h2>
                </div>
                <p className="text-sm text-[var(--tr-red)] font-medium mb-2">{m.category}</p>
                <p className="text-gray-600">{m.description}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-gray-700">{m.price}</p>
                <span className="text-xs text-[var(--tr-red)] mt-1 block">Visit site →</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add app/buy/page.tsx
git commit -m "feat: add /buy page with top 3 robot manufacturers"
```

---

## Task 11: Build About Page (`/about`)

**Files:**
- Create: `app/about/page.tsx`

**Step 1: Create `app/about/page.tsx`**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Toronto Robotics.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black mb-6">About Toronto Robotics</h1>
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
        <p>
          Toronto Robotics is a daily robot news and review site for Canadians who care about
          the future of robotics — whether you&apos;re a researcher, enthusiast, or just curious
          about what&apos;s coming.
        </p>
        <p>
          Every morning, our AI editor scans the world&apos;s robot news and writes one great
          article about the most important story of the day. No filler. No aggregation. Just
          one well-written piece that matters.
        </p>
        <p>
          We also publish robot reviews and a buying guide to help Torontonians figure out
          which robot is right for them.
        </p>
        <p className="text-gray-400 text-sm pt-4">
          Built in Toronto. Powered by OpenClaw.
        </p>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add /about page"
```

---

## Task 12: Update robots.ts and sitemap.ts

**Files:**
- Modify: `app/robots.ts`
- Modify: `app/sitemap.ts`

**Step 1: Update `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://torontorobotics.carapaceos.com/sitemap.xml",
  };
}
```

**Step 2: Update `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { db } from "../lib/db";
import { articles } from "../db/schema";
import { desc } from "drizzle-orm";

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
```

**Step 3: Commit**

```bash
git add app/robots.ts app/sitemap.ts
git commit -m "feat: update robots.txt and sitemap for Toronto Robotics"
```

---

## Task 13: Local Build Verification

**Step 1: Install dependencies and build**

```bash
npm install
npm run build
```

Expected: Build completes with no errors. Warnings about missing images/favicons are OK for now.

**Step 2: Test dev server**

```bash
npm run dev
```

Visit `http://localhost:3004` — should see the Toronto Robotics front page (empty state with "Fresh robot news arriving soon.").

Visit `/news`, `/reviews`, `/buy`, `/about` — all should render without errors.

**Step 3: Commit any fixes needed, then push**

```bash
git push origin main
```

---

## Task 14: VPS Deployment Setup

**Context:** SSH into the CarapaceOS VPS at `76.13.120.97`. CarapaceOS runs on port 3000. Toronto Robotics will run on port 3004. Nginx will proxy `torontorobotics.carapaceos.com` → `localhost:3004`.

**Step 1: SSH into the VPS and set up the repo**

```bash
ssh root@76.13.120.97
cd /var/www
git clone <repo-url> toronto-robotics
cd toronto-robotics
npm install
cp .env.example .env  # or create .env with DATABASE_URL
npm run build
```

**Step 2: Install PM2 if not present**

```bash
npm install -g pm2
```

**Step 3: Start the app with PM2**

```bash
pm2 start npm --name "toronto-robotics" -- start -- --port 3004
pm2 save
pm2 startup  # follow the printed command to enable auto-start on reboot
```

**Step 4: Add Nginx virtual host**

Create `/etc/nginx/sites-available/torontorobotics`:

```nginx
server {
    listen 80;
    server_name torontorobotics.carapaceos.com;

    location / {
        proxy_pass http://localhost:3004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/torontorobotics /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

**Step 5: Add SSL with Certbot**

```bash
certbot --nginx -d torontorobotics.carapaceos.com
```

Follow prompts. Certbot will auto-configure HTTPS and renewal.

**Step 6: Verify**

Visit `https://torontorobotics.carapaceos.com` — should see the Toronto Robotics front page over HTTPS.

---

## Task 15: Create the Overseer Agent

**Files:**
- Create: `AGENTS.md` (agent instructions for this repo)

**Step 1: Create `AGENTS.md`**

```markdown
# Toronto Robotics — Agent Instructions

## Overseer Agent

The **overseer** agent manages the Toronto Robotics website content.

### Responsibilities
- Monitor the site for stale content (front page article older than 24h)
- Coordinate with OpenClaw for nightly article generation
- Add robot reviews to the database when instructed
- Update the /buy page manufacturer list when needed

### OpenClaw Integration
OpenClaw runs on `vps.carapaceos.com` and writes directly to the `articles` table in the Neon DB. The overseer monitors the DB for the latest featured article and alerts if no article has been published in the last 24 hours.

### Database Access
Use `DATABASE_URL` from environment. Schema is in `db/schema.ts`. The `articles` table is the primary content table.

### Article Schema Reference
- `slug` — URL-safe unique identifier
- `title` — Headline
- `summary` — 1-2 sentence summary for cards
- `body` — Full article body (plain text or markdown)
- `category` — `news`, `review`, or `buy-guide`
- `publishedAt` — Publication timestamp
- `sourceUrl` — Original source URL (optional)
- `isFeatured` — Set `true` for today's hero article (only one at a time)
- `imageUrl` — Hero image URL (optional)

### Deployment
- VPS: `76.13.120.97` (CarapaceOS)
- Process manager: PM2, name `toronto-robotics`
- Port: 3004
- To deploy updates: `git pull && npm run build && pm2 restart toronto-robotics`
```

**Step 2: Commit**

```bash
git add AGENTS.md
git commit -m "docs: add overseer agent instructions"
git push origin main
```

---

## Done

The Toronto Robotics site is live at `https://torontorobotics.carapaceos.com`. OpenClaw handles nightly article generation. The overseer agent has full context via `AGENTS.md`.
