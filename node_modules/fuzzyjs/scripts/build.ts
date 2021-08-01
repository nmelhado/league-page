import path from "path";
import { build as esbuild } from "esbuild";

const baseConfig = {
  platform: "node" as const,
  target: "esnext" as const,
  format: "cjs" as const,
  bundle: true,
  nodePaths: [path.join(__dirname, "../src")],
  sourcemap: true,
  external: [],
};

async function main() {
  await esbuild({
    ...baseConfig,
    outdir: path.join(__dirname, "../build/cjs"),
    entryPoints: [path.join(__dirname, "../src/index.ts")],
  });

  await esbuild({
    ...baseConfig,
    format: "esm",
    outdir: path.join(__dirname, "../build/esm"),
    entryPoints: [path.join(__dirname, "../src/index.ts")],
  });
}

if (require.main === module) {
  main();
}
