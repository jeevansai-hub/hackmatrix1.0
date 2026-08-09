import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['localhost', '127.0.0.1', '127.0.0.1:3000', 'localhost:3000'],
};

export default nextConfig;
