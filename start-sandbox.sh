#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-4173}"

cat <<MSG
Starting Cookie Clicker sandbox...
Open in your browser:
  - http://127.0.0.1:${PORT}/
  - http://127.0.0.1:${PORT}/cookie-clicker.html
Press Ctrl+C to stop.
MSG

python3 -m http.server "${PORT}"
