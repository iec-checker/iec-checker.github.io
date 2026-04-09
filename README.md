# iec-checker.github.io

Source for the [iec-checker](https://github.com/iec-checker/iec-checker) documentation site, served at https://iec-checker.github.io/.

Built with [Docusaurus](https://docusaurus.io/).

## Local development

```bash
yarn install
yarn start
```

Opens a dev server at `http://localhost:3000` with hot reload.

## Production build

```bash
yarn build
```

Static output lands in `./build/`. Verify locally with `yarn serve`.

The build is configured with `onBrokenLinks: 'throw'` and `onBrokenMarkdownLinks: 'throw'` — any broken link fails CI.

## Deployment

Pushes to `master` are deployed automatically by `.github/workflows/deploy.yml`, which builds the site and force-pushes the result to the `gh-pages` branch. GitHub Pages then serves it at https://iec-checker.github.io/.
