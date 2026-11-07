"use client";

import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { journey, SUN } from "@/lib/journey";

const starVert = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vBright;
  void main(){
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vBright = 0.82 + 0.18 * sin(uTime * (0.4 + aPhase) + aPhase * 40.0);
    vColor = aColor;
    gl_PointSize = aSize * uPixelRatio;
    gl_Position = projectionMatrix * mv;
  }
`;
const starFrag = /* glsl */ `
  varying vec3 vColor;
  varying float vBright;
  void main(){
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float a = exp(-d * d * 38.0);
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * vBright, a * vBright);
  }
`;

function sunTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0, "rgba(255,252,240,1)");
  grd.addColorStop(0.06, "rgba(255,240,210,0.95)");
  grd.addColorStop(0.18, "rgba(255,190,120,0.35)");
  grd.addColorStop(0.45, "rgba(255,140,70,0.08)");
  grd.addColorStop(1, "rgba(255,120,60,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function Sky({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const starMat = useRef<THREE.ShaderMaterial>(null);
  const milky = useLoader(THREE.TextureLoader, "/space/4k_stars_milky_way.jpg");
  milky.colorSpace = THREE.SRGBColorSpace;
  const sun = useMemo(() => sunTexture(), []);
  const sunPos = useMemo(() => new THREE.Vector3(...SUN).normalize().multiplyScalar(160), []);

  const starGeo = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const phase = new Float32Array(count);
    const col = new Float32Array(count * 3);
    // real stellar tints: mostly white, some blue-white and warm K/M stars
    const palette = ["#ffffff", "#f4f6ff", "#dfe8ff", "#cdd9ff", "#fff1dc", "#ffd8b0"].map((h) => new THREE.Color(h));
    let seed = 11;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < count; i++) {
      const u = rnd() * 2 - 1;
      const th = rnd() * Math.PI * 2;
      const r = 150;
      const s = Math.sqrt(1 - u * u);
      pos[i * 3] = r * s * Math.cos(th);
      pos[i * 3 + 1] = r * u;
      pos[i * 3 + 2] = r * s * Math.sin(th);
      const b = rnd();
      size[i] = b > 0.995 ? 5.5 : b > 0.96 ? 3.4 : 1.6 + rnd() * 1.2;
      phase[i] = rnd();
      const c = palette[Math.floor(rnd() * palette.length)];
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    return g;
  }, [count]);

  useFrame((state, dt) => {
    if (starMat.current) {
      starMat.current.uniforms.uTime.value = journey.reducedMotion ? 0 : state.clock.elapsedTime;
      starMat.current.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    }
    if (group.current) {
      group.current.rotation.y += journey.spin * dt * 0.02;
      journey.spin *= Math.pow(0.93, dt * 60);
      group.current.position.copy(state.camera.position);
    }
  });

  return (
    <group ref={group}>
      <mesh rotation={[0.3, Math.PI / 2 + 0.55, -0.4]} renderOrder={-10}>
        <sphereGeometry args={[190, 64, 32]} />
        <meshBasicMaterial map={milky} side={THREE.BackSide} color={[1.9, 1.9, 2.05]} depthWrite={false} fog={false} toneMapped={false} />
      </mesh>
      <points geometry={starGeo}>
        <shaderMaterial
          ref={starMat}
          vertexShader={starVert}
          fragmentShader={starFrag}
          uniforms={{ uTime: { value: 0 }, uPixelRatio: { value: 1 } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          fog={false}
        />
      </points>
      <sprite position={sunPos} scale={[70, 70, 1]}>
        <spriteMaterial map={sun} transparent depthWrite={false} blending={THREE.AdditiveBlending} fog={false} toneMapped={false} />
      </sprite>
    </group>
  );
}
