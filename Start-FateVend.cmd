@echo off
REM Double-click this file to start FateVend on Windows.
REM
REM It exists so that running the app never requires opening a terminal,
REM knowing what PowerShell is, or understanding execution policies. The
REM -ExecutionPolicy Bypass applies to this one process only; it changes no
REM machine setting and needs no administrator rights.
REM
REM Everything it needs ships with Windows. Node.js is optional and only
REM enables the one-click "Import to AI Dungeon" button.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0web\serve.ps1"

REM Keep the window open if the script exited with an error, so the message is
REM readable instead of vanishing with the console.
if errorlevel 1 (
  echo.
  echo FateVend exited with an error. See the message above.
  pause
)
