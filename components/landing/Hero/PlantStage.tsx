"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

function PottedPlant() {
  const { scene } = useGLTF("/potted-plant.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if ("isMesh" in child && child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1.9} position={[0, -1.2, 0]} />;
}

useGLTF.preload("/potted-plant.glb");

const readouts = [
  { label: "Moisture", value: "42%" },
  { label: "Light", value: "620 lx" },
  { label: "Wallet", value: "$8.60" },
  { label: "Peers", value: "3 online" },
] as const;

export function PlantStage() {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[24px] border border-line bg-[radial-gradient(120%_80%_at_50%_20%,#ffffff_0%,#ece8df_55%,#d7d1c3_100%)] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_30px_60px_-30px_rgba(47,109,60,0.25)]">
      <div className="absolute inset-0 [&_canvas]:block [&_canvas]:h-full! [&_canvas]:w-full!">
        <Canvas shadows camera={{ position: [0, 1.4, 3.2], fov: 45 }}>
          <ambientLight intensity={0.65} />
          <directionalLight
            castShadow
            position={[4, 8, 2]}
            intensity={1.2}
            shadow-mapSize={[2048, 2048]}
          />
          <Suspense fallback={null}>
            <PottedPlant />
            <Environment preset="forest" />
          </Suspense>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1.2, 0]}
          >
            <planeGeometry args={[8, 8]} />
            <shadowMaterial opacity={0.25} />
          </mesh>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={1.16}
            maxPolarAngle={1.16}
            maxDistance={5}
            minDistance={5}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Canvas>
      </div>

      <div
        className="absolute top-4 right-4 grid min-w-[148px] gap-1.5 rounded-xl border border-line bg-white/78 px-3.5 py-3 text-[11px] text-ink-dim backdrop-blur-sm"
        aria-hidden
      >
        {readouts.map((row) => (
          <div key={row.label} className="flex justify-between gap-4">
            <span>{row.label}</span>
            <strong className="font-medium text-ink tabular-nums">{row.value}</strong>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/75 px-3 py-2 text-xs text-ink-dim backdrop-blur-sm">
        <span
          className="relative h-2 w-2 shrink-0 rounded-full bg-accent after:absolute after:-inset-1 after:rounded-full after:border-2 after:border-accent after:opacity-60 after:animate-plant-pulse after:content-['']"
          aria-hidden
        />
        <span>Genesis · Online · Healthy</span>
      </div>
    </div>
  );
}
