import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Served as AVIF/WebP at the visitor's screen size, so the heavy originals are never sent as-is.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    deviceSizes: [640, 828, 1080, 1440, 1920, 2400],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
