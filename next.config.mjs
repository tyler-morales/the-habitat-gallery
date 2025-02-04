/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/habitat-gallery" : "",
  images: {
    domains: ["wallpaperbat.com"], // Allow external images from this domain
  },
};

export default nextConfig;
