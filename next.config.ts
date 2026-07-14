import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: ['192.168.0.26','192.168.0.24'],
  output: "standalone",
};

export default nextConfig;
