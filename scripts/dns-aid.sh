#!/usr/bin/env bash
#
# Publish the DNS-AID (DNS for AI Discovery) entry-point record for
# abdullahmohamed.dev on Cloudflare, then verify it the way the auditor does.
#
# DNS is the one part of this site's agent surface that lives nowhere in the
# repo, so it lives here instead — run it, or copy the record out of it and
# paste it into the Cloudflare dashboard by hand.
#
#   draft-mozleywilliams-dnsop-dnsaid  (Internet-Draft, not a standard)
#   RFC 9460                           (SVCB/HTTPS RRs)
#
# Usage:
#   CF_API_TOKEN=... ./scripts/dns-aid.sh apply    # create or update the record
#   ./scripts/dns-aid.sh verify                    # no token needed
#
# The token needs exactly one permission: Zone → DNS → Edit, scoped to
# abdullahmohamed.dev. Create it at
# https://dash.cloudflare.com/profile/api-tokens
#
set -euo pipefail

ZONE="abdullahmohamed.dev"
NAME="_index._agents.${ZONE}"
TARGET="www.${ZONE}"
TTL=3600
PRIORITY=1

# alpn is what the target actually negotiates — verified with
#   openssl s_client -alpn h2 -connect www.abdullahmohamed.dev:443
#   curl -sI https://www.abdullahmohamed.dev/ | grep -i alt-svc   # h3=":443"
# Do not add an agent protocol here (a2a, mcp). There is no agent endpoint;
# claiming one in DNS would send agents to a handshake that never answers.
PARAMS_FULL='alpn="h3,h2" port=443 mandatory=alpn,port'
PARAMS_MIN='alpn="h3,h2" port=443'

# api <METHOD> <path> [json-body]
# The body must be passed as a single argv element — an unquoted ${3:+--data $3}
# would word-split the JSON on its spaces and send garbage.
api() {
  local method="$1" path="$2"
  local args=(-sS -X "$method" "https://api.cloudflare.com/client/v4${path}"
    -H "Authorization: Bearer ${CF_API_TOKEN}"
    -H "Content-Type: application/json")
  if [ "$#" -ge 3 ]; then args+=(--data "$3"); fi
  curl "${args[@]}"
}

# ok <json>  -> prints "1" when the Cloudflare envelope reports success
ok() { printf '%s' "$1" | python3 -c 'import json,sys; print(1 if json.load(sys.stdin).get("success") else "")'; }
err() { printf '%s' "$1" | python3 -c "import json,sys; e=json.load(sys.stdin).get('errors') or []; print('; '.join(f\"{x.get('code')}: {x.get('message')}\" for x in e) or 'unknown error')"; }
field() { printf '%s' "$1" | python3 -c "import json,sys; d=json.load(sys.stdin)['result']; d=d[0] if isinstance(d,list) else d; print(d.get('$2',''))"; }
count() { printf '%s' "$1" | python3 -c 'import json,sys; print(len(json.load(sys.stdin).get("result") or []))'; }

payload() {
  PARAMS="$1" python3 - <<'PY'
import json, os
print(json.dumps({
    "type": "SVCB",
    "name": os.environ["NAME"],
    "ttl": int(os.environ["TTL"]),
    "comment": "DNS-AID entry point (draft-mozleywilliams-dnsop-dnsaid)",
    "data": {
        "priority": int(os.environ["PRIORITY"]),
        "target": os.environ["TARGET"],
        "value": os.environ["PARAMS"],
    },
}))
PY
}

apply() {
  : "${CF_API_TOKEN:?set CF_API_TOKEN (Zone → DNS → Edit on ${ZONE})}"
  export NAME TTL PRIORITY TARGET

  echo "→ resolving zone id for ${ZONE}"
  local zones zone_id
  zones=$(api GET "/zones?name=${ZONE}")
  [ -n "$(ok "$zones")" ] || { echo "✗ zone lookup failed: $(err "$zones")" >&2; exit 1; }
  [ "$(count "$zones")" != "0" ] || { echo "✗ token cannot see zone ${ZONE}" >&2; exit 1; }
  zone_id=$(field "$zones" id)

  echo "→ checking for an existing SVCB at ${NAME}"
  local existing record_id method path
  existing=$(api GET "/zones/${zone_id}/dns_records?type=SVCB&name=${NAME}")
  if [ "$(count "$existing")" != "0" ]; then
    record_id=$(field "$existing" id)
    method=PUT; path="/zones/${zone_id}/dns_records/${record_id}"
    echo "  found ${record_id} — updating in place"
  else
    method=POST; path="/zones/${zone_id}/dns_records"
    echo "  none — creating"
  fi

  # `mandatory` is in the DNS-AID skill's example but is not one of the
  # SvcParams Cloudflare's validator is documented to accept, and it changes
  # nothing for a client that already understands alpn and port. Try it, and
  # fall back rather than failing the whole run.
  local res
  res=$(api "$method" "$path" "$(payload "$PARAMS_FULL")")
  if [ -z "$(ok "$res")" ]; then
    echo "  ! rejected with mandatory=alpn,port ($(err "$res")) — retrying without it"
    res=$(api "$method" "$path" "$(payload "$PARAMS_MIN")")
  fi
  [ -n "$(ok "$res")" ] || { echo "✗ write failed: $(err "$res")" >&2; exit 1; }

  echo "✓ published: $(field "$res" name) SVCB $(field "$res" content)"
  echo
  echo "DNSSEC is a separate, manual step — see docs/agent-readiness.md."
  echo "Propagation is up to the TTL (${TTL}s); re-run 'verify' in a minute."
}

