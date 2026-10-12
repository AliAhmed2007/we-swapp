# We-Swap Phase 1 Dependencies Installation Script
# Run this script to install all required packages for Phase 1

Write-Host "🚀 Installing We-Swap Phase 1 Dependencies..." -ForegroundColor Green
Write-Host ""

# Install Supabase packages
Write-Host "📦 Installing Supabase packages..." -ForegroundColor Cyan
npm install @supabase/supabase-js @supabase/ssr

# Install utility packages
Write-Host "📦 Installing utility packages..." -ForegroundColor Cyan
npm install clsx tailwind-merge

# Install class-variance-authority for component variants
Write-Host "📦 Installing class-variance-authority..." -ForegroundColor Cyan
npm install class-variance-authority

# Install Tailwind CSS Animation plugin
Write-Host "📦 Installing tailwindcss-animate..." -ForegroundColor Cyan
npm install -D tailwindcss-animate

# Optional: Install lucide-react for icons
Write-Host "📦 Installing lucide-react (optional icons)..." -ForegroundColor Cyan
npm install lucide-react

Write-Host ""
Write-Host "✅ All dependencies installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Copy .env.local.example to .env.local" -ForegroundColor White
Write-Host "2. Add your Supabase credentials to .env.local" -ForegroundColor White
Write-Host "3. Run 'npm run dev' to start the development server" -ForegroundColor White
Write-Host ""
Write-Host "📚 See PHASE-1-SETUP.md for detailed setup instructions" -ForegroundColor Cyan
