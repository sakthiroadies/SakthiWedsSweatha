import fs from "fs";
import path from "path";

const BASE_PATH = "/SakthiWedsSweatha";
const assetsDir = path.resolve("dist/client/assets");

if (!fs.existsSync(assetsDir)) {
  console.error("Assets directory not found:", assetsDir);
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);

// Find CSS files
const cssFiles = files.filter((f) => f.endsWith(".css"));
const cssTags = cssFiles
  .map((f) => `    <link rel="stylesheet" crossorigin href="${BASE_PATH}/assets/${f}" />`)
  .join("\n");

// Find the main JS entry point — the bundle that contains React DOM mounting code
const jsFiles = files.filter((f) => f.endsWith(".js"));
let entryJs = null;
for (const jsFile of jsFiles) {
  const content = fs.readFileSync(path.join(assetsDir, jsFile), "utf8");
  if (content.includes("createRoot") || content.includes("hydrateRoot")) {
    entryJs = jsFile;
    break;
  }
}

if (!entryJs) {
  console.error("Could not find the main JS entry point.");
  process.exit(1);
}

const scriptTag = `    <script type="module" crossorigin src="${BASE_PATH}/assets/${entryJs}"></script>`;

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sakthivel & Sweatha — Wedding Invitation</title>
    <meta name="description" content="Together with our families, we joyfully invite you to celebrate the wedding of R. Sakthivel and V. Sweatha — 17th & 18th June 2026, Vellore." />
    <meta property="og:title" content="Sakthivel & Sweatha — Wedding Invitation" />
    <meta property="og:description" content="Join us in celebrating our wedding on the 17th & 18th of June 2026 at Sri Narayani Mahal, Vellore." />
    <meta property="og:type" content="website" />
${cssTags}
  </head>
  <body>
    <div id="root"></div>
${scriptTag}
  </body>
</html>
`;

const outputPath = path.resolve("dist/client/index.html");
fs.writeFileSync(outputPath, html);
console.log("Generated", outputPath);
