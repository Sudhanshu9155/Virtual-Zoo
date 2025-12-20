# Virtual Zoo - Quick Deploy Script for Vercel
# Run this script from the frontend directory

Write-Host "🚀 Virtual Zoo - Vercel Deployment" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the frontend directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the frontend directory" -ForegroundColor Yellow
    exit 1
}

# Check if vercel is installed
Write-Host "📦 Checking Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "⚠️  Vercel CLI not found. Installing globally..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Vercel CLI" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Vercel CLI installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI is already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔐 Logging in to Vercel..." -ForegroundColor Yellow
Write-Host "A browser window will open for authentication" -ForegroundColor Cyan
vercel login

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Login failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Login successful!" -ForegroundColor Green
Write-Host ""

# Ask deployment type
Write-Host "Select deployment type:" -ForegroundColor Cyan
Write-Host "1. Production (--prod)" -ForegroundColor White
Write-Host "2. Preview" -ForegroundColor White
$choice = Read-Host "Enter choice (1 or 2)"

Write-Host ""
Write-Host "🏗️  Building and deploying..." -ForegroundColor Yellow

if ($choice -eq "1") {
    Write-Host "Deploying to PRODUCTION..." -ForegroundColor Magenta
    vercel --prod
} else {
    Write-Host "Deploying PREVIEW..." -ForegroundColor Magenta
    vercel
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Test your deployment URL" -ForegroundColor White
    Write-Host "2. Update backend CORS if needed" -ForegroundColor White
    Write-Host "3. Share your live app!" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    Write-Host "Check the error messages above" -ForegroundColor Yellow
}
