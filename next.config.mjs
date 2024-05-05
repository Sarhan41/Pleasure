/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "(link unavailable)",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/(.*)",
        destination: "/app/layout.tsx",
      },
    ];
  },
};

export default nextConfig;
