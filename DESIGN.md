# Design System Specification: High-End Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Curator."** 

This system moves away from the static, boxy layouts of traditional SaaS and instead embraces the fluidity of high-end digital journalism. It balances the high-octane energy of a bold, vibrant orange with the grounded stability of charcoal and expansive white space. We are not building a dashboard; we are crafting an experience that feels curated, intentional, and premium.

To achieve this, we break the "template" look by utilizing:
*   **Intentional Asymmetry:** Alignment that favors rhythmic white space over perfect centeredness.
*   **Tonal Depth:** Replacing harsh lines with structural layering.
*   **Typographic Authority:** Using the Manrope scale to create clear, unshakeable hierarchy.

---

## 2. Colors & Atmospheric Tone
The palette is centered on a sophisticated citrus core, supported by a professional architectural foundation.

### The Color Tokens
*   **Primary Tier:** The soul of the brand. Use `primary` (#9D4300) for high-impact actions and `primary_container` (#F97316) for energetic highlights and hero elements.
*   **Neutral Tier:** Our "Clean White" is defined by `surface` (#FCF9F8) and `surface_container_lowest` (#FFFFFF). Our "Deep Charcoal" is anchored by `on_background` (#1C1B1B).
*   **Tertiary Tier:** `tertiary` (#006398) provides a professional counterpoint to the orange, used sparingly for specific functional callouts or specialized data.

### Visual Rules
*   **The "No-Line" Rule:** We do not use 1px solid borders to define sections. Boundaries must be defined solely through background color shifts. For example, a `surface_container_low` section sitting on a `surface` background provides all the separation needed.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers of fine paper. Use the `surface_container` tiers (Lowest to Highest) to create "nested" depth. An inner card should use a slightly higher tier (e.g., `surface_container_high`) than its parent container to define importance.
*   **The "Glass & Gradient" Rule:** To avoid a flat, "out-of-the-box" feel, use Glassmorphism for floating navigation or overlays. Apply a semi-transparent `surface` color with a 20px backdrop-blur. 
*   **Signature Textures:** For hero backgrounds and main CTAs, use a subtle linear gradient transitioning from `primary` (#9D4300) to `primary_container` (#F97316) at a 135-degree angle. This adds a "soul" and professional polish that flat fills lack.

---

## 3. Typography
We use **Manrope** exclusively. It is a modern geometric sans-serif that maintains a professional editorial tone while appearing energetic and approachable.

*   **Display (lg/md/sm):** These are our "Editorial Statements." Use them for hero headers. They should be tracked slightly tighter (-2%) to feel cohesive and authoritative.
*   **Headline & Title:** Use these for section markers. The gap between `headline-lg` (2rem) and `body-lg` (1rem) creates the dramatic "Editorial" contrast we require.
*   **Body (lg/md/sm):** Set with generous line height (1.5x) to ensure maximum readability against the clean white backgrounds.
*   **Labels:** Reserved for functional UI, metadata, and overlines. Always in uppercase when used as an overline for a "Modern Professional" feel.

---

## 4. Elevation & Depth
In this system, depth is a result of light and layering, not structural scaffolding.

*   **The Layering Principle:** Achieve depth by "stacking" tiers. Place a `surface_container_lowest` card on a `surface_container_low` background. This creates a soft, natural lift.
*   **Ambient Shadows:** If a floating effect is required (e.g., a dropdown), use extra-diffused shadows. Set blur values to 30px–50px and opacity to 4%–8%. The shadow color must be a tinted version of `on_surface` (#1C1B1B), never pure black.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, it must be a "Ghost Border": use the `outline_variant` token at 15% opacity. High-contrast, 100% opaque borders are strictly forbidden.
*   **Glassmorphism:** Use `surface` at 60-80% opacity with a `backdrop-filter: blur(16px)`. This integrates the component into the environment rather than making it look "pasted on."

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` background with `on_primary` text. Use `xl` (0.75rem) roundedness. No borders.
*   **Secondary:** `secondary_container` background. Provides a sophisticated, softer alternative to the primary orange.
*   **Tertiary:** No background. Use `primary` text. Use for low-emphasis actions.

### Cards & Lists
*   **Rule:** Forbid the use of divider lines.
*   **Execution:** Separate list items with vertical white space (use the 16px or 24px increments). For cards, use the "No-Line" Rule—distinguish the card from the background using `surface_container_low` vs `surface`.

### Input Fields
*   **Style:** Minimalist. Use a `surface_container_highest` background with a `bottom-only` border using the "Ghost Border" rule. 
*   **Focus State:** The bottom border transitions to `primary` (#9D4300) with a 2px weight.

### Chips
*   **Selection:** Use `primary_fixed` for the background and `on_primary_fixed` for text. This creates a high-end, tonal look that is easier on the eyes than high-contrast buttons.

### Additional Signature Component: The Editorial Pull-Quote
*   A large-scale typographic component using `display-sm` in `primary` color, flanked by a 4px vertical accent bar of `primary_container`. No container box—let the type breathe.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** embrace white space. If a layout feels "crowded," double the padding.
*   **Do** use asymmetrical margins (e.g., a wider left margin than right) to mimic high-end magazine layouts.
*   **Do** use `primary_container` (#F97316) to guide the eye to the most important "Kinetic" element on the page.

### Don’t:
*   **Don’t** use black (#000000). Always use `on_background` (#1C1B1B) for text to maintain a sophisticated charcoal depth.
*   **Don’t** use standard drop shadows. If it looks like a default shadow, it’s wrong. It should look like a soft glow or a natural lift.
*   **Don’t** use 1px dividers. Use a change in `surface_container` color or 32px+ of white space instead.
*   **Don’t** use the `error` color for anything other than critical system failures. For energetic "warnings," use a tonal shift of the primary orange.