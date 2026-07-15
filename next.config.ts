import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",

  // ✅ Allow local dev origins
  allowedDevOrigins: ["192.168.0.26", "192.168.0.24"],

  // ✅ VERY IMPORTANT: External images allow karo
  images: {
    domains: ["api.emotales.com"],

    // optional but useful
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.emotales.com",
        pathname: "/uploads/**",
      },
    ],
  },

  // ✅ Add headers to avoid cross-origin block
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;