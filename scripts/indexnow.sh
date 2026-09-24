#!/usr/bin/env bash
# Submit every URL in the live sitemap to IndexNow (Bing, Yandex, Naver, Seznam
# — and through Bing, the index ChatGPT search reads). Run after a deploy has
# gone live; it is idempotent, so re-running is harmless.
#
#   scripts/indexnow.sh            # submit the whole sitemap
#   scripts/indexnow.sh /services/ # submit one path
#
# The key proves ownership of the host: IndexNow fetches
# https://www.abdullahmohamed.dev/<key>.txt and expects the key back. That file
# lives in public/ and is committed on purpose — the key is not a secret, it
# is a public claim that this site is the one submitting. Rotate by generating
# a new one (openssl rand -hex 16), replacing the file, and updating KEY below.
#
# Google does not take IndexNow; for Google, submit the sitemap once in Search
# Console (docs/seo.md) and it re-crawls on its own schedule.
set -euo pipefail

HOST="www.abdullahmohamed.dev"
KEY="d05ec98fd3b74b31916e2baab39127cd"
ENDPOINT="https://api.indexnow.org/IndexNow"

if [[ $# -gt 0 ]]; then
  urls=()
  for path in "$@"; do urls+=("https://${HOST}${path}"); done
else
  # Every <loc> in the sitemap. The sitemap is generated from the same route
  # list the site is built from, so this can't miss a page. (A while-read
  # loop rather than mapfile: macOS ships bash 3.2.)
  urls=()
  while IFS= read -r url; do urls+=("$url"); done < <(
    curl -fsS "https://${HOST}/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g'
  )
fi

if [[ ${#urls[@]} -eq 0 ]]; then
  echo "no URLs to submit" >&2
  exit 1
fi

# Confirm the key file is live before submitting — a wrong key is silently
# accepted with 200 and then ignored.
if [[ "$(curl -fsS "https://${HOST}/${KEY}.txt" | tr -d '[:space:]')" != "${KEY}" ]]; then
  echo "key file https://${HOST}/${KEY}.txt does not serve the key — deploy first" >&2
  exit 1
fi

payload=$(printf '%s\n' "${urls[@]}" | python3 -c '
import json, sys
urls = [line.strip() for line in sys.stdin if line.strip()]
print(json.dumps({
  "host": sys.argv[1],
  "key": sys.argv[2],
  "keyLocation": f"https://{sys.argv[1]}/{sys.argv[2]}.txt",
  "urlList": urls,
}))' "${HOST}" "${KEY}")

status=$(curl -sS -o /dev/null -w '%{http_code}' -X POST "${ENDPOINT}" \
  -H 'Content-Type: application/json; charset=utf-8' \
  --data "${payload}")

case "${status}" in
  200|202) echo "submitted ${#urls[@]} URL(s) — HTTP ${status}" ;;
  *) echo "IndexNow returned HTTP ${status}" >&2; exit 1 ;;
esac
