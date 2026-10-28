#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Compilando demo en /vinilo..."
PUBLIC_SITE=https://demos.emp2web.com PUBLIC_BASE=/vinilo npm run build

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
cp -a dist/. "$tmp/"
touch "$tmp/.nojekyll"

cd "$tmp"
git init -q -b gh-pages
git add -A
git -c user.name="Gestiona2" -c user.email="gestiona2@users.noreply.github.com" \
  commit -q -m "Publicar demo MDL Vinilocol $(date '+%Y-%m-%d %H:%M')"
git remote add origin https://github.com/Gestiona2/vinilo.git
git -c credential.helper= -c credential.helper='!gh auth git-credential' \
  push -q -f origin gh-pages

echo "Demo publicada: https://demos.emp2web.com/vinilo/"
