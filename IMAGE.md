# Toronto Robotics — Image Generation & Sourcing Strategy

To maintain a premium, editorial aesthetic (matching our *Wallpaper\**, *Dezeen*, and *Design Milk* benchmarks) while strictly avoiding copyright lawsuits, all AI agents must follow this dual-track strategy for acquiring images.

---

## 1. The Core Copyright Rule
**NEVER scrape or link to random images from Google Images or unauthorized third-party blogs.** 

As a commercial product review magazine, we must rely entirely on two legally safe sources:
1.  **Official Manufacturer Press Kits:** For reviewing specific, real-world products.
2.  **Nano Banana 2:** For generating conceptual art, headers, news backgrounds, and abstract technology visuals.

---

## 2. Ideal Image Sizes & Aspect Ratios
The frontend design system requires specific aspect ratios to prevent layout shifting and clipping. Always crop, scale, or prompt for these specific dimensions before uploading or linking an image:

| Use Case | Aspect Ratio | Target Dimensions | Where it's used |
| :--- | :--- | :--- | :--- |
| **Featured Hero** | `21:9` | **1920x822 px** | Homepage featured article, News article headers |
| **Standard Image** | `4:3` | **1200x900 px** | Standard article cards, Review/Buy-Guide headers |
| **Compact / Thumbnail** | `1:1` | **512x512 px** | Trending lists, compact article cards |

*Note: Always compress generated images (e.g., using WebP or optimized JPEG) to ensure lightning-fast page loads.*

---

## 3. Sourcing Strategy A: Official Press Kits (For Reviews)
When writing a review or buying guide for a specific product (e.g., *Roborock S8*, *Unitree G1*), AI generation is often unreliable because it hallucinates product details. 

**Industry Standard Practice:**
1.  Navigate to the official manufacturer's website.
2.  Look in the footer for a link titled **"Press"**, **"Media Room"**, **"Newsroom"**, or **"Brand Assets"**.
3.  Download official, high-resolution lifestyle or studio shots provided directly by the company for media use. 
4.  These images are explicitly licensed for editorial use by journalists and reviewers. 

---

## 4. Sourcing Strategy B: Nano Banana 2 (For News & Concepts)
When writing about abstract robotics news, industry trends, AI software updates, or general categories, use **Nano Banana 2** to generate completely original, copyright-free imagery.

### The "Premium Magazine" Prompt Architecture
To ensure Nano Banana 2 generates images that match our brand (minimalist, luxurious, clean), every prompt must be structured with the following core modifiers:

**Required Base Modifiers:**
> `premium product photography, editorial style, studio lighting, soft shadows, matte finish, minimalist background, Wallpaper magazine aesthetic, highly detailed, 8k, photorealistic`

**Negative Prompt (Things to actively suppress):**
> `text, watermark, logos, messy, cluttered, low quality, distortion, cartoon, 3d render, plastic, shiny reflections, generic sci-fi glow`

### Example Nano Banana 2 Prompts by Ratio

**1. Ultra-Wide Hero Image (21:9 - Homepage/News)**
> **Prompt:** `A sleek, modern bipedal humanoid robot standing in an empty, sunlit concrete loft, premium product photography, editorial style, studio lighting, soft shadows, matte finish, minimalist background, Wallpaper magazine aesthetic, highly detailed, 8k, photorealistic --ar 21:9`

**2. Standard Editorial Image (4:3 - Reviews/Cards)**
> **Prompt:** `A close-up macro shot of a robot's mechanical hand holding a delicate object, brushed aluminum and matte white plastics, premium product photography, editorial style, studio lighting, soft shadows, matte finish, minimalist background, Wallpaper magazine aesthetic, highly detailed, 8k, photorealistic --ar 4:3`

**3. Concept Technology Image (4:3 - Software/AI News)**
> **Prompt:** `An abstract representation of artificial intelligence processing data, floating glowing glass cubes over a dark graphite surface, premium product photography, editorial style, studio lighting, soft shadows, matte finish, minimalist background, Wallpaper magazine aesthetic, highly detailed, 8k, photorealistic --ar 4:3`

### Nano Banana 2 Safety Rules
1.  **Do NOT prompt for real trademarks:** E.g., Do not prompt for `"A Tesla Optimus robot with the Tesla logo"`. Instead, prompt for `"A sleek bipedal humanoid robot, black and white color scheme"`.
2.  **Avoid human faces:** To avoid uncanny valley effects in robotics news, focus the prompts on the robots, hardware, and environments. If humans are needed, prompt for `"silhouette"` or `"shot from behind"`. 
3.  **Ensure Brand Colors:** When possible, inject our brand colors into the environment prompt (e.g., `"soft graphite environment with a subtle cool electric teal ambient light"`).