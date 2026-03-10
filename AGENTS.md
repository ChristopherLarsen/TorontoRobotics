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
- Port: 3002
- To deploy updates: `git pull && npm run build && pm2 restart toronto-robotics`

### Site Structure
| Route | Purpose |
|-------|---------|
| `/` | Front page — hero article + 6 latest news |
| `/news` | All news articles (category=news) |
| `/news/[slug]` | Individual article |
| `/reviews` | Robot reviews (category=review) |
| `/buy` | Top 3 robot manufacturers |
| `/about` | About Toronto Robotics |
