import { missions } from "./data";

export type Side = 1 | -1; // 1 = planet sits right of the panel, -1 = left

export type BodyKind = "earth" | "textured";

export type Stop = {
  id: string;
  label: string; // shown in the telemetry readout
  chapter: string; // nav grouping
  body: string; // real body this chapter flies past
  kind: BodyKind;
  map?: string;
  radius: number;
  side: Side;
  tilt: number;
  atmosphere?: string;
  rings?: boolean;
};

const T = (f: string) => `/space/${f}`;

// One real body per mission, in route order.
const missionBodies: Omit<Stop, "id" | "label" | "chapter" | "side">[] = [
  { body: "Jupiter", kind: "textured", map: T("2k_jupiter.jpg"), radius: 2.7, tilt: 0.05 },
  { body: "Saturn", kind: "textured", map: T("2k_saturn.jpg"), radius: 1.9, tilt: 0.47, rings: true },
  { body: "Neptune", kind: "textured", map: T("2k_neptune.jpg"), radius: 1.5, tilt: 0.49, atmosphere: "#5b8cff" },
  { body: "Uranus", kind: "textured", map: T("2k_uranus.jpg"), radius: 1.5, tilt: 1.7, atmosphere: "#8fe3ef" },
  { body: "Venus", kind: "textured", map: T("2k_venus_atmosphere.jpg"), radius: 1.45, tilt: 0.05, atmosphere: "#ffd59a" },
  { body: "Mercury", kind: "textured", map: T("2k_mercury.jpg"), radius: 0.95, tilt: 0.01 },
];

export const stops: Stop[] = [
  { id: "launch", label: "Launch", chapter: "Launch", body: "Earth", kind: "earth", radius: 2.3, side: 1, tilt: 0.41 },
  { id: "origin", label: "Origin", chapter: "Origin", body: "Moon", kind: "textured", map: T("2k_moon.jpg"), radius: 1.0, side: -1, tilt: 0.03 },
  { id: "toolkit", label: "Toolkit", chapter: "Toolkit", body: "Mars", kind: "textured", map: T("2k_mars.jpg"), radius: 1.35, side: 1, tilt: 0.44, atmosphere: "#ff9a6b" },
  ...missions.map((m, i) => ({
    id: m.id,
    label: m.name,
    chapter: "Missions",
    side: (i % 2 === 0 ? -1 : 1) as Side,
    ...missionBodies[i % missionBodies.length],
  })),
  { id: "log", label: "Flight log", chapter: "Flight log", body: "Ceres", kind: "textured", map: T("2k_ceres_fictional.jpg"), radius: 0.95, side: -1, tilt: 0.07 },
  { id: "contact", label: "Transmission", chapter: "Contact", body: "Earth", kind: "earth", radius: 2.3, side: 1, tilt: 0.41 },
];

/** Deterministic route through the system. */
export const stopPositions: [number, number, number][] = stops.map((_, i) => {
  if (i === 0) return [0, 0, 0];
  const x = Math.sin(i * 1.15) * 11 + Math.sin(i * 0.37) * 5;
  const y = Math.cos(i * 0.8) * 3.5 - 0.6;
  const z = -i * 26;
  return [x, y, z];
});

/** Direction the sunlight comes from, shared by every body. */
export const SUN: [number, number, number] = [0.86, 0.28, 0.1];

/** Telemetry readout per stop (stable, decorative). */
export const stopCoords = stops.map((_, i) => {
  const raH = (3 + i * 2.1) % 24;
  const h = Math.floor(raH);
  const m = Math.floor((raH - h) * 60);
  const dec = Math.round(Math.sin(i * 0.9) * 48);
  return { ra: `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m`, dec: `${dec >= 0 ? "+" : "−"}${String(Math.abs(dec)).padStart(2, "0")}°` };
});

/**
 * Shared mutable scroll state. The DOM writes, the WebGL loop reads every frame.
 * Kept outside React so scrolling never re-renders the tree.
 */
export const journey = {
  t: 0,
  active: 0,
  spin: 0,
  pointerX: 0,
  pointerY: 0,
  reducedMotion: false,
  mobile: false,
};

type Listener = (active: number) => void;
const listeners = new Set<Listener>();
export function onActive(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
export function emitActive(i: number) {
  listeners.forEach((fn) => fn(i));
}
