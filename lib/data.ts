/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE. Edit this file, the story updates.
 *  Sources: Sankalp's résumé (Sankalp_Shrivastav_Resume, Nov 2026) and github.com/Sankalp-Space.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Sankalp Shrivastav",
  firstName: "Sankalp",
  role: "Software developer · full-stack",
  location: "Agra, India",
  timezone: "UTC+5:30",
  /** Shown as a live "signal" in the hero. Keep it about what you're building, not job hunting. */
  signal: { label: "Signal live", text: "currently shipping at OEG" },
  tagline:
    "1.5+ years shipping production backends and full-stack apps: PHP and Node APIs, MySQL schemas, React + TypeScript frontends, CI/CD and LLM integrations.",
  email: "sankalpshrivastav2001@gmail.com",
  resume:
    "https://drive.google.com/file/d/1Qk8m1rkLylj9toyeD0CRwU_ynWnF22uG/view?usp=drive_link",
  funFact:
    "I write better code at 2 AM than at 10 AM. My console has seen more drama than Netflix.",
};

/** Little rotated stickers in the hero. Facts only. */
export const stickers = ["1.5+ yrs shipping", "90+ APIs built", "279+ LeetCode"];

export const socials = [
  { label: "GitHub", handle: "Sankalp-Space", href: "https://github.com/Sankalp-Space" },
  { label: "LinkedIn", handle: "sankalp-space1", href: "https://linkedin.com/in/sankalp-space1" },
  { label: "X", handle: "@sankalp_spacex", href: "https://twitter.com/sankalp_spacex" },
  { label: "LeetCode", handle: "sankalp-space", href: "https://leetcode.com/sankalp-space" },
  { label: "HackerRank", handle: "sankalpshrivast4", href: "https://www.hackerrank.com/sankalpshrivast4" },
];

export const origin = {
  heading: "Hello from Earth.",
  paragraphs: [
    "I'm Sankalp, a developer from Agra who likes owning a product from the database to the last pixel. Three teams in, I've designed APIs, schemas and caching layers, cut bundles by 85% and shipped five client sites end to end.",
    "I care about the boring parts that make software hold up: auth, rate limits, migrations, tests in CI. Off the clock I'm building with LLMs and MCP servers.",
  ],
  facts: [
    { k: "Base", v: "Agra, IN" },
    { k: "Focus", v: "APIs + performance" },
    { k: "Peak hours", v: "02:00 IST" },
  ],
};

/**
 * Skills, grouped into constellations. `icon` is a simple-icons export name
 * (https://simpleicons.org); leave it out for skills without a brand mark.
 */
export type Skill = { name: string; icon?: string };
export const toolkit: { name: string; tagline: string; skills: Skill[] }[] = [
  {
    name: "Frontend",
    tagline: "Fast interfaces, small bundles",
    skills: [
      { name: "React", icon: "siReact" },
      { name: "Next.js", icon: "siNextdotjs" },
      { name: "TypeScript", icon: "siTypescript" },
      { name: "Vite", icon: "siVite" },
      { name: "Tailwind CSS", icon: "siTailwindcss" },
      { name: "Three.js", icon: "siThreedotjs" },
      { name: "Core Web Vitals" },
    ],
  },
  {
    name: "Backend",
    tagline: "APIs that hold up in production",
    skills: [
      { name: "PHP", icon: "siPhp" },
      { name: "Node.js", icon: "siNodedotjs" },
      { name: "Express", icon: "siExpress" },
      { name: "REST APIs" },
      { name: "JWT + OAuth", icon: "siJsonwebtokens" },
      { name: "Caching + rate limits" },
      { name: "WordPress plugins", icon: "siWordpress" },
    ],
  },
  {
    name: "Data & Cloud",
    tagline: "Where it all lives",
    skills: [
      { name: "MySQL", icon: "siMysql" },
      { name: "MongoDB", icon: "siMongodb" },
      { name: "PostgreSQL", icon: "siPostgresql" },
      { name: "Supabase", icon: "siSupabase" },
      { name: "AWS EC2", icon: "siAmazonec2" },
      { name: "AWS S3", icon: "siAmazons3" },
      { name: "CloudFront", icon: "siAmazonwebservices" },
    ],
  },
  {
    name: "DevOps & Testing",
    tagline: "Ship it, prove it works",
    skills: [
      { name: "GitHub Actions", icon: "siGithubactions" },
      { name: "Playwright E2E" },
      { name: "Git + GitHub", icon: "siGithub" },
      { name: "Docker", icon: "siDocker" },
      { name: "Postman", icon: "siPostman" },
      { name: "Jira", icon: "siJira" },
      { name: "Linux", icon: "siLinux" },
    ],
  },
  {
    name: "AI & Integrations",
    tagline: "Wiring products to the world",
    skills: [
      { name: "LLM APIs" },
      { name: "LangChain", icon: "siLangchain" },
      { name: "MCP" },
      { name: "Zoom API", icon: "siZoom" },
      { name: "Zoho CRM", icon: "siZoho" },
      { name: "Razorpay" },
      { name: "JSON-LD / SEO" },
    ],
  },
  {
    name: "Languages",
    tagline: "The fundamentals",
    skills: [
      { name: "PHP", icon: "siPhp" },
      { name: "TypeScript", icon: "siTypescript" },
      { name: "JavaScript", icon: "siJavascript" },
      { name: "SQL", icon: "siMysql" },
      { name: "C++", icon: "siCplusplus" },
      { name: "Go", icon: "siGo" },
    ],
  },
];

