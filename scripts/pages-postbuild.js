import fs from "fs";
import path from "path";

const outputPath = path.resolve("dist/client/index.html");
if (!fs.existsSync(outputPath)) {
  console.error("Expected TanStack SPA shell not found:", outputPath);
  process.exit(1);
}

const html = fs.readFileSync(outputPath, "utf8");
if (!html.includes("$_TSR")) {
  console.error("Static Pages shell is missing TanStack hydration data.");
  process.exit(1);
}
console.log("Verified", outputPath);

const notFoundPath = path.resolve("dist/client/404.html");
fs.writeFileSync(notFoundPath, html);
console.log("Generated", notFoundPath);

const noJekyllPath = path.resolve("dist/client/.nojekyll");
fs.writeFileSync(noJekyllPath, "");
console.log("Generated", noJekyllPath);
