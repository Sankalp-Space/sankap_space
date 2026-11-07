---
name: Sankalp Shrivastav
description: A full-stack developer's story, hand-painted over a real flight through the solar system.
colors:
  space: "#020308"
  ink: "#f2f0ea"
  ink-dim: "#b9bcc7"
  ink-faint: "#858a9a"
  flare: "#ffb36b"
  signal: "#59e3a7"
  hairline: "rgb(255 255 255 / 0.12)"
  hairline-strong: "rgb(255 255 255 / 0.24)"
typography:
  display:
    fontFamily: "Permanent Marker, Segoe Print, cursive"
    fontSize: "clamp(3.6rem, 10.5vw, 9.5rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Permanent Marker, Segoe Print, cursive"
    fontSize: "clamp(2.8rem, 6vw, 5.4rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "0.005em"
  title:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist Mono Variable, ui-monospace, monospace"
    fontSize: "11.5px"
    fontWeight: 400
    letterSpacing: "0.08em"
  brush-aside:
    fontFamily: "Permanent Marker, Segoe Print, cursive"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.375
rounded:
  sticker: "8px"
  frame: "12px"
  sheet: "16px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  gutter: "clamp(1.25rem, 6vw, 7rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.space}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.3rem"
  button-primary-hover:
    backgroundColor: "{colors.flare}"
    textColor: "{colors.space}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.78rem 1.2rem"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-dim}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  tab-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.space}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  chip-stack:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  chip-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  sticker:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.space}"
    rounded: "{rounded.sticker}"
    padding: "0.38rem 0.75rem"
  sticker-alt:
    backgroundColor: "{colors.flare}"
    textColor: "{colors.space}"
    rounded: "{rounded.sticker}"
    padding: "0.38rem 0.75rem"
  signal-chip:
    backgroundColor: "rgb(2 3 8 / 0.55)"
    textColor: "{colors.ink-dim}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.9rem 0.45rem 0.7rem"
---

# Design System: Sankalp Shrivastav

## Overview

**Creative North Star: "The Hand-Painted Flight Log"**

The page is a real flight through the solar system, and the story is painted directly onto the window. Near-black space carries a live WebGL scene (NASA-derived planet maps lit by one sun, a real Milky Way, a drifting astronaut), and every word sits straight on that space. Legibility comes from a directional darkening that falls off toward the planet, never from a box, card or glass panel. One body per chapter; the visitor's scroll is the camera's burn from one world to the next.

Two voices share the frame. Permanent Marker is the human one: huge, loaded with paint, revealing left to right like a single brush stroke, with an amber swash dragged under the biggest lines. Geist and Geist Mono are the instrument: calm body copy, uppercase telemetry labels, hairline rows. A layer of playful marks (rotated stickers on the name, a live signal chip with breathing bars, a trailing amber cursor ring, constellations of brand-logo stars) adds Gen-Z energy without breaking the realism, because each of them behaves like light or like a sticker on a visor, not like UI furniture.

Density is low and cinematic. Each chapter's content is budgeted to fit one desktop viewport on its own side of the screen, alternating left and right so the planet always has the other half.

**Key Characteristics:**
- Text sits directly on space over a side-falloff scrim; no boxed panels.
- One accent: sunlight amber. Signal green means "live" and nothing else.
- Brush display type at poster scale; mono uppercase labels as telemetry.
- Light pill as the one primary action per view; hairline outline for the rest.
- Motion is the journey: paint-in headlines, drawn swashes and lines, twinkling stars, a single ease-out curve.

## Colors

A night-sky palette: warm bone ink on near-black space, lit by one amber sun, with a green status light reserved for "live".

### Primary
- **Sunlight Amber** (flare): The only accent. Brush swashes under headlines, the active-nav underline, the chapter progress ticks, link and button hover, the tab progress bar, light pulses running along constellation lines, the cursor ring, focus outlines, text selection, and small brush asides (group names, the fun-fact quote). It is light, so it appears as strokes, edges and glints, rarely as a fill; the one fill exception is the second sticker and the primary pill on hover.

### Tertiary
- **Signal Green** (signal): Live status only. The signal-bars in the hero chip, the "Live" pulse dot on shipped missions, and the glowing current entry in the flight log. Never decorative, never a second accent.

### Neutral
- **Deep Space** (space): Page background, theme colour, scrim base (as `rgb(2 3 8 / 0.55–0.94)`), text on light pills and stickers.
- **Bone Ink** (ink): Headlines, primary text, the primary pill and sticker fill. Warm, never pure white.
- **Starlight Grey** (ink-dim): Body paragraphs and secondary text (11.4:1 on space).
- **Faint Telemetry** (ink-faint): Mono labels, inactive nav, handles, footer only (5.9:1 on space); never body copy.
- **Hairline** (hairline): Row dividers, fact-table borders, mobile-menu rule lines.
- **Strong Hairline** (hairline-strong): Pill outlines, chip outlines, the flight-log spine, screenshot frames.

