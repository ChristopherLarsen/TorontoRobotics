/**
 * migrate-images-to-files.ts
 *
 * Reads all articles with base64 data URI images from the database,
 * writes them as optimized JPEG files to public/images/articles/,
 * and updates the database with the static file paths.
 *
 * Usage: npx tsx scripts/migrate-images-to-files.ts
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = path.join(__dirname, "..", "public", "images", "articles");

async function migrate() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  const allArticles = await db.select().from(schema.articles);
  const base64Articles = allArticles.filter(
    (a) => a.imageUrl && a.imageUrl.startsWith("data:")
  );

  console.log(
    `Found ${base64Articles.length} articles with base64 images (out of ${allArticles.length} total)\n`
  );

  let converted = 0;
  let failed = 0;

  for (const article of base64Articles) {
    try {
      const dataUri = article.imageUrl!;
      // Extract base64 data after the comma
      const commaIdx = dataUri.indexOf(",");
      if (commaIdx === -1) {
        console.log(`  ⚠️  Skipping ${article.slug}: malformed data URI`);
        failed++;
        continue;
      }
      const base64Data = dataUri.substring(commaIdx + 1);
      const buffer = Buffer.from(base64Data, "base64");

      // Optimize with sharp: resize to max 1600px wide, quality 80 JPEG
      const optimized = await sharp(buffer)
        .resize({ width: 1600, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();

      const filename = `${article.slug}.jpg`;
      const filePath = path.join(OUTPUT_DIR, filename);
      fs.writeFileSync(filePath, optimized);

      const publicUrl = `/images/articles/${filename}`;

      // Update database
      await db
        .update(schema.articles)
        .set({ imageUrl: publicUrl })
        .where(eq(schema.articles.slug, article.slug));

      const originalKB = Math.round(buffer.length / 1024);
      const optimizedKB = Math.round(optimized.length / 1024);
      console.log(
        `  ✅ ${article.slug}: ${originalKB}KB → ${optimizedKB}KB (${filename})`
      );
      converted++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`  ❌ ${article.slug}: ${msg}`);
      failed++;
    }
  }

  console.log(`\n📊 Migration complete:`);
  console.log(`   ✅ Converted: ${converted}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📁 Output: ${OUTPUT_DIR}\n`);
}

migrate().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
