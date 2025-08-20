import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignore TypeScript build errors during production build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint build errors during production build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