# SVCB RDATA arrives as RFC 3597 unknown-type hex ("\# 61 0001...") from both
# dig and the DoH API, because macOS ships DiG 9.10.6 — which predates SVCB and
# will silently answer a `dig SVCB <name>` with the A records of <name>. Query
# TYPE64 and decode the wire format here instead of trusting the resolver to
# pretty-print it.
# decode <rdata>  — data comes in as $1, not on stdin, because the decoder
# itself is fed to python3 on stdin via the heredoc.
decode() {
  RDATA="${1:-}" python3 - <<'PY'
import os, re, sys

KEYS = {0: "mandatory", 1: "alpn", 2: "no-default-alpn", 3: "port",
        4: "ipv4hint", 5: "ech", 6: "ipv6hint", 7: "dohpath"}
HEX = set("0123456789abcdefABCDEF")
raw = os.environ.get("RDATA", "").strip()

if not raw:
    print("   (no record)"); sys.exit()

# RFC 3597 unknown-type form is "\# <length> <hex...>". The length token is
# itself valid hex, so it has to be removed before filtering, not after.
m = re.match(r"\\#\s+(\d+)\s+(.*)", raw, re.S)
if not m:
    # A dig new enough to know SVCB already pretty-printed it.
    print("   " + " ".join(raw.split())); sys.exit()

want = int(m.group(1))
b = bytes.fromhex("".join(c for c in m.group(2) if c in HEX))
if len(b) != want:
    print(f"   (malformed: {len(b)} bytes, header claims {want})"); sys.exit()

prio = int.from_bytes(b[:2], "big")
i, labels = 2, []
while i < len(b) and b[i]:
    n = b[i]; labels.append(b[i + 1:i + 1 + n].decode()); i += 1 + n
i += 1
target = ".".join(labels) + "." if labels else "."

out = []
while i + 4 <= len(b):
    k = int.from_bytes(b[i:i + 2], "big")
    ln = int.from_bytes(b[i + 2:i + 4], "big")
    v = b[i + 4:i + 4 + ln]
    i += 4 + ln
    name = KEYS.get(k, "key%d" % k)
    if name == "alpn":
        parts, j = [], 0
        while j < len(v):
            parts.append(v[j + 1:j + 1 + v[j]].decode()); j += 1 + v[j]
        out.append('alpn="%s"' % ",".join(parts))
    elif name == "port":
        out.append("port=%d" % int.from_bytes(v, "big"))
    elif name == "mandatory":
        out.append("mandatory=" + ",".join(
            KEYS.get(int.from_bytes(v[j:j + 2], "big"), "?")
            for j in range(0, len(v), 2)))
    elif name == "no-default-alpn":
        out.append(name)
    else:
        out.append("%s=%s" % (name, v.hex()))

print("   %d %s %s" % (prio, target, " ".join(out)))
PY
}

verify() {
  local ns
  ns=$(dig +short NS "$ZONE" | head -1)
  echo "→ authoritative (${ns%.})"
  decode "$(dig +short TYPE64 "$NAME" @"${ns}" 2>/dev/null)"
  echo
  echo "→ public resolver"
  decode "$(dig +short TYPE64 "$NAME" 2>/dev/null)"
  echo
  # The auditor resolves over DoH via Cloudflare, falling back to Google, and
  # reads the AD flag for the DNSSEC half. Query it the same way it does.
  echo "→ DNS-over-HTTPS (what the auditor sees)"
  local doh
  doh=$(curl -sS -H 'accept: application/dns-json' \
    "https://cloudflare-dns.com/dns-query?name=${NAME}&type=SVCB&do=1")
  printf '%s' "$doh" | python3 -c 'import json,sys; print("   AD (DNSSEC-validated):", json.load(sys.stdin).get("AD"))'
  decode "$(printf '%s' "$doh" | python3 -c 'import json,sys; print("\n".join(a.get("data","") for a in (json.load(sys.stdin).get("Answer") or [])))')"
  echo
  echo "→ DS at the parent (empty = zone is unsigned)"
  dig +short DS "$ZONE" | sed 's/^/   /' || true
}

case "${1:-verify}" in
  apply)  apply ;;
  verify) verify ;;
  *) echo "usage: $0 [apply|verify]" >&2; exit 2 ;;
esac
