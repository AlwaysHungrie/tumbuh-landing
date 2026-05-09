"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Info } from "lucide-react";

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

const STATIC_READOUTS = [
  { label: "Moisture", value: "42%" },
  { label: "Light", value: "620 lx" },
  { label: "Wallet", value: "$8.60" },
  { label: "Peers", value: "3 online" },
] as const;

function PatronTooltip() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLButtonElement>(null);

  function show() {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: r.left + r.width / 2, y: r.top });
  }

  return (
    <>
      <button
        ref={ref}
        className="text-muted/80 hover:text-muted transition-colors"
        onMouseEnter={show}
        onMouseLeave={() => setPos(null)}
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      {pos &&
        createPortal(
          <div
            className="max-w-52 pointer-events-none fixed z-1000 rounded-lg border border-line bg-ink px-2.5 py-1.5 text-[11px] font-medium text-white shadow-lg"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, calc(-100% - 8px))",
            }}
          >
            Plants with high number of patrons have a higher chance of survival
            during crisis. Patrons pledge $1 a month to the plant&apos;s wallet.
          </div>,
          document.body,
        )}
    </>
  );
}

type PlantStageProps = {
  wallet?: string;
  patronPageUrl?: string;
};

export function PlantStage({
  wallet,
  patronPageUrl = process.env.NEXT_PUBLIC_PATRON_WALLET_URL!,
}: PlantStageProps) {
  const [patronCount, setPatronCount] = useState<number>(0);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!wallet) return;
    fetch(`/api/plants/${wallet}`)
      .then((r) => r.json())
      .then((d) => setPatronCount(d.plant?.recurring_income ?? 0))
      .catch(() => setPatronCount(0));
  }, [wallet]);

  async function handleBecome() {
    if (!wallet) return;
    setJoining(true);
    window.open(patronPageUrl, "_blank");
    try {
      await fetch(`/api/plants/${wallet}/income`, { method: "POST" });
      setPatronCount((c) => (c ?? 0) + 1);
    } finally {
      setJoining(false);
    }
  }

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

      {/* Top-right readouts */}
      <div
        className="absolute top-2 right-2 z-10 grid max-w-[min(100%,11rem)] min-w-0 gap-1 rounded-lg border border-line bg-white/78 px-2.5 py-2 text-[10px] text-ink-dim backdrop-blur-sm sm:top-4 sm:right-4 sm:max-w-none sm:min-w-[148px] sm:gap-1.5 sm:rounded-xl sm:px-3.5 sm:py-3 sm:text-[11px]"
        aria-hidden={!wallet}
      >
        {wallet ? (
          <div className="flex gap-1 items-center">
            <PatronTooltip />
            <span>Patrons</span>
            <div className="flex items-center gap-1 ml-auto">
              <strong className="font-medium text-ink tabular-nums">
                {patronCount === null ? (
                  <span className="inline-block h-3 w-6 animate-pulse rounded bg-cream" />
                ) : (
                  patronCount
                )}
              </strong>
            </div>
          </div>
        ) : (
          STATIC_READOUTS.map((row) => (
            <div key={row.label} className="flex justify-between gap-4">
              <span>{row.label}</span>
              <strong className="font-medium text-ink tabular-nums">
                {row.value}
              </strong>
            </div>
          ))
        )}
      </div>

      {/* Bottom overlay */}
      {wallet ? (
        <button
          onClick={handleBecome}
          disabled={joining}
          className="absolute bottom-2 left-2 z-10 rounded-full bg-ink px-3.5 py-2 text-[11px] font-semibold text-white shadow-md transition-opacity hover:opacity-80 disabled:opacity-50 sm:bottom-4 sm:left-4 sm:px-4 sm:py-2.5 sm:text-[12px]"
        >
          Become a patron for $1
        </button>
      ) : (
        <div className="absolute bottom-2 left-2 z-10 inline-flex max-w-[calc(100%-1rem)] items-center gap-2 rounded-full border border-line bg-white/75 px-2.5 py-1.5 text-[10px] text-ink-dim backdrop-blur-sm sm:bottom-4 sm:left-4 sm:max-w-none sm:gap-2.5 sm:px-3 sm:py-2 sm:text-xs">
          <span
            className="relative h-2 w-2 shrink-0 rounded-full bg-accent after:absolute after:-inset-1 after:rounded-full after:border-2 after:border-accent after:opacity-60 after:animate-plant-pulse after:content-['']"
            aria-hidden
          />
          <span>Genesis · Online · Healthy</span>
        </div>
      )}
    </div>
  );
}
