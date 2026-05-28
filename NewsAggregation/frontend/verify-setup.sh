#!/bin/bash

# Setup verification script for NewsSphere AI

echo "=========================================="
echo "NewsSphere AI - Setup Verification"
echo "=========================================="
echo ""

# Check Node.js
echo "1. Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✓ Node.js $NODE_VERSION found"
else
    echo "✗ Node.js not found. Please install Node.js 14+"
    exit 1
fi

# Check npm
echo ""
echo "2. Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✓ npm $NPM_VERSION found"
else
    echo "✗ npm not found"
    exit 1
fi

# Check if node_modules exists
echo ""
echo "3. Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "✓ node_modules directory exists"
else
    echo "✗ node_modules not found"
    echo "  Run: npm install"
fi

# Check essential files
echo ""
echo "4. Checking essential files..."
files=(
    "package.json"
    "tailwind.config.js"
    "postcss.config.js"
    "public/index.html"
    "src/App.jsx"
    "src/index.js"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo "✗ $file not found"
    fi
done

# Check components
echo ""
echo "5. Checking components..."
components=(
    "src/components/Navbar.jsx"
    "src/components/Sidebar.jsx"
    "src/components/NewsCard.jsx"
    "src/components/HeroSection.jsx"
    "src/components/BreakingNewsTicker.jsx"
    "src/components/TrendingSlider.jsx"
    "src/components/ParticleBackground.jsx"
)

for component in "${components[@]}"; do
    if [ -f "$component" ]; then
        echo "✓ $component"
    else
        echo "✗ $component not found"
    fi
done

# Check pages
echo ""
echo "6. Checking pages..."
pages=(
    "src/pages/Homepage.jsx"
    "src/pages/ArticlePage.jsx"
    "src/pages/SearchPage.jsx"
    "src/pages/UserDashboard.jsx"
    "src/pages/AdminDashboard.jsx"
)

for page in "${pages[@]}"; do
    if [ -f "$page" ]; then
        echo "✓ $page"
    else
        echo "✗ $page not found"
    fi
done

# Check utilities
echo ""
echo "7. Checking utilities..."
utils=(
    "src/utils/helpers.js"
    "src/utils/api.js"
)

for util in "${utils[@]}"; do
    if [ -f "$util" ]; then
        echo "✓ $util"
    else
        echo "✗ $util not found"
    fi
done

# Check documentation
echo ""
echo "8. Checking documentation..."
docs=(
    "README.md"
    "QUICKSTART.md"
    "ARCHITECTURE.md"
    "DEPLOYMENT.md"
    "COMPONENTS.md"
    "PROJECT_SUMMARY.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "✓ $doc"
    else
        echo "✗ $doc not found"
    fi
done

echo ""
echo "=========================================="
echo "✓ Setup verification complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Start dev server: npm start"
echo "3. Open: http://localhost:3000"
echo ""
echo "For more information, see:"
echo "- QUICKSTART.md (5-minute setup)"
echo "- README.md (full documentation)"
echo ""
