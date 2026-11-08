@echo off
setlocal

set "APP_DIR=%~dp0website"
if not exist "%APP_DIR%\package.json" (
  echo The Onera website app was not found at "%APP_DIR%".
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Install the current LTS release, then run this launcher again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Reinstall Node.js with npm included, then run this launcher again.
  pause
  exit /b 1
)

pushd "%APP_DIR%" || (
  echo Could not open the website app directory.
  pause
  exit /b 1
)

if not exist "node_modules\next\package.json" (
  echo Installing website dependencies from the lockfile...
  call npm.cmd ci
  if errorlevel 1 (
    popd
    echo Dependency installation failed. Review the npm output above.
    pause
    exit /b 1
  )
)

echo Starting the Onera website development server...
echo Keep this window open while previewing the site.
call npm.cmd run dev
set "EXIT_CODE=%ERRORLEVEL%"
popd

if not "%EXIT_CODE%"=="0" (
  echo The website stopped with an error. Review the message above.
  pause
)

exit /b %EXIT_CODE%
