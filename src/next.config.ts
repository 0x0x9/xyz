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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: [
    'https://6000-firebase-studio-1752953342322.cluster-jbb3mjctu5cbgsi6hwq6u4btwe.cloudworkstations.dev',
    'https://6000-firebase-studio-1753211210491.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev',
  ],
};

export default nextConfig;
