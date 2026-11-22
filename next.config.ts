import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1440, 1920, 2560],
    // 75 es el valor por defecto; 90 solo lo usa la foto de "Por qué elegirnos" (original chico)
    qualities: [75, 90],
  },
};

export default nextConfig;
