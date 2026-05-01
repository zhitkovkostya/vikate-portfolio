/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL('https://images.ctfassets.net/**')],
    dangerouslyAllowSVG: true
  },
};

export default nextConfig;
