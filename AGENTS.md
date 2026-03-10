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

### Content & Image Guidelines
For instructions on how to properly format and add different types of content (News, Reviews, Buying Guides, and Vendors) so that they match the premium design system, see:
**[How to add content to the site (CONTENT.md)](CONTENT.md)**

For instructions on how to safely acquire, format, and generate copyright-free imagery using Nano Banana 2 and official Press Kits, see:
**[How to make and source images (IMAGE.md)](IMAGE.md)**

### Article Schema Reference
- `slug` — URL-safe unique identifier
- `title` — Headline
- `summary` — 1-2 sentence summary for cards and article sub-headlines
- `body` — Full article body (plain text, formatted with double newlines)
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

### Image Fetcher Agent (`agent-fetcher`)
Use `agent-fetcher` to get images for articles. It handles everything: generates images via Nano Banana 2 for news/conceptual articles, finds press kit images for product reviews. See `.claude/agents/agent-fetcher.md` for full spec. Script: `scripts/generate-article-images.ts`.

### Site Structure
| Route | Purpose |
|-------|---------|
| `/` | Front page — hero article + latest news & trending lists |
| `/news` | All news articles (category=news) |
| `/news/[slug]` | Individual article (News or Review layout) |
| `/reviews` | Robot reviews (category=review) |
| `/buy` | Top robot manufacturers directory |
| `/about` | About Toronto Robotics |
