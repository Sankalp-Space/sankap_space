# TODO - Full Screen Single Page Website with Particle Background Hero Section

## Tasks

1. Update components/main/Hero.tsx
   - Set full viewport height (100vh).
   - Position HeroContent to enable particle background layering.

2. Update components/sub/HeroContent.tsx
   - Mark as client component ("use client";).
   - Render Particles component with absolute/fixed positioning behind UI content.
   - Add UI overlay content: heading, subheading, call-to-action button.
   - Style content for visibility over particle background.

3. Update app/page.tsx
   - Structure page with multiple full-screen sections.
   - Add Hero section as the first section.
   - Add sample placeholder sections below for scrollable full-page effect.

4. Ensure CSS layering using TailwindCSS utilities (z-index, absolute/fixed, flexbox).

5. Test the complete flow and layout visually.

---

Proceed to stepwise implementation after this file creation.
