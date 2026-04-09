/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export — produces /out directory that any static host
  // (Cloudflare Pages, Netlify, GitHub Pages, S3) can serve as-is.
  output: "export",
  // Required for static export — disable Next/Image optimization since
  // there's no Node server to optimize on the fly.
  images: { unoptimized: true },
  // Cloudflare Pages serves index.html from each route directory by default,
  // so trailing slashes keep deep links working without server rewrites.
  trailingSlash: true,
};

export default nextConfig;
