#!/usr/bin/env node
/**
 * Build script - generates HTML and converts to PNG in one command
 */

console.log("🎨 App Store Screenshot Generator\n");

import { spawnSync } from "node:child_process";
import process from "node:process";

// Step 1: Generate HTML
console.log("Step 1/2: Generating HTML files from config...\n");
const generateResult = spawnSync("npm", ["run", "generate"], {
  stdio: "inherit",
  shell: true,
});

if (generateResult.status !== 0) {
  console.error("\n❌ Failed to generate HTML files");
  process.exit(1);
}

console.log("\n─────────────────────────────────────────\n");

// Step 2: Convert to PNG
console.log("Step 2/2: Converting HTML to PNG...\n");
const convertResult = spawnSync("npm", ["run", "convert"], {
  stdio: "inherit",
  shell: true,
});

if (convertResult.status !== 0) {
  console.error("\n❌ Failed to convert to PNG");
  process.exit(1);
}

console.log("\n✨ All done! Screenshots are ready in output/images/\n");
