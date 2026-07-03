#!/bin/bash
# Deploy Next Stop to Cloudflare Pages (next-stop.pages.dev / dn.aastar.io)
# Auth: wrangler saved OAuth at ~/.wrangler/config/default.toml (auto-refreshes)
set -e

cd "$(dirname "$0")"

echo "🌐 Deploying to Cloudflare Pages..."
wrangler pages deploy . \
  --project-name=next-stop \
  --branch=main \
  --commit-dirty=true

echo "✅ Deploy complete — https://next-stop.pages.dev"
