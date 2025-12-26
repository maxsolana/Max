# $MAX Token Presale - Static Deployment Guide

## Overview
This is a cryptocurrency token presale landing page for "$MAX Token" on Solana. It is a static web app optimized for GitHub Pages.

## Deployment Instructions
1. Run `npm run build`.
2. The `dist/` folder contains your static site.
3. For GitHub Pages (root of main branch):
   - Move all files from `dist/` to the root of your repository.
   - Ensure `index.html` is at the root.
   - All assets (JS/CSS) will load correctly from the `assets/` folder.

## Technical Details
- **Routing**: Uses `HashRouter` via `wouter` for 100% compatibility with static hosting.
- **Base Path**: Configured as `./` in `vite.config.ts`.
- **Assets**: All images and the `404.html` are served from the `/public` directory.
