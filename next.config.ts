import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: ['192.168.0.26','192.168.0.24'],
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.0.24",
        port: "3004",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://192.168.0.24:3004/uploads/:path*",
      },
      {
        source: "/avatars/:path*",
        destination: "http://192.168.0.24:3004/avatars/:path*",
      },
      {
        source: "/story-categories/:path*",
        destination: "http://192.168.0.24:3004/story-categories/:path*",
      },
    ];
  },
};

export default nextConfig;
