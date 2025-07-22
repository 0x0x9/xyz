import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: [
    'https://*.cloudworkstations.dev',
    'http://localhost:9002',
    'http://0.0.0.0:9002',
    'http://localhost:3000',
    'http://0.0.0.0:3000',
  ],
};

export default nextConfig;
