@echo off
setlocal

set "ONERA_APP="
for /d %%D in ("%USERPROFILE%\On?ra") do if exist "%%~fD\Start Preview.cmd" set "ONERA_APP=%%~fD"

if not defined ONERA_APP (
  echo The Onera website launcher was not found under %USERPROFILE%.
  pause
  exit /b 1
)

call "%ONERA_APP%\Start Preview.cmd"
if errorlevel 1 (
  echo The Onera website did not start. Review the message above.
  pause
  exit /b 1
)
