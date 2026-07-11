import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  turbopack: {
    root,
  },
};

export default nextConfig;
