# Portfolio

Personal portfolio website built with React, TypeScript, and Vite.

## Development

```bash
npm install
npm start
```

Runs the dev server at http://localhost:5173/.

## Build

```bash
npm run build
```

Outputs a production build to `dist/`.

## Deploy

Pushes to `main` are built and deployed by the GitHub Pages workflow in
`.github/workflows/deploy.yml`.

In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
The production site is served from the root of the `rakeen.dev` custom domain.
