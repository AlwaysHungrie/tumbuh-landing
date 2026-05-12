import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/pitch-deck",
        destination: "https://tumbuh-pitch.vercel.app",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
