import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import sharp from "sharp";

const MODEL_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent";

const BRAND_MODIFIERS = `premium product photography, editorial style, studio lighting, soft shadows, matte finish, minimalist background, Wallpaper magazine aesthetic, highly detailed, 8k, photorealistic`;
const NEGATIVE_PROMPT = `text, watermark, logos, messy, cluttered, low quality, distortion, cartoon, 3d render, plastic, shiny reflections, generic sci-fi glow`;

interface ArticleForImage {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
}

interface ImageGenerationResult {
  slug: string;
  title: string;
  success: boolean;
  imageUrl?: string;
  error?: string;
}

function buildPrompt(article: ArticleForImage, aspectRatio: string): string {
  const { title, summary, category } = article;

  // Create context-aware prompts based on article content
  let basePrompt = "";

  if (summary.toLowerCase().includes("consumer") || summary.toLowerCase().includes("home")) {
    basePrompt = `A sleek humanoid robot in a modern living room, soft natural lighting from floor-to-ceiling windows, warm minimalist home interior, the robot gracefully interacting with home environment`;
  } else if (
    summary.toLowerCase().includes("companion") ||
    summary.toLowerCase().includes("emotional")
  ) {
    basePrompt = `A graceful, friendly-looking humanoid robot in a warm, welcoming environment, soft ambient lighting, gentle interaction pose, compassionate and approachable design, minimalist background`;
  } else if (summary.toLowerCase().includes("home automation")) {
    basePrompt = `A humanoid robot seamlessly integrated into a smart home, modern interior with minimalist aesthetic, soft teal and graphite color scheme, robot interface glowing softly, technology and comfort harmoniously blended`;
  } else if (summary.toLowerCase().includes("market") || summary.toLowerCase().includes("billion")) {
    basePrompt = `Abstract visualization of growth and innovation: floating geometric shapes representing market growth, luminous data streams, minimalist composition with soft teal accents on dark graphite background`;
  } else if (summary.toLowerCase().includes("china")) {
    basePrompt = `Multiple sleek bipedal humanoid robots in perfect synchronization, dynamic movement captured in stillness, performance pose suggesting advanced motor control, minimal background, studio lighting`;
  } else if (summary.toLowerCase().includes("physical ai")) {
    basePrompt = `Abstract representation of artificial intelligence understanding physical space: glowing neural pathways connecting to mechanical components, floating glass cubes with data flow, minimalist tech landscape`;
  } else if (summary.toLowerCase().includes("optimus")) {
    basePrompt = `A sophisticated humanoid robot with sleek black and white color scheme, standing in a sunlit minimalist space, graceful posture suggesting advanced capabilities, studio lighting with soft shadows`;
  } else if (summary.toLowerCase().includes("neo")) {
    basePrompt = `A humanoid robot designed for domestic assistance, warm and inviting presence, modern home setting with soft natural light, clean minimalist aesthetic, approachable and capable design`;
  } else if (summary.toLowerCase().includes("mobileye")) {
    basePrompt = `Advanced humanoid robot with focus on sophisticated mechanical hands, detailed articulation visible, technical elegance, minimalist environment, precision and capability emphasized`;
  } else if (summary.toLowerCase().includes("deliver")) {
    basePrompt = `Autonomous delivery robots in urban environment, navigating sidewalks, clean technical design, minimalist modern cityscape background, soft ambient lighting`;
  } else {
    basePrompt = `A modern humanoid robot in a minimalist, professional setting, advanced technology design showcasing state-of-the-art robotics engineering, studio lighting`;
  }

  const fullPrompt = `${basePrompt}, ${BRAND_MODIFIERS} --ar ${aspectRatio}`;
  return fullPrompt;
}

async function generateImageWithGemini(prompt: string): Promise<string | null> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY not set");
  }

  try {
    const response = await fetch(MODEL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status}`, errorText);
      return null;
    }

    const payload = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{
            inlineData?: {
              mimeType?: string;
              data?: string;
            };
          }>;
        };
      }>;
    };

    const inlineData = payload.candidates?.[0]?.content?.parts?.find(
      (part) => part.inlineData
    )?.inlineData;
    const base64 = inlineData?.data;

    if (!base64) {
      console.error("No image data in response");
      return null;
    }

    // Convert base64 to data URL
    const imageDataUrl = `data:image/jpeg;base64,${base64}`;
    return imageDataUrl;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
}

async function generateImagesForArticles(
  slugs?: string[]
): Promise<ImageGenerationResult[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql, { schema });

    // Fetch articles
    let articles: ArticleForImage[];
    if (slugs && slugs.length > 0) {
      articles = await db
        .select()
        .from(schema.articles)
        .where(eq(schema.articles.category, "news"));
      articles = articles.filter((a) => slugs.includes(a.slug));
    } else {
      articles = await db
        .select()
        .from(schema.articles)
        .where(eq(schema.articles.category, "news"));
    }

    console.log(`\n🎨 Generating images for ${articles.length} articles...\n`);

    const results: ImageGenerationResult[] = [];

    for (const article of articles) {
      try {
        // Use 21:9 for news articles (hero image)
        const prompt = buildPrompt(article, "21:9");

        console.log(`⏳ Generating image for: ${article.title}`);
        console.log(`   Prompt: ${prompt.substring(0, 80)}...`);

        const imageUrl = await generateImageWithGemini(prompt);

        if (imageUrl) {
          // Update database with image URL
          await db
            .update(schema.articles)
            .set({ imageUrl })
            .where(eq(schema.articles.slug, article.slug));

          results.push({
            slug: article.slug,
            title: article.title,
            success: true,
            imageUrl,
          });
          console.log(`✅ Success: ${article.title}`);
        } else {
          results.push({
            slug: article.slug,
            title: article.title,
            success: false,
            error: "Failed to generate image",
          });
          console.log(`❌ Failed: ${article.title}`);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        results.push({
          slug: article.slug,
          title: article.title,
          success: false,
          error: errorMsg,
        });
        console.log(`❌ Error: ${article.title} - ${errorMsg}`);
      }

      // Small delay between API calls to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Print summary
    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    console.log(`\n📊 Results:`);
    console.log(`   ✅ Successful: ${successful}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   📁 Total: ${results.length}\n`);

    return results;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Main execution
const args = process.argv.slice(2);
const slugsArg = args.find((arg) => arg.startsWith("--slugs="));
const slugs = slugsArg ? slugsArg.replace("--slugs=", "").split(",") : undefined;

generateImagesForArticles(slugs).catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
