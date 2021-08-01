import fs from "fs/promises";
import path from "path";

async function main() {
  await Promise.all([rmrf("build"), rmrf("coverage"), rmrf(".nyc_output")]);
}

async function rmrf(pathFromRoot: string): Promise<void> {
  await fs.rm(path.join(__dirname, "../", pathFromRoot), {
    recursive: true,
    force: true,
  });
}

if (require.main === module) {
  main();
}
