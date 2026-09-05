#!/usr/bin/env bash
# Installs deploy/fatevend.service as a systemd unit — fills in the current
# repo's absolute path and a target user automatically, no manual editing.
#
# Usage:
#   sudo bash deploy/install.sh              # runs as whoever invoked sudo
#   sudo bash deploy/install.sh someuser     # runs as someuser instead
set -euo pipefail

if [[ $EUID -ne 0 ]]; then
  echo "Installing a systemd unit requires root — re-run with sudo:" >&2
  echo "  sudo bash $0 ${1:-}" >&2
  exit 1
fi

if ! command -v systemctl &>/dev/null; then
  echo "systemctl not found — this installer only supports systemd-based Linux." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if [[ ! -f "$REPO_ROOT/web/serve.sh" ]]; then
  echo "Couldn't find web/serve.sh under $REPO_ROOT — is deploy/install.sh still inside the repo?" >&2
  exit 1
fi

TARGET_USER="${1:-${SUDO_USER:-}}"
if [[ -z "$TARGET_USER" || "$TARGET_USER" == "root" ]]; then
  echo "Couldn't determine which non-root user should run the service." >&2
  echo "Pass one explicitly: sudo bash $0 <username>" >&2
  exit 1
fi
if ! id "$TARGET_USER" &>/dev/null; then
  echo "User '$TARGET_USER' does not exist." >&2
  exit 1
fi

UNIT_SRC="$SCRIPT_DIR/fatevend.service"
UNIT_DST="/etc/systemd/system/fatevend.service"

sed "s|__FATEVEND_USER__|$TARGET_USER|g; s|__FATEVEND_REPO__|$REPO_ROOT|g" "$UNIT_SRC" > "$UNIT_DST"

echo "Installed $UNIT_DST"
echo "  User=$TARGET_USER"
echo "  Repo=$REPO_ROOT"
echo

systemctl daemon-reload
systemctl enable fatevend.service
systemctl restart fatevend.service   # starts it if not already running, restarts it if it was

sleep 1
systemctl status fatevend.service --no-pager || true

echo
echo "Logs:    journalctl -u fatevend -f"
echo "Stop:    sudo systemctl stop fatevend"
echo "Restart: sudo systemctl restart fatevend"
