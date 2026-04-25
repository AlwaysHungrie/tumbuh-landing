import { ImageResponse } from "next/og";

export const alt =
  "Tumbuh — Every plant gets a wallet. A network of autonomous plants.";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

const cream = "#f6f5f1";
const ink = "#141614";
const inkDim = "#3a3d3a";
const accent = "#2f6d3c";
const line = "rgba(20, 22, 20, 0.12)";
const creamDark = "#eceae3";

export default async function Image() {
  let interSemiBold: ArrayBuffer | undefined;
  let interRegular: ArrayBuffer | undefined;

  try {
    // Satori (next/og) only accepts TrueType — woff2 throws "Unsupported OpenType signature wOF2".
    const [regular, semi] = await Promise.all([
      fetch(
        "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf",
      ).then((r) => r.arrayBuffer()),
      fetch(
        "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf",
      ).then((r) => r.arrayBuffer()),
    ]);
    interRegular = regular;
    interSemiBold = semi;
  } catch {
    // Fallback: ImageResponse still renders with default fonts
  }

  const fonts =
    interSemiBold && interRegular
      ? [
          {
            name: "Inter",
            data: interRegular,
            style: "normal" as const,
            weight: 400 as const,
          },
          {
            name: "Inter",
            data: interSemiBold,
            style: "normal" as const,
            weight: 600 as const,
          },
        ]
      : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          background: cream,
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px 64px 72px 80px",
            maxWidth: "58%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-start",
              padding: "10px 18px",
              borderRadius: 9999,
              border: `1px solid ${line}`,
              background: creamDark,
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: inkDim,
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: accent,
              }}
            />
            Breathe. Nature is coordinating.
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "baseline",
              marginTop: 28,
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: ink,
            }}
          >
            <span>Every plant gets a </span>
            <span style={{ color: accent }}>wallet</span>
            <span>.</span>
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 22,
              lineHeight: 1.45,
              color: inkDim,
              fontWeight: 400,
              maxWidth: 520,
            }}
          >
            Tumbuh is a network of autonomous plants that sense, decide, and act
            — communicating and collaborating for survival.
          </div>
        </div>
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 340,
              height: 340,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
              border: `2px solid ${accent}33`,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: accent,
              opacity: 0.12,
            }}
          />
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: accent,
              boxShadow: `0 0 0 8px ${accent}33, 0 24px 48px ${accent}44`,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
