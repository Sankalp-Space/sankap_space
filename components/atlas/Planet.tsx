"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { journey, SUN, type Stop } from "@/lib/journey";

const SUN_DIR = new THREE.Vector3(...SUN).normalize();

function useTex(url: string) {
  const t = useLoader(THREE.TextureLoader, url);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/* ── Atmosphere: soft limb glow, brightest on the sunlit side ───────── */
const atmoVert = /* glsl */ `
  varying vec3 vN; varying vec3 vW;
  void main(){
    vec4 w = modelMatrix * vec4(position,1.0);
    vW = w.xyz;
    vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;
const atmoFrag = /* glsl */ `
  uniform vec3 uColor; uniform vec3 uSun; uniform float uStrength;
  varying vec3 vN; varying vec3 vW;
  void main(){
    vec3 V = normalize(cameraPosition - vW);
    float rim = smoothstep(0.0, 0.55, -dot(vN, V));
    float lit = smoothstep(-0.4, 0.7, dot(vN, uSun));
    gl_FragColor = vec4(uColor, rim * rim * lit * uStrength);
  }
`;

function Atmosphere({ radius, color, strength = 0.9, scale = 1.07 }: { radius: number; color: string; strength?: number; scale?: number }) {
  const uniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color(color) }, uSun: { value: SUN_DIR }, uStrength: { value: strength } }),
    [color, strength]
  );
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[radius, 64, 48]} />
      <shaderMaterial vertexShader={atmoVert} fragmentShader={atmoFrag} uniforms={uniforms} transparent side={THREE.BackSide} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

/* ── Earth: day map, city lights on the night side, scattering at the limb ── */
const earthVert = /* glsl */ `
  varying vec2 vUv; varying vec3 vN; varying vec3 vW;
  void main(){
    vUv = uv;
    vec4 w = modelMatrix * vec4(position,1.0);
    vW = w.xyz;
    vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;
const earthFrag = /* glsl */ `
  uniform sampler2D uDay; uniform sampler2D uNight; uniform vec3 uSun;
  varying vec2 vUv; varying vec3 vN; varying vec3 vW;
  void main(){
    vec3 N = normalize(vN);
    vec3 V = normalize(cameraPosition - vW);
    float ndl = dot(N, uSun);
    float dayMix = smoothstep(-0.12, 0.22, ndl);
    vec3 dayTex = texture2D(uDay, vUv).rgb;
    vec3 day = dayTex * (0.04 + max(ndl, 0.0) * 1.25);
    vec3 night = texture2D(uNight, vUv).rgb * vec3(1.0, 0.82, 0.55) * 1.6;
    vec3 col = mix(night, day, dayMix);
    // sun glint on the oceans
    vec3 H = normalize(uSun + V);
    float spec = pow(max(dot(N, H), 0.0), 60.0) * dayMix;
    float ocean = smoothstep(0.12, 0.02, dayTex.r) * smoothstep(0.05, 0.15, dayTex.b);
    col += vec3(1.0, 0.92, 0.8) * spec * ocean * 0.7;
    // limb scattering
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    col += vec3(0.3, 0.58, 1.0) * fres * smoothstep(-0.25, 0.5, ndl) * 1.1;
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function Earth({ stop }: { stop: Stop }) {
  const day = useTex("/space/2k_earth_daymap.jpg");
  const night = useTex("/space/2k_earth_nightmap.jpg");
  const clouds = useLoader(THREE.TextureLoader, "/space/2k_earth_clouds.jpg");
  const body = useRef<THREE.Mesh>(null);
  const cloud = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({ uDay: { value: day }, uNight: { value: night }, uSun: { value: SUN_DIR } }), [day, night]);
  useFrame((_, dt) => {
    if (journey.reducedMotion) return;
    if (body.current) body.current.rotation.y += dt * 0.02;
    if (cloud.current) cloud.current.rotation.y += dt * 0.027;
  });
  return (
    <>
      <mesh ref={body} rotation={[0, 2.4, 0]}>
        <sphereGeometry args={[stop.radius, 128, 96]} />
        <shaderMaterial vertexShader={earthVert} fragmentShader={earthFrag} uniforms={uniforms} />
      </mesh>
      <mesh ref={cloud} rotation={[0, 2.4, 0]} scale={1.012}>
        <sphereGeometry args={[stop.radius, 128, 96]} />
        <meshStandardMaterial color="#ffffff" alphaMap={clouds} transparent depthWrite={false} roughness={1} opacity={0.95} />
      </mesh>
      <Atmosphere radius={stop.radius} color="#5aa0ff" strength={1.15} scale={1.06} />
    </>
  );
}

/* ── Saturn's rings: radial strip texture mapped across the annulus ── */
function Rings({ radius }: { radius: number }) {
  const tex = useLoader(THREE.TextureLoader, "/space/2k_saturn_ring_alpha.png");
  tex.colorSpace = THREE.SRGBColorSpace;
  const geo = useMemo(() => {
    const inner = radius * 1.24;
    const outer = radius * 2.3;
    const g = new THREE.RingGeometry(inner, outer, 180, 1);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const uv = g.attributes.uv as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      uv.setXY(i, (v.length() - inner) / (outer - inner), 0.5);
    }
    return g;
  }, [radius]);
  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial map={tex} color="#d9cdb4" transparent side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function Textured({ stop }: { stop: Stop }) {
  const map = useTex(stop.map!);
  const body = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (body.current && !journey.reducedMotion) body.current.rotation.y += dt * 0.03;
  });
  return (
    <>
      <mesh ref={body}>
        <sphereGeometry args={[stop.radius, 96, 64]} />
        <meshStandardMaterial map={map} roughness={1} metalness={0} />
      </mesh>
      {stop.atmosphere && <Atmosphere radius={stop.radius} color={stop.atmosphere} strength={0.75} />}
      {stop.rings && <Rings radius={stop.radius} />}
    </>
  );
}

/** Thin camera-facing target reticle around the body you are visiting. */
function TargetRing({ radius, index }: { radius: number; index: number }) {
  const ref = useRef<THREE.Group>(null);
  const mat = useRef<THREE.LineBasicMaterial>(null);
  const strength = useRef(0);
  const geo = useMemo(() => {
    const pts: number[] = [];
    const R = radius * 1.38;
    const seg = 160;
    for (let s = 0; s < seg; s++) {
      if (s % 40 > 34) continue; // four gaps, like a reticle
      const a = (s / seg) * Math.PI * 2;
      const b = ((s + 1) / seg) * Math.PI * 2;
      pts.push(Math.cos(a) * R, Math.sin(a) * R, 0, Math.cos(b) * R, Math.sin(b) * R, 0);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [radius]);
  useFrame((state, dt) => {
    if (!ref.current || !mat.current) return;
    const target = Math.abs(journey.t - index) < 0.35 ? 1 : 0;
    strength.current += (target - strength.current) * (1 - Math.exp(-dt * (target ? 3 : 6)));
    ref.current.quaternion.copy(state.camera.quaternion);
    ref.current.rotateZ(journey.reducedMotion ? 0 : state.clock.elapsedTime * 0.04);
    ref.current.scale.setScalar(1.08 - strength.current * 0.08);
    mat.current.opacity = strength.current * 0.12;
  });
  return (
    <group ref={ref}>
      <lineSegments geometry={geo}>
        <lineBasicMaterial ref={mat} color="#ffffff" transparent opacity={0} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export function Planet({ stop, index, position }: { stop: Stop; index: number; position: [number, number, number] }) {
  const root = useRef<THREE.Group>(null);
  // One body per chapter: a world fades up only as you approach it, so nothing distant sits behind text.
  useFrame(() => {
    if (!root.current) return;
    const d = Math.abs(journey.t - index);
    const x = Math.min(Math.max((0.95 - d) / 0.4, 0), 1);
    const presence = x * x * (3 - 2 * x);
    root.current.visible = presence > 0.001;
    root.current.scale.setScalar(0.35 + presence * 0.65);
  });
  return (
    <group ref={root} position={position}>
      <group rotation={[stop.rings ? 0.42 : 0, 0, stop.tilt]}>
        <Suspense fallback={null}>{stop.kind === "earth" ? <Earth stop={stop} /> : <Textured stop={stop} />}</Suspense>
      </group>
      <TargetRing radius={stop.radius} index={index} />
    </group>
  );
}
