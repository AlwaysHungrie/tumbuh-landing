"use client";

import { Plant } from "@/app/admin/page";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Dynamically import Globe with ssr: false to avoid "window is not defined"
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type DataPoint = {
  lat: number;
  lng: number;
  size: number;
  color: string;
  walletAddress: string;
};

export default function NetworkMapPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeEl = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const [hoveredWallet, setHoveredWallet] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [gData, setGData] = useState<DataPoint[]>([]);
  const [plantRefreshKey, setPlantRefreshKey] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchPlants = () => {
    setPlantRefreshKey((k) => k + 1);
  };

  useEffect(() => {
    fetch("/api/plants")
      .then((r) => r.json())
      .then((data) => {
        console.log("getdata: ", data);
        const gData = (data.plants ?? []).map((p: Plant) => ({
          lat: parseFloat(p.longitude),
          lng: parseFloat(p.latitude),
          size: 7 + Math.random() * 30,
          color: ["red", "white", "blue", "green"][
            Math.round(Math.random() * 3)
          ],
          walletAddress: p.wallet,
        }));

        console.log("gData: ", gData);
        setGData(gData);
        setSelectedWallet(gData[0]?.walletAddress || null);
      })
      .catch(() => {});
  }, [plantRefreshKey]);

  const handleCameraMove = () => {
    if (!globeEl.current || hoveredWallet) return;

    const { lat, lng } = globeEl.current.pointOfView();

    // Find closest point in gData to current center
    let closest = gData[0];
    let minDistance = Infinity;

    gData.forEach((point) => {
      // Simple angular distance for selection (sufficient for small clusters)
      const dLat = point.lat - lat;
      // Handle longitude wrap-around
      let dLng = point.lng - lng;
      if (dLng > 180) dLng -= 360;
      if (dLng < -180) dLng += 360;

      const dist = Math.sqrt(dLat * dLat + dLng * dLng);
      if (dist < minDistance) {
        minDistance = dist;
        closest = point;
      }
    });

    if (closest && closest.walletAddress !== selectedWallet) {
      setSelectedWallet(closest.walletAddress);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMounted && globeEl.current) {
      // Auto-rotate
      const controls = globeEl.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.1;
        controls.minDistance = 101;
        controls.maxDistance = 500;
      }
      globeEl.current.pointOfView(
        {
          lat: 19.076,
          lng: 78.8777,
          altitude: 0.85,
        },
        1200,
      );
    }
  }, [isMounted, isGlobeReady]);

  if (!isMounted) {
    return null;
  }

  const { width, height } = dimensions;
  const isMobile = width < 1024;

  return (
    <div className="mx-auto w-fit">
      <Globe
        ref={globeEl}
        width={isMobile ? width - 64 : width - 192}
        height={height - 96}
        backgroundColor="#f6f5f1"
        atmosphereAltitude={0.2}
        globeImageUrl="/earthmap4k.jpg"
        onGlobeReady={() => setIsGlobeReady(true)}
        onZoom={handleCameraMove}
        // onCameraMove={handleCameraMove}
        globeCurvatureResolution={8}
        htmlElementsData={gData}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        htmlElement={(d: any) => {
          const el = document.createElement("div");
          el.innerHTML = "🌱  ";
          el.style.backgroundColor = "#32a85240";
          el.style.border = "3px solid #32a852";
          el.style.color = "white";
          el.style.borderRadius = "100%";
          el.style.fontSize = "32px";

          el.style.width = `${32}px`;
          el.style.height = `${32}px`;
          el.style.transition = "transform 250ms opacity 250ms";

          // @ts-expect-error fix later
          el.style["pointer-events"] = "auto";
          el.style.cursor = "pointer";
          el.style.lineHeight = "0";

          el.onmouseenter = () => {
            setHoveredWallet(d.walletAddress);
            if (globeEl.current) {
              globeEl.current.controls().autoRotate = false;
            }
          };

          el.onmouseleave = () => {
            setHoveredWallet(null);
            if (globeEl.current) {
              globeEl.current.controls().autoRotate = true;
            }
          };

          el.onclick = () =>
            (window.location.href = `/network/${d.walletAddress}`);
          return el;
        }}
        htmlElementVisibilityModifier={(el, isVisible) =>
          // @ts-expect-error fix later
          (el.style.opacity = isVisible ? 1 : 0)
        }
      />

      <div className="fixed top-24 left-32 -translate-x-1/2 px-6 py-3 bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl z-50 transition-all duration-300">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold">
            Total Plants
          </span>
          <span
            key={hoveredWallet || selectedWallet}
            className="text-sm font-mono text-gray-800 break-all text-center max-w-[300px] animate-in fade-in slide-in-from-bottom-1 duration-500"
          >
            {gData.length}
          </span>
        </div>
      </div>

      {(hoveredWallet || selectedWallet) && (
        <Link
          href={`/network/${hoveredWallet || selectedWallet}`}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl z-50 transition-all duration-300"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold">
              View Plant
            </span>
            <span
              key={hoveredWallet || selectedWallet}
              className="text-sm font-mono text-gray-800 break-all text-center max-w-[300px] animate-in fade-in slide-in-from-bottom-1 duration-500"
            >
              {hoveredWallet || selectedWallet}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
}
