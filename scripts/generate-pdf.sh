#!/usr/bin/env bash
set -euo pipefail

PORT=3001
OUTPUT="iec-checker-docs.pdf"

cd "$(dirname "$0")/.."

echo "==> Building site"
npx docusaurus build

echo "==> Starting server on port $PORT"
npx docusaurus serve --port "$PORT" &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null" EXIT

# Wait for server to be ready
for i in $(seq 1 20); do
  curl -sf "http://localhost:$PORT/docs/intro" -o /dev/null && break
  sleep 1
done

echo "==> Generating PDF"
PUPPETEER_EXECUTABLE_PATH="${PUPPETEER_EXECUTABLE_PATH:-/usr/bin/chromium}" \
npx docs-to-pdf d \
  --initialDocURLs "http://localhost:$PORT/docs/intro" \
  --contentSelector "article" \
  --paginationSelector "a.pagination-nav__link--next" \
  --excludeSelectors ".margin-vert--xl a,.theme-doc-footer,.pagination-nav" \
  --coverTitle "iec-checker" \
  --coverSub "Static analyzer for IEC 61131-3" \
  --outputPDFFilename "$OUTPUT" \
  --paperFormat "A4" \
  --cssStyle ".toc-item-3,.toc-item-4,.toc-item-5,.toc-item-6{display:none}" \
  --puppeteerArgs "--no-sandbox"

echo "==> Done: $OUTPUT ($(du -h "$OUTPUT" | cut -f1))"
