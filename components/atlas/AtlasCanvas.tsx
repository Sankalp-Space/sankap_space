"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { Sky } from "./Sky";
import { Planet } from "./Planet";
import { Astronaut, CameraRig } from "./Journey";
import { stops, stopPositions, SUN } from "@/lib/journey";

const sunLight = new THREE.Vector3(...SUN).normalize().multiplyScalar(60);

export default function AtlasCanvas() {
  const [lite, setLite] = useState(false);
  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4;
    setLite(narrow || weak);
  }, []);

  return (
    <Canvas
      dpr={lite ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
      camera={{ fov: 38, near: 0.1, far: 600, position: [3, 2, 14] }}
      onCreated={({ gl }) => gl.setClearColor("#020308")}
    >
      <ambientLight intensity={0.012} />
      <directionalLight position={sunLight} intensity={3.2} color="#fff4e6" />
      <Suspense fallback={null}>
        <Sky count={lite ? 1800 : 4200} />
      </Suspense>
      {stops.map((s, i) => (
        <Planet key={s.id} stop={s} index={i} position={stopPositions[i]} />
      ))}
      <Suspense fallback={null}>
        <Astronaut />
      </Suspense>
      <CameraRig />
    </Canvas>
  );
}
