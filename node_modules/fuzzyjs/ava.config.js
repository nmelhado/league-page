export default {
  files: ["src/**/__tests__/*.test.ts"],
  extensions: ["ts"],
  nodeArguments: ["-r", "./esbuild-hook"],
};