### Named Rules
**The One Sun Rule.** Amber is the only accent hue in the interface. Brand colours from skill logos appear only inside a hovered skill star; planet atmospheres belong to the 3D scene, not the UI.

**The Live Light Rule.** Signal green marks something that is live or current right now. If it is not live, it is not green.

## Typography

**Display Font:** Permanent Marker (with Segoe Print, cursive)
**Body Font:** Geist Variable (with system-ui, sans-serif)
**Label/Mono Font:** Geist Mono Variable (with ui-monospace, monospace)

**Character:** A hand-painted marker shouting over a precise grotesk and a flight-computer mono. The brush is the person; Geist is the engineer; the contrast is the brand. All three are self-hosted via @fontsource.

### Hierarchy
- **Display** (400, clamp(3.6rem, 10.5vw, 9.5rem), 0.98): The name on the launch view and the closing "Let's build." line (to 8.5rem). Balanced wrap, soft dark text-shadow halo (`0 2px 30px rgb(2 3 8 / 0.55)`) so it reads over stars.
- **Headline** (400, clamp(2.8rem, 6vw, 5.4rem), 0.98): Chapter and mission titles. Section-opening titles may run larger (Missions intro to 7.4rem); dense chapters smaller (Toolkit to 4.8rem).
- **Title** (Geist 500, clamp(1.3rem, 2.2vw, 1.75rem), tight tracking): The role line and mission summaries (clamp(1.15rem, 1.6vw, 1.4rem)); flight-log entries at 18px.
- **Body** (Geist 400, 17px, 1.6): Paragraphs in ink-dim, capped at 30–36rem.
- **Body small** (Geist 400, 15–16px): Mission details, log notes, education lines. Buttons and chips use 13–15px.
- **Label** (Geist Mono, 11.5px, 0.08em, uppercase): Telemetry: chapter readout, location/timezone, fact keys, list captions, status lines. Tabular numerals for dates.
- **Brush aside** (Permanent Marker, 19–20px, amber): A short painted note inside running text (constellation name, the fun-fact quote).

### Named Rules
**The Paint-In Rule.** Every brush headline reveals left to right with a clip-path sweep and a 14px drift (1.25s, ease-out), as one loaded stroke. Body copy never paints; it rises.

**The Brush Is For Voices Rule.** Permanent Marker is for headlines, the wordmark, mobile-menu chapter links and short asides. Never for paragraphs, labels, buttons or data.

## Layout

A full-bleed stage: the WebGL canvas fills the viewport behind everything, and each chapter is a section of 85–120svh that holds one content column on one side. Sections alternate sides (`data-side` 1 = left, -1 = right) so the visited planet takes the opposite half. Inline padding is a fluid gutter (clamp(1.25rem, 6vw, 7rem)). Content columns are capped between 38rem and 52rem; paragraphs inside at 30–36rem.

Vertical rhythm inside a column is a short fixed stack: headline, then 16–24px to the lead, 20–32px to the next group, 12px between sibling buttons and 6–8px between chips. Each chapter's content is budgeted to fit within one desktop viewport.

The fixed header (wordmark left, chapter readout centred from 1024px, chapter links + Résumé pill right from 768px) sits over a top fade from solid space to transparent. Below 768px every chapter stacks to the bottom of the screen: content is pushed down by 48svh of top padding, the scrim turns vertical (transparent at 30%, 0.88 at 62%), and the planet stays visible above the text.

## Elevation & Depth

Depth belongs to the scene: real lighting on real planet maps, a parallax star field, the camera's orbital arc. The interface itself is flat and sits on a scrim, a linear falloff of darkness behind the text column (0.82 to 0.7 to transparent at 66%, widened to 72% for dense chapters). There are no raised cards. Soft drop shadows appear only on objects that physically float in that space: skill-star cores, stickers and mission screenshot frames.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 10px 26px -10px rgb(0 0 0 / 0.9)`): Skill-star cores and stickers; a tight dark pool under a small object.
- **Frame drop** (`box-shadow: 0 30px 60px -30px rgb(0 0 0 / 0.9)`): Mission screenshot frames.
- **Brush halo** (`text-shadow: 0 2px 30px rgb(2 3 8 / 0.55)`): All brush type, so paint reads over bright stars.
- **Light-source glow** (`0 0 12px var(--signal)`, `drop-shadow(0 0 4px var(--flare))`, brand glow `0 0 28px -2px` at 55%): Only on things that emit light: the current log dot, constellation pulses, a hovered star.

### Named Rules
**The Scrim Not Box Rule.** Legibility comes from a directional gradient behind the column, never from a container with a background and border.

**The Only Light Glows Rule.** A glow is reserved for something that is a light: a star, a pulse, a live status. Buttons, chips and text never glow.

## Shapes

Round is the default: every interactive control is a full pill (999px), dots and star cores are circles, and the cursor is a ring. Small corners appear only on physical-object metaphors: stickers (8px), screenshot frames (12px) and the mobile menu sheet (16px). Hairline rules (1px) do the structural work: fact rows, social rows, the flight-log spine. The one recurring painted form is the amber swash, a 5px round-capped stroke under display lines.

