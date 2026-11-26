/** @type {import('next').NextConfig} */
const nextConfig = {
  // /_next/image désactivé : neutralise les failles critiques de l'Image Optimization API
  // (npm audit, branche 14.2 sans correctif). La landing n'utilise pas next/image.
  images: { unoptimized: true },
}

module.exports = nextConfig
