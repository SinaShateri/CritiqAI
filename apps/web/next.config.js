/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
    ],
  },
  cacheComponents: true,
  experimental: {
    inlineCss: true,
    staleTimes: {
      dynamic: 30,
    },
  },
  reactCompiler: true,
  typedRoutes: false,
};

export default nextConfig;
