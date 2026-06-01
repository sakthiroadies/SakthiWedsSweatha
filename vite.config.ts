// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
/// <reference types="node" />
/* global process */
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const basePath = process.env.VITE_BASE_PATH ?? "/SakthiWedsSweatha/";
const normalizedBasePath = basePath.endsWith("/") ? basePath : `${basePath}/`;
const routeBasePath =
  normalizedBasePath === "/" ? "/" : normalizedBasePath.slice(0, -1);
const prerenderOutputPath =
  routeBasePath === "/" ? "/index" : `${routeBasePath}/index`;

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // GitLab Pages is static hosting, so ship a TanStack SPA shell with the
    // router hydration data intact instead of relying on a server-rendered page.
    spa: {
      enabled: true,
      maskPath: normalizedBasePath,
      prerender: { outputPath: prerenderOutputPath },
    },
  },
  nitro: false,
  vite: {
    base: normalizedBasePath,
  },
});