## Components

### Buttons
Confident and light-filled; one bright pill per view, everything else an outline.
- **Shape:** Full pill (999px).
- **Primary:** Bone ink fill, space text, 560 weight, 15px, padding 0.8rem 1.3rem, optional trailing up-right arrow. One per view (résumé, live site, send email). In the nav it compacts to 14px with 8px vertical padding.
- **Hover / Focus:** Fill turns amber and lifts 2px (0.35s ease-out); active returns to 0. Focus is a 2px amber outline at 4px offset.
- **Quiet:** Transparent, strong-hairline border, ink text, 500 weight. Hover strengthens the border to ink and adds a 6% white wash.

### Chips
- **Stack chip:** Strong-hairline outline, 13px ink text, 4px 10px. Lists of technologies and certifications; static.
- **Link chip:** Same outline at 14px with a faint note and a small arrow; hover turns border and text amber.
- **Copy chip:** Outline in ink-dim that swaps a copy icon for a check and reads "Copied" for 2.2s.

### Tabs (Toolkit)
Pill tabs; active is a solid ink pill with space text, inactive is an outline in ink-dim. While auto-cycling (every 6.5s, paused on hover, out of view, after a click or under reduced motion) the active tab carries a 2px amber progress bar along its base, like a stories timeline.

### Signal Chip
A translucent space pill (0.55) with a strong-hairline border holding three 3px green bars that breathe in sequence (1.4s, 0.2s stagger), then a green status word and an ink-dim line. Lives under the hero actions.

### Stickers
Bone-ink tags (8px corners, 600 weight, 13px) with a 2px inner white rim and a float shadow, rotated -7, 5 and -3 degrees and slapped onto the hero name with a springy drop (stiffness 420, damping 18). The second is amber. Hover straightens and scales to 1.08. Facts only, three at most, hero only.

### Navigation
Brush wordmark ("Sankalp" with an amber full stop) at 22px. Chapter links are 14px Geist in ink-faint, ink on hover; the current chapter is ink with a 1px amber underline that springs between links (stiffness 380, damping 34). Centre telemetry shows the current body and chapter in mono label with a row of 12px ticks that fill amber as you travel. Mobile: a "Menu" outline pill opens a 16px-corner sheet at 0.94 space opacity listing chapters in brush type at 2rem, with the résumé pill at the base; Escape closes it.

### Skill Star (signature)
A 50px circle with a top-left radial sheen, a strong hairline and a float shadow, holding a 20px simple-icons brand mark in ink. Behind it a brand-tinted halo twinkles (3.2s, staggered). On hover the mark and border take the brand colour, the core scales 1.14 with a brand glow, and a four-point flare rotates in 45 degrees. Stars sit on hand-placed asterisms joined by 1px 30%-white lines that draw in, with short amber light pulses running along each line; faint dust motes breathe behind. A 13px label sits under each star.

### Hairline Rows
Facts and socials are open rows split by 1px hairlines: a mono label key above or beside an ink value; socials pair the label with an ink-faint handle and arrow that turn amber on hover. The flight log is a vertical strong-hairline spine with 9px circular nodes; the current entry's node is solid signal green with a glow, past ones are hollow.

### Cursor Ring
A 34px amber ring (70% opacity, screen blend) that trails the pointer with easing and swells to 58px with a 12% amber wash over anything clickable. Fine pointers only; hidden under reduced motion.

## Do's and Don'ts

### Do:
- **Do** set every text column directly on space over the side-falloff scrim (0.82 / 0.7 / 0 at 66%), alternating sides chapter by chapter.
- **Do** keep amber (flare) the only interface accent; use it as strokes, underlines, edges and hover states.
- **Do** reserve signal green for live or current status.
- **Do** paint brush headlines in with the left-to-right clip reveal and let body copy rise 18px after it, on the single ease-out curve `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Do** keep one light pill per view and make every other action an outline pill.
- **Do** carry data as hairline rows with mono uppercase labels, not as cards.
- **Do** give every looping animation (twinkle, dust, bars, scroll cue, pulses, auto-cycle) a still state under `prefers-reduced-motion`, and keep the page complete without it.
- **Do** budget each chapter's content to fit one desktop viewport.

### Don't:
- **Don't** put text in boxed panels, cards or glass surfaces; the only surface allowed is the mobile menu sheet.
- **Don't** introduce a second accent hue in the interface or use brand logo colours outside a hovered skill star.
- **Don't** glow buttons, chips or type; glows belong to stars, pulses and live status.
- **Don't** set paragraphs, labels or buttons in Permanent Marker.
- **Don't** use pure white for text; ink is warm bone.
- **Don't** use ink-faint for running body copy; it is for labels only.
- **Don't** render planets as flat, cartoon or toy illustrations; bodies are real lit maps in the WebGL scene.
