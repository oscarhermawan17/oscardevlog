import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-sanity", "sanity"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
