// Writes a fresh build stamp to public/version.json before every build.
// The client polls this file (network-only, never cached) so it can tell
// when a newer deploy has landed while the tab is still open.
const fs = require("fs");
const path = require("path");

const version = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const outPath = path.join(__dirname, "..", "public", "version.json");

fs.writeFileSync(outPath, JSON.stringify({ version }), "utf8");
console.log(`[gen-version] wrote ${outPath} -> ${version}`);
