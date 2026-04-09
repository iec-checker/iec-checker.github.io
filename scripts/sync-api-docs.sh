#!/usr/bin/env bash
set -euo pipefail

# Syncs odoc-generated API documentation from the iec-checker repo
# into static/api/ so Docusaurus serves it as plain HTML.

IEC_CHECKER_DIR="${IEC_CHECKER_DIR:-$HOME/Dev/iec-checker}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEST_DIR="$(cd "$SCRIPT_DIR/.." && pwd)/static/api"

if [ ! -d "$IEC_CHECKER_DIR" ]; then
  echo "ERROR: iec-checker repo not found at $IEC_CHECKER_DIR"
  echo "Set IEC_CHECKER_DIR to override."
  exit 1
fi

echo "==> Building odoc in $IEC_CHECKER_DIR..."
(cd "$IEC_CHECKER_DIR" && make doc)

ODOC_HTML="$IEC_CHECKER_DIR/_build/default/_doc/_html"
if [ ! -d "$ODOC_HTML" ]; then
  echo "ERROR: odoc output not found at $ODOC_HTML"
  exit 1
fi

# Collect metadata
VERSION=$(grep '(version' "$IEC_CHECKER_DIR/dune-project" | sed 's/.*version \(.*\))/\1/')
COMMIT=$(cd "$IEC_CHECKER_DIR" && git rev-parse HEAD)
COMMIT_SHORT=$(cd "$IEC_CHECKER_DIR" && git rev-parse --short HEAD)
COMMIT_DATE=$(cd "$IEC_CHECKER_DIR" && git log -1 --format=%ci HEAD)
GEN_DATE=$(date -u '+%Y-%m-%d %H:%M:%S UTC')
GITHUB_URL="https://github.com/iec-checker/iec-checker"

echo "==> Syncing odoc output to $DEST_DIR..."
rm -rf "$DEST_DIR"
cp -r "$ODOC_HTML" "$DEST_DIR"

# Inject metadata banner into all index.html files
python3 "$SCRIPT_DIR/inject-banner.py" \
  "$DEST_DIR" "$VERSION" "$COMMIT" "$COMMIT_SHORT" \
  "${COMMIT_DATE%% *}" "$GEN_DATE" "$GITHUB_URL"

echo "==> Done. API docs at $DEST_DIR"
echo "    Version: $VERSION"
echo "    Commit:  $COMMIT_SHORT ($COMMIT_DATE)"
echo "    Generated: $GEN_DATE"
