# Auto-restart dev server on crash
$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectDir

Write-Host "Starting The Odyssey dev server (auto-restart enabled)..." -ForegroundColor Cyan

while ($true) {
    if (Test-Path "node_modules\.vite") {
        Remove-Item -Recurse -Force "node_modules\.vite" -ErrorAction SilentlyContinue
    }
    Write-Host "$(Get-Date -Format 'HH:mm:ss')  Starting Vite..." -ForegroundColor Green
    npm run dev
    Write-Host "$(Get-Date -Format 'HH:mm:ss')  Server stopped. Restarting in 2s..." -ForegroundColor Yellow
    Start-Sleep -Seconds 2
}
