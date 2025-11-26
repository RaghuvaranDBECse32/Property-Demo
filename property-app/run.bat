@echo off
echo Starting Property App...

:: Open VS Code in this folder
code .

:: Wait 3 seconds for VS Code to load
timeout /t 3 >nul

:: Open index.html with Live Server
powershell -Command "Start-Process 'http://127.0.0.1:5500/index.html'"

echo If Live Server didn't start, right-click index.html inside VS Code and choose 'Open with Live Server'.
pause
exit