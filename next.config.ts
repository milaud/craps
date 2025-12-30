import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/craps',
  assetPrefix: '/craps/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
