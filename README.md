# DataOS Sample Documentation

This repository contains a Docusaurus-powered documentation site tailored for the DataOS platform. It showcases a polished landing page, dark/light theme support, and custom styling that matches enterprise branding needs.

## Features

- **Doc-only Mode**&nbsp;– the documentation itself is the homepage so readers land on the intro article immediately.
- **Custom Styling**&nbsp;– bespoke CSS tuned for both light and dark modes, including callouts, cards, tables, and code snippets.
- **Responsive Layout**&nbsp;– optimized typography and spacing for desktop and mobile widths.
- **Ready for Expansion**&nbsp;– structured sidebar, reusable image helpers, and Markdown guidance for extending the site.

## Getting Started

```bash
# install dependencies
npm install

# run the dev server
npm start

# build the static site
npm run build

# locally preview the production build
npm run serve
```

The dev server defaults to <http://localhost:3000/dataos-docs-demo/>. Stop any existing process on port 3000 before starting a new session.

## Project Structure

- `docs/` – Markdown/MDX content, with `intro.md` acting as the home page.
- `sidebars.js` – sidebar definition for the documentation.
- `src/css/custom.css` – theme overrides and custom utility classes.
- `static/` – assets such as images and favicons copied verbatim to the output.
- `docusaurus.config.js` – site metadata, navbar/footer setup, and preset configuration.

## Deploying to GitHub Pages

If you want to host the docs on GitHub Pages:

1. Set the `organizationName`, `projectName`, `url`, and `baseUrl` in `docusaurus.config.js` to match your GitHub account.
2. Enable the GitHub Pages deployment scripts in `package.json` (Docusaurus provides `docusaurus deploy`).  
3. Run `GIT_USER=<your-username> npm run deploy` (for HTTPS) or configure a deploy key/SSH setup for git pushes.

## License

This project currently does not define a license. Add one before sharing or accepting outside contributions.
