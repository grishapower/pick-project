/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@pickem/api", "@pickem/config", "@pickem/shared"],
  /** We already do linting and typechecking as separate tasks in CI */
  // eslint: { ignoreDuringBuilds: !!process.env.CI },
  // typescript: { ignoreBuildErrors: !!process.env.CI },

  images: {
    remotePatterns: [
      {
        hostname: "cdn.pandascore.co",
      },
      {
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;
