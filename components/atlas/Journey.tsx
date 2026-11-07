"use client";

import { useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { journey, stops, stopPositions } from "@/lib/journey";

const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const V = (p: [number, number, number]) => new THREE.Vector3(...p);

type Frame = { pos: THREE.Vector3; look: THREE.Vector3; astro: THREE.Vector3 };

/** Camera framing for stop i: body beside the panel on desktop, above it on phones. */
function framing(i: number, mobile: boolean): Frame {
  const s = stops[i];
  const p = V(stopPositions[i]);
  if (mobile) {
    const d = s.radius * 6.2 + 3;
    const pos = p.clone().add(new THREE.Vector3(0, s.radius * 0.5, d));
    const look = p.clone().add(new THREE.Vector3(0, -s.radius * 1.55, 0));
    const astro = p.clone().add(new THREE.Vector3(s.radius * 0.95, s.radius * 0.6, s.radius * 2.2));
    return { pos, look, astro };
  }
  const d = s.radius * 4.1 + 3.2;
  const pos = p.clone().add(new THREE.Vector3(s.side * s.radius * 0.5, s.radius * 0.35, d));
  const look = p.clone().add(new THREE.Vector3(-s.side * s.radius * 1.35, 0, 0));
  // the astronaut drifts between the camera and the body, on the planet's side of the frame
  const ringed = !!s.rings;
  const astro = p.clone().add(new THREE.Vector3(s.side * s.radius * (ringed ? 1.55 : 0.8), s.radius * (ringed ? 1.45 : 0.95), s.radius * (ringed ? 2.2 : 1.5)));
  return { pos, look, astro };
}

function useFrames() {
  const { size } = useThree();
  const mobile = size.width < 768;
  return { mobile, frames: useMemo(() => stops.map((_, i) => framing(i, mobile)), [mobile]) };
}

function sample(frames: Frame[], key: keyof Frame) {
  const n = stops.length - 1;
  const t = Math.min(Math.max(journey.t, 0), n);
  const i = Math.min(Math.floor(t), n - 1);
  const raw = t - i;
  const f = ease(raw);
  const v = frames[i][key].clone().lerp(frames[Math.min(i + 1, n)][key], f);
  return { v, raw };
}

export function CameraRig() {
  const { camera } = useThree();
  const { mobile, frames } = useFrames();
  const look = useRef(new THREE.Vector3());
  const first = useRef(true);

  useFrame((_, dt) => {
    journey.mobile = mobile;
    const { v: pos, raw } = sample(frames, "pos");
    const { v: tgt } = sample(frames, "look");
    // ease out of orbit and back in, so each transfer feels like a burn, not a pan
    const arc = Math.sin(Math.PI * raw);
    pos.y += arc * 1.4;
    pos.z += arc * 4;
    if (!journey.reducedMotion) {
      pos.x += journey.pointerX * 0.22;
      pos.y += journey.pointerY * 0.14;
    }
    const k = first.current || journey.reducedMotion ? 1 : 1 - Math.exp(-dt * 2.4);
    first.current = false;
    camera.position.lerp(pos, k);
    look.current.lerp(tgt, k);
    camera.lookAt(look.current);
  });
  return null;
}

export function Astronaut() {
  const gltf = useLoader(GLTFLoader, "/models/astronaut-z2.glb", (loader) => {
    const draco = new DRACOLoader();
    draco.setDecoderPath("/draco/");
    loader.setDRACOLoader(draco);
  });
  const { gl } = useThree();
  // soft studio reflections for the visor and suit fabric only (planets stay lit by the sun alone)
  const env = useMemo(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const tex = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    pm.dispose();
    return tex;
  }, [gl]);
  const { frames } = useFrames();
  const root = useRef<THREE.Group>(null);
  const smooth = useRef<THREE.Vector3 | null>(null);

  // normalise the model to ~1 unit tall, centred on its waist
  const model = useMemo(() => {
    const scene = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    const s = 1.05 / size.y;
    scene.scale.setScalar(s);
    scene.position.copy(centre.multiplyScalar(-s));
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh && m.material) {
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.envMap = env;
        mat.envMapIntensity = 0.12;
      }
    });
    return scene;
  }, [gltf, env]);

  useFrame((state, dt) => {
    if (!root.current) return;
    const time = state.clock.elapsedTime;
    const { v: target, raw } = sample(frames, "astro");
    const still = journey.reducedMotion;
    // zero-g drift
    if (!still) {
      target.y += Math.sin(time * 0.45) * 0.12;
      target.x += Math.sin(time * 0.31) * 0.08;
    }
    if (!smooth.current) smooth.current = target.clone();
    smooth.current.lerp(target, still ? 1 : 1 - Math.exp(-dt * 1.6));
    root.current.position.copy(smooth.current);
    const burn = Math.sin(Math.PI * raw);
    root.current.rotation.set(
      still ? 0 : Math.sin(time * 0.23) * 0.18 - burn * 0.35,
      still ? -0.4 : -0.4 + Math.sin(time * 0.17) * 0.5,
      still ? 0.12 : Math.sin(time * 0.29) * 0.22 + 0.12
    );
  });

  return (
    <group ref={root}>
      <primitive object={model} />
    </group>
  );
}
