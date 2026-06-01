# SakthiWedsSweatha

Static wedding invitation site built with Vite and TanStack Start.

## GitLab Pages

The repo includes a `.gitlab-ci.yml` pipeline that builds the site with Bun and publishes `dist/client` to GitLab Pages.

By default, the app is built for this Pages URL path:

```text
/SakthiWedsSweatha/
```

If your GitLab project path is different, update `VITE_BASE_PATH` in `.gitlab-ci.yml` to match the URL path GitLab Pages gives you. For example:

```yaml
variables:
  VITE_BASE_PATH: "/your-project-path/"
```

For a user or group Pages root project such as `namespace.gitlab.io`, use:

```yaml
variables:
  VITE_BASE_PATH: "/"
```

To test the production build locally:

```sh
bun install
bun run build
bun run pages:postbuild
bun run preview
```
