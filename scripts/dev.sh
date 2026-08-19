#!/usr/bin/env bash
# Starts the Express server and the Next.js web app together for local dev.
set -e
cd "$(dirname "$0")/.."

cleanup() {
  kill 0
}
trap cleanup EXIT INT TERM

npm run dev:server &
npm run dev:web &

wait
