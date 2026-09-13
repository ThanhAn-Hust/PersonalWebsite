import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "waves-innovations-gabriel-luxury.trycloudflare.com",
  ],
}

export default nextConfig
