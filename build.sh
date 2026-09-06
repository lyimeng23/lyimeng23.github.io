#!/usr/bin/env bash
# Local development: run the site with live reload.
# Requires Docker (system Ruby is too old for the github-pages stack).
set -euo pipefail
cd "$(dirname "$0")"

docker run --rm \
  -v "jekyll_gems:/usr/local/bundle" \
  -v "$PWD":/srv/jekyll \
  -p 4000:4000 \
  -e JEKYLL_ENV=production \
  -e PAGES_REPO_NWO=lyimeng23/lyimeng23.github.io \
  jekyll/jekyll:4 \
  bundle exec jekyll serve --host 0.0.0.0