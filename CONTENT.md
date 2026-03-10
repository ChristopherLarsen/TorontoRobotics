# Toronto Robotics — Content Guidelines

This document outlines the rules and schemas for AI agents (like OpenClaw and the Overseer) when adding new content to the Toronto Robotics website. 

Following these guidelines ensures that all generated content correctly inherits the premium, editorial design system (inspired by Wirecutter, Wallpaper*, and Design Milk) without breaking the layout.

---

## 1. Content Categories

The `articles` table supports distinct page layouts defined by the `category` column:

- **`news`**: Uses a **Wallpaper* / Dezeen**-inspired layout. Features large hero images, calm spacing, and a strong editorial body format.
- **`review`**: Uses a **Wirecutter**-inspired layout. Perfect for deep dives, featuring a sticky "In This Guide" sidebar, clear verdicts, and rigorous testing notes.
- **`buy-guide`**: Shares the review layout but is tailored for multi-product comparisons or category overviews.

---

## 2. Field Mapping & Schema

When inserting a new record into the `articles` table, use the following formatting guidelines:

| Field | Description & Formatting |
|-------|--------------------------|
| `slug` | URL-safe string (e.g., `irobot-roomba-j7-review`). Must be unique. |
| `title` | **News:** Catchy, authoritative headline (e.g., "Boston Dynamics Unveils Next-Gen Atlas").<br>**Review:** Decisive verdict (e.g., "The Roomba j7+ is the Best Robot Vacuum for Pet Owners"). |
| `summary` | **Critical for design.** This field acts as the *dek* (sub-headline) in the article view and the teaser text in the card view. It should be 1-2 punchy sentences summarizing the core takeaway. |
| `category` | Must be exactly `news`, `review`, or `buy-guide`. |
| `imageUrl` | Highly recommended. Provide a high-quality, landscape image URL. If absent, a stylish placeholder block will be automatically rendered. |
| `isFeatured` | Set to `true` if this should be the massive cinematic hero article on the homepage. *(Note: Ensure previous featured articles are toggled to false if necessary).* |
| `sourceUrl` | *(Optional)* Provide if curating news from another site. Automatically generates a premium "Original Source" CTA button. |

---

## 3. Formatting the `body` Text

The frontend renders the `body` field within a strict, premium typography container. 

- **Plain Text Structure:** The site uses `whitespace-pre-wrap`, meaning standard double-newlines (`\n\n`) will perfectly create beautifully spaced paragraphs.
- **Tone & Voice:** Emulate high-end product magazines. Do not use generic, spammy affiliate language. Be decisive, authoritative, and restrained.
- **Structure for Reviews:** Since the design includes a sticky "In This Guide" sidebar with sections like "Our Verdict", "Who It's For", "How We Tested", "Key Specs", and "Alternatives", ensure your `body` text naturally addresses these areas sequentially using clear, capitalized text blocks or paragraphs to separate the thoughts.

---

## 4. Vendor / Manufacturer Updates (The Buy Page)

The "Buy a Robot in Toronto" directory page (`/buy`) is handled differently than standard articles.

- The `/buy` page currently loads a hardcoded list of premium manufacturers. 
- To add or modify vendors, agents should use their code editing tools to edit the `manufacturers` array directly inside `app/buy/page.tsx` and redeploy. 
- Maintain the existing data structure: 
  - `name`
  - `description`
  - `url`
  - `category`
  - `price`
