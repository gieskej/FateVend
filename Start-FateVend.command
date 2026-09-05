#!/bin/bash
# Double-click this file to start FateVend on macOS.
#
# It exists so that running the app never requires opening Terminal, knowing
# what a shell is, or remembering where the download was unzipped. Finder runs
# a .command file by opening Terminal on it, which makes this the counterpart
# to double-clicking Start-FateVend.cmd on Windows.
#
# Everything it needs ships with macOS, though Python 3 arrives with Apple's
# Command Line Tools rather than the base system — serve.sh checks for that and
# prints how to get them. Node.js is optional and only enables the one-click
# "Import to AI Dungeon" button.
#
# macOS quarantines scripts extracted from a downloaded ZIP, so the first
# double-click may be refused with "cannot be opened because it is from an
# unidentified developer". Right-click the file and choose Open instead, which
# offers a button to run it anyway. See INSTALL.md.

cd "$(dirname "$0")" || exit 1

# --open because Finder gives this window no controlling terminal until Terminal
# itself attaches, and serve.sh only opens a browser on its own when it can see
# one. Asking explicitly keeps a double-click launch from ending at a bare
# console with a URL the reader still has to type in by hand.
bash web/serve.sh --open
status=$?

# Terminal's default is to close a window whose shell exited cleanly, which
# would take any error message with it. Hold the window open on failure so the
# reason stays on screen.
if [ $status -ne 0 ]; then
  echo
  echo "FateVend exited with an error. See the message above."
  echo "Press Return to close this window."
  read -r _
fi
