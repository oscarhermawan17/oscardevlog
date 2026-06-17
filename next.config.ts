import path from "path";
import { createRequire } from "module";
import type { NextConfig } from "next";

const require = createRequire(import.meta.url);

// Cari workspace root dari lokasi next/package.json yang ter-resolve
// Ini otomatis naik ke parent dir yang punya node_modules
const workspaceRoot = path.resolve(require.resolve("next/package.json"), "../../..");

const nextConfig: NextConfig = {
  transpilePackages: ["next-sanity", "sanity"],
  turbopack: {
    root: workspaceRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
