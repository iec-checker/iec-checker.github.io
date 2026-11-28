#!/usr/bin/env bash
# Usage: generate-pdf.sh [VERSION] [COMMIT]
set -euo pipefail

PORT=3001
OUTPUT="iec-checker-docs.pdf"

v="${1:-}"
c="${2:-}"
for x in "$v" "$c"; do
  [[ "$x" =~ ^[A-Za-z0-9._+-]*$ ]] || { echo "bad version/commit: '$x'" >&2; exit 1; }
done

if [[ -n "$v" && -n "$c" ]]; then l="$v ($c)"; else l="$v$c"; fi
m='<a href="https://github.com/iec-checker/iec-checker.github.io/issues">Report issue</a> | <a href="mailto:jubnzv@gmail.com">jubnzv@gmail.com</a>'
if [[ -n "$l" ]]; then m="$l | $(date +%F)<br>$m"; fi

# HACK: TOC levels come from raw <h1>/<h2>, blind to the sidebar. docs-to-pdf@1.4.0 prefixes anchors
# with the page slug: "#docs-detectors--" is the Detectors page, "#docs-detectors-<page>--" its children.
d='a[href^="#docs-detectors-"]:not([href^="#docs-detectors--"])'
o='a[href^="#docs-detectors--"]'
p='a[href^="#docs-detectors-plcopen-overview--"]'
s=".toc-item-3,.toc-item-4,.toc-item-5,.toc-item-6{display:none}"
s+=".toc-item-1:not(:has($d)),.toc-item-1:has($p){break-after:avoid}"
s+=".toc-item-2,.toc-item-1:has($d){margin:0 0 0 2.5em!important;line-height:1.35;list-style:disc}"
s+=".toc-item-2:has($d),.toc-item-2:has($o){display:none}"
s+=".toc-item-2:has($p){display:list-item!important;margin-left:5em!important;list-style:circle}"
s+=".pdf-cover{position:relative}"
s+=".pdf-cover .m{position:absolute;left:0;right:0;bottom:0;font-size:.8rem;font-weight:400;line-height:1.8}"

cd "$(dirname "$0")/.."

echo "==> Building site"
npx docusaurus build

echo "==> Starting server on port $PORT"
node_modules/.bin/docusaurus serve --port "$PORT" --no-open &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null" EXIT

for i in $(seq 1 20); do
  curl -sf "http://localhost:$PORT/docs/intro" -o /dev/null && break
  sleep 1
done

echo "==> Generating PDF"
# HACK: docs-to-pdf pastes --coverSub raw into an <h3>, so the bottom block rides in there
PUPPETEER_SKIP_DOWNLOAD=1 \
PUPPETEER_EXECUTABLE_PATH="${PUPPETEER_EXECUTABLE_PATH:-/usr/bin/chromium}" \
npx --yes docs-to-pdf@1.4.0 d \
  --initialDocURLs "http://localhost:$PORT/docs/intro" \
  --contentSelector "article" \
  --paginationSelector "a.pagination-nav__link--next" \
  --excludeSelectors ".margin-vert--xl a,.theme-doc-footer,.pagination-nav" \
  --coverTitle "iec-checker" \
  --coverSub "Static analyzer for IEC 61131-3<div class=\"m\">$m</div>" \
  --outputPDFFilename "$OUTPUT" \
  --paperFormat "A4" \
  --cssStyle "$s" \
  --puppeteerArgs "--no-sandbox"

echo "==> Done: $OUTPUT ($(du -h "$OUTPUT" | cut -f1))"
