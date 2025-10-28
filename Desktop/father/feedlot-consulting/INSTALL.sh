#!/bin/bash

# Feedlot Management Consulting Website - Installation Script
# This script sets up your development environment

echo "🚀 Feedlot Management Consulting Website Setup"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

echo "📦 Installing dependencies..."
echo "This may take a few minutes..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "📝 Next steps:"
    echo ""
    echo "1. Update contact information:"
    echo "   - components/WhatsAppButton.tsx (phone number)"
    echo "   - components/sections/ContactFooter.tsx (phone & email)"
    echo ""
    echo "2. Customize content (optional):"
    echo "   - messages/en.json (English text)"
    echo "   - messages/ar.json (Arabic text)"
    echo ""
    echo "3. Start development server:"
    echo "   npm run dev"
    echo ""
    echo "4. Open your browser:"
    echo "   http://localhost:3000/ar (Arabic - default)"
    echo "   http://localhost:3000/en (English)"
    echo ""
    echo "📚 Documentation:"
    echo "   - README.md - Full documentation"
    echo "   - QUICKSTART.md - Quick setup guide"
    echo "   - TESTING.md - Testing checklist"
    echo "   - CUSTOMIZATION.md - Customization guide"
    echo ""
    echo "🎉 Your website is ready to customize and deploy!"
else
    echo ""
    echo "❌ Installation failed"
    echo ""
    echo "Common fixes:"
    echo "1. Clear npm cache: npm cache clean --force"
    echo "2. Delete node_modules: rm -rf node_modules"
    echo "3. Try again: npm install"
    echo ""
    echo "If issues persist, check package.json for version conflicts"
fi
