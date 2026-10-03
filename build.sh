#!/usr/bin/env bash
# One explicit Docker environment for install, production build and local development.
set -euo pipefail
cd "$(dirname "$0")"
mode="${1:-build}"
args=(--rm -v "jekyll_gems:/usr/local/bundle" -v "$PWD:/srv/jekyll" -w /srv/jekyll
  -e JEKYLL_ENV=production -e PAGES_REPO_NWO=lyimeng23/lyimeng23.github.io)
case "$mode" in
  install) docker run "${args[@]}" jekyll/jekyll:4 bundle install ;;
  build) docker run "${args[@]}" jekyll/jekyll:4 bundle exec jekyll build ;;
  serve) docker run "${args[@]}" -p 4000:4000 jekyll/jekyll:4 bundle exec jekyll serve --host 0.0.0.0 ;;
  *) echo 'Usage: ./build.sh [install|build|serve]' >&2; exit 2 ;;
esac
