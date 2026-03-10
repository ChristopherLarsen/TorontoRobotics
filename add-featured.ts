import "dotenv/config";
import { db } from "./lib/db";
import { articles } from "./db/schema";
import { eq } from "drizzle-orm";

async function main() {
  // First, unset any existing featured articles
  await db.update(articles).set({ isFeatured: false }).where(eq(articles.isFeatured, true));

  // Insert the new featured article
  await db.insert(articles).values({
    slug: "chinas-dancing-humanoids-more-than-a-party-trick",
    title: "The Choreography of Tomorrow: Why China's Dancing Humanoids Are More Than a Party Trick",
    summary: "A synchronized display of bipedal agility signals a massive leap in commercial robotics. Here is why you should take these rhythmic machines seriously.",
    body: `When a fleet of humanoid robots takes the stage in perfect synchronization, the immediate reaction is often a mix of amusement and skepticism. It feels like a futuristic parlor trick—a highly orchestrated stunt designed for viral consumption rather than practical utility. However, beneath the polished exterior of these viral videos lies a profound demonstration of the current state-of-the-art in robotics engineering.

To make a bipedal machine walk across a flat laboratory floor is a triumph of physics. To make a dozen of them dance in unison requires a staggering confluence of dynamic balance, low-latency motor control, and real-time spatial awareness.

The fluidity required to execute a dance routine means that a robot's actuators must possess zero-backlash precision and immediate torque responsiveness. Every pivot, dip, and arm extension shifts the machine's center of gravity in unpredictable ways. The onboard AI must calculate these micro-adjustments hundreds of times per second, preventing a catastrophic tumble while maintaining exact rhythmic synchronization with its peers.

For the consumer market, these performances are a vital proof of concept. The same processing architecture that allows a humanoid to maintain its balance during a complex dance sequence is what will eventually allow it to carry a tray of glassware across a cluttered living room, or safely yield when bumped by a running child. 

The dancing humanoids we see today are not just entertainers; they are the agile, dynamically stable ancestors of the domestic assistants that will inhabit our homes tomorrow. The choreography is merely the ultimate stress test.`,
    category: "news",
    publishedAt: new Date(),
    sourceUrl: "https://www.youtube.com/watch?v=R6T-Ea5CfRE",
    isFeatured: true,
    // Note: Using a high-quality placeholder image formatted for 21:9 hero layout. 
    // Nano Banana 2 prompt used for concept generation:
    // "A sleek, modern bipedal humanoid robot standing in an empty, sunlit concrete loft, executing a graceful martial arts pose, premium product photography, editorial style, studio lighting, soft shadows, matte finish, minimalist background, Wallpaper magazine aesthetic, highly detailed, 8k, photorealistic --ar 21:9"
    imageUrl: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?q=80&w=1920&h=822&auto=format&fit=crop"
  });

  console.log("Successfully added the featured article.");
}

main().catch(console.error);
