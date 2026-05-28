#!/bin/bash

# Windows PowerShell version of setup verification

Write-Host "=========================================="
Write-Host "NewsSphere AI - Setup Verification"
Write-Host "=========================================="
Write-Host ""

# Check Node.js
Write-Host "1. Checking Node.js..."
try {
    $nodeVersion = node -v
    Write-Host "✓ Node.js $nodeVersion found"
}
catch {
    Write-Host "✗ Node.js not found. Please install Node.js 14+"
    exit 1
}

# Check npm
Write-Host ""
Write-Host "2. Checking npm..."
try {
    $npmVersion = npm -v
    Write-Host "✓ npm $npmVersion found"
}
catch {
    Write-Host "✗ npm not found"
    exit 1
}

# Check if node_modules exists
Write-Host ""
Write-Host "3. Checking dependencies..."
if (Test-Path "node_modules") {
    Write-Host "✓ node_modules directory exists"
}
else {
    Write-Host "✗ node_modules not found"
    Write-Host "  Run: npm install"
}

# Check essential files
Write-Host ""
Write-Host "4. Checking essential files..."
$files = @(
    "package.json",
    "tailwind.config.js",
    "postcss.config.js",
    "public/index.html",
    "src/App.jsx",
    "src/index.js"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✓ $file"
    }
    else {
        Write-Host "✗ $file not found"
    }
}

# Check components
Write-Host ""
Write-Host "5. Checking components..."
$components = @(
    "src/components/Navbar.jsx",
    "src/components/Sidebar.jsx",
    "src/components/NewsCard.jsx",
    "src/components/HeroSection.jsx",
    "src/components/BreakingNewsTicker.jsx",
    "src/components/TrendingSlider.jsx",
    "src/components/ParticleBackground.jsx"
)

foreach ($component in $components) {
    if (Test-Path $component) {
        Write-Host "✓ $component"
    }
    else {
        Write-Host "✗ $component not found"
    }
}

# Check pages
Write-Host ""
Write-Host "6. Checking pages..."
$pages = @(
    "src/pages/Homepage.jsx",
    "src/pages/ArticlePage.jsx",
    "src/pages/SearchPage.jsx",
    "src/pages/UserDashboard.jsx",
    "src/pages/AdminDashboard.jsx"
)

foreach ($page in $pages) {
    if (Test-Path $page) {
        Write-Host "✓ $page"
    }
    else {
        Write-Host "✗ $page not found"
    }
}

# Check utilities
Write-Host ""
Write-Host "7. Checking utilities..."
$utils = @(
    "src/utils/helpers.js",
    "src/utils/api.js"
)

foreach ($util in $utils) {
    if (Test-Path $util) {
        Write-Host "✓ $util"
    }
    else {
        Write-Host "✗ $util not found"
    }
}

# Check documentation
Write-Host ""
Write-Host "8. Checking documentation..."
$docs = @(
    "README.md",
    "QUICKSTART.md",
    "ARCHITECTURE.md",
    "DEPLOYMENT.md",
    "COMPONENTS.md",
    "PROJECT_SUMMARY.md"
)

foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Write-Host "✓ $doc"
    }
    else {
        Write-Host "✗ $doc not found"
    }
}

Write-Host ""
Write-Host "=========================================="
Write-Host "✓ Setup verification complete!"
Write-Host "=========================================="
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Install dependencies: npm install"
Write-Host "2. Start dev server: npm start"
Write-Host "3. Open: http://localhost:3000"
Write-Host ""
Write-Host "For more information, see:"
Write-Host "- QUICKSTART.md (5-minute setup)"
Write-Host "- README.md (full documentation)"
Write-Host ""
