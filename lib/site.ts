import { certifications, education, flightLog, missions, profile, socials, toolkit } from "./data";

/**
 * The public URL of the site. Set NEXT_PUBLIC_SITE_URL to your real domain
 * (e.g. https://sankalp.dev). On Vercel the production URL is picked up automatically.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "http://localhost:3000"
).replace(/\/$/, "");

export const SEO = {
  title: "Sankalp Shrivastav · Software Developer (PHP, Node.js, React, TypeScript)",
  shortTitle: "Sankalp Shrivastav",
  description:
    "Sankalp Shrivastav is a software developer from Agra, India with 1.5+ years building production backends and full-stack apps: PHP, Node.js, MySQL, React, TypeScript, AWS, CI/CD and LLM integrations. Currently at OEG. See projects, experience and contact.",
  keywords: [
    "Sankalp Shrivastav",
    "Sankalp Space",
    "full-stack developer",
    "full stack developer India",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "MERN stack developer",
    "PHP developer",
    "backend developer India",
    "TypeScript developer",
    "software developer Agra",
    "AWS",
    "LangChain",
    "Model Context Protocol",
    "web developer portfolio",
  ],
};

const allSkills = Array.from(new Set(toolkit.flatMap((g) => g.skills.map((s) => s.name))));

/** schema.org graph: who Sankalp is, the site, and the work. Read by Google and AI search engines. */
export function jsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: profile.name,
    alternateName: "Sankalp-Space",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.jpg`,
    email: `mailto:${profile.email}`,
    jobTitle: "Software Developer",
    description: SEO.description,
    address: { "@type": "PostalAddress", addressLocality: "Agra", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
    worksFor: { "@type": "Organization", name: "OEG" },
    alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
    knowsAbout: allSkills,
    hasOccupation: flightLog.map((r) => ({
      "@type": "Occupation",
      name: r.title,
      description: `${r.place} (${r.when}). ${r.note}`,
    })),
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      recognizedBy: { "@type": "Organization", name: c.by },
    })),
    sameAs: socials.map((s) => s.href),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SEO.shortTitle,
    description: SEO.description,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  const page = {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: SEO.title,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: { "@id": `${SITE_URL}/#person` },
    dateModified: new Date().toISOString().slice(0, 10),
  };

  const projects = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#projects`,
    name: "Projects by Sankalp Shrivastav",
    itemListElement: missions.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: m.name,
        description: `${m.summary} ${m.detail}`,
        programmingLanguage: m.stack,
        author: { "@id": `${SITE_URL}/#person` },
        ...(m.live ? { url: m.live } : {}),
        ...(m.code ? { codeRepository: m.code } : {}),
        ...(m.shot ? { image: `${SITE_URL}${m.shot}` } : {}),
      },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [person, website, page, projects] };
}
