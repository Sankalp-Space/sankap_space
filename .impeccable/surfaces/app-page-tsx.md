---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Surface: home (single-page portfolio)

Mode: Experience. Audience: recruiters worldwide (30–90s scan, often mobile), then peers. Job: know role, stack, real shipped work, and how to contact; remember the site. Constraints: all content from lib/data.ts; unconfirmed facts stay TODO (hidden in production); reduced motion and low-end mobile get a lighter but complete page.

User redirect (2026-11-06, mid-build): toy/cartoon planets rejected. Wanted "real space", professional, smooth; brush-painted display type (pointed at Permanent Marker); no boxed panels; references mecha-xyz.webflow.io and grail-app.com (huge type on dark, hairline tables, light pill CTA).

## Direction contract

THESIS: A real flight through the solar system, one body per chapter, with Sankalp's story hand-painted over it. Refuses toy planets, neon glow, glass cards and boxed panels.

OWN-WORLD: Near-black space (#020308) under a real Milky Way panorama; NASA-derived planet maps lit by one sun (Earth with night lights, clouds and limb scattering; Saturn with rings). Text sits directly on space over a directional darkening, never in a box. Display: Permanent Marker, huge. Body: Geist; labels Geist Mono uppercase. Accent: sunlight amber #ffb36b (swash, links, hover); primary CTA is a light #f2f0ea pill; #59e3a7 only for open-to-work/live status. Hairline fact rows for data.

STORY: Launch (Earth) → Origin (Moon) → Toolkit (Mars, skills as constellations) → Missions (six real projects: Jupiter, Saturn, Neptune, Uranus, Venus, Mercury) → Flight log (Ceres) → Let's talk (back to Earth). Visitor believes he ships real full-stack products with frontend craft; does: opens résumé or emails.

FIRST VIEWPORT: Live WebGL Earth right of centre, sunlit with city lights on the terminator; astronaut model drifting upper right. Name in brush type at ~9.5rem over two lines, lower left, amber swash beneath; role line, tagline, "Open résumé" light pill + "Get in touch" outline; open-to-work status under the actions. Top: brush wordmark left, current body · chapter readout centre, chapter links + Résumé pill right.

FORM: Grounded fusion from the user's steer (Tiny Planet Hop × Sky Atlas, 3D), then re-rendered realistic at the user's request. seed:f63a67c295f03083. Signature interaction: scroll is the flight — camera transfers planet to planet with an orbital-burn arc under Lenis inertia; drag spins the sky; each headline paints in left to right like one brush stroke; target reticle locks on the body you're visiting.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
