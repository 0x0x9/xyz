/** @type {import('next').NextConfig} */
const nextConfig = {
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
  webpack: (
    config,
    { isServer, nextRuntime, webpack }
  ) => {
    // Force `undici` to be server-side only. This is required for genkit.
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        undici: false,
      };
    }

    // Handle problematic server-side dependencies for Next.js.
    // This is a robust way to ensure that Node.js modules are not bundled incorrectly.
    if (isServer && nextRuntime === 'nodejs') {
      const externals = (config.externals || []).slice();
      config.externals = [
        (context, callback) => {
          const resource = context.request;
          // Exclude modules that start with '.' (relative paths) or are absolute paths
          if (!resource || resource.startsWith('.') || resource.startsWith('/')) {
            return callback();
          }
          // Exclude modules that Next.js needs to handle itself
          const a = new RegExp(`^(${['next', 'react', 'react-dom'].join('|')})`);
          if (a.test(resource)) {
            return callback();
          }
          // Externalize the rest
          return callback(null, `commonjs ${resource}`);
        },
        ...externals
      ];
    }

    return config;
  },
};

export default nextConfig;
