import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/chamber/servant',
        destination: '/chamber/vessel',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