export const nowExploring = ["LLM agents", "Model Context Protocol", "System design", "CI/CD"];

export type Mission = {
  id: string;
  name: string;
  catalogue: string;
  summary: string;
  detail: string;
  stack: string[];
  live?: string;
  code?: string;
  color: string;
  /** screenshot in /public/missions, captured from the live site */
  shot?: string;
};

export const missions: Mission[] = [
  {
    id: "imagify",
    name: "Imagify",
    catalogue: "SS-01",
    summary: "AI text-to-image SaaS with credits and payments.",
    detail: "Prompt in, image out. JWT auth, a credit system per generation via the ClipDrop API, and Razorpay top-ups.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Razorpay"],
    live: "https://imagify1-13gr.onrender.com",
    code: "https://github.com/Sankalp-Space/Imagify1",
    shot: "/missions/imagify.jpg",
    color: "#ff7a59",
  },
  {
    id: "dgni",
    name: "DGN Infosolution",
    catalogue: "SS-02",
    summary: "Company website with a CMS the sales team runs.",
    detail: "Services and pricing editable by non-technical staff, with backend query tuning, image compression and server-side caching for speed.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    live: "https://dgni.in",
    shot: "/missions/dgni.jpg",
    color: "#7cc6fe",
  },
  {
    id: "samatha",
    name: "Samatha Stay",
    catalogue: "SS-03",
    summary: "Website for a Himalayan homestay in Munsiyari.",
    detail: "A real client site facing the Panchachuli peaks: rooms, stories and enquiries, built to load fast on mountain connections.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    live: "https://samathastay.vercel.app",
    code: "https://github.com/Sankalp-Space/samathastay",
    shot: "/missions/samatha.jpg",
    color: "#3ddc97",
  },
  {
    id: "bookmarks",
    name: "Smart Bookmarks",
    catalogue: "SS-04",
    summary: "Private bookmarks that sync live across tabs.",
    detail: "Google OAuth only, row-level security so every user sees just their own links, and Supabase Realtime pushing changes to every open tab.",
    stack: ["Next.js 16", "Supabase", "PostgreSQL", "Realtime"],
    // live: "https://abstrabit-hazel.vercel.app", // 404 on 2026-11-06, redeploy then restore
    code: "https://github.com/Sankalp-Space/abstrabit",
    color: "#e9b949",
  },
  {
    id: "tracker",
    name: "Realtime Tracker",
    catalogue: "SS-05",
    summary: "Live map of everyone connected, updated as they move.",
    detail: "Each browser streams its geolocation over Socket.io; the server fans it out and Leaflet moves the markers in real time.",
    stack: ["Node.js", "Express", "Socket.io", "Leaflet"],
    // live: "https://realtime-trackerr.vercel.app", // 404 on 2026-11-06, redeploy then restore
    code: "https://github.com/Sankalp-Space/Realtime-Trackerr",
    color: "#c58bff",
  },
  {
    id: "mcp",
    name: "MCP Currency Server",
    catalogue: "SS-06",
    summary: "A Model Context Protocol server AI agents can call.",
    detail: "Exposes currency conversion as an MCP tool, so an LLM client can fetch live rates mid-conversation instead of guessing.",
    stack: ["Node.js", "MCP SDK", "LLM tooling"],
    code: "https://github.com/Sankalp-Space/MCP-server",
    color: "#ff5a8a",
  },
];

/** Smaller repos, linked from the missions intro. */
export const archive = [
  { name: "Gen-AI Restaurant App", note: "LangChain", href: "https://github.com/Sankalp-Space/Gen-AI-Restaurant-Application" },
  { name: "URL Shortener", note: "Go", href: "https://github.com/Sankalp-Space/URL_Shorten-Project" },
  { name: "REST API", note: "Go", href: "https://github.com/Sankalp-Space/REST-API-project" },
  { name: "DevOps Journey", note: "Shell", href: "https://github.com/Sankalp-Space/DevOps-Journey" },
];

/** Work history, newest first (from the résumé). */
export const flightLog = [
  {
    when: "Dec 2025 – now",
    title: "Software Developer",
    place: "OEG · Remote",
    note: "90+ REST endpoints and 30+ MySQL tables (PHP) for an Oracle ERP e-learning platform. Cut first-load JS by 85% with 108 lazy Vite chunks, built a Zoom registration service and Zoho CRM sync, 12 Playwright E2E tests in CI, LLM resume formatting.",
  },
  {
    when: "May – Dec 2025",
    title: "Full Stack Developer",
    place: "DGN Infosolution · New Delhi",
    note: "Delivered 5 client websites end to end on MERN, plus a production diagnostic-services platform: requirements, API and database design, React/Tailwind UI, deployment.",
  },
  {
    when: "Oct – Dec 2024",
    title: "Backend Developer",
    place: "Sharelog · Remote",
    note: "Production Node/Express APIs deployed on AWS EC2, S3 and CloudFront; JWT, OAuth and rate limiting; thorough API testing in Postman.",
  },
];

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  school: "Veer Bahadur Singh Purvanchal University",
  when: "2022 – 2026",
  grade: "CGPA 7.56",
};

export const certifications = [
  { name: "OCI 2025 AI Foundations Associate", by: "Oracle" },
  { name: "AWS Cloud Quest: Cloud Practitioner", by: "AWS" },
  { name: "SQL (Intermediate)", by: "HackerRank" },
  { name: "279+ solved · SQL 50 · 100 Days", by: "LeetCode" },
];
