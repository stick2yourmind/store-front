/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.BACK_APP_HOSTNAME,
      },
    ],
  },
};

export default nextConfig;
