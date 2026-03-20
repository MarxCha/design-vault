#!/bin/bash
# =============================================================================
# Design Vault — Quick Start Setup
# Run this after cloning to set everything up
# =============================================================================

set -e

echo ""
echo "🏛️  Design Vault — Quick Start"
echo "═══════════════════════════════════════"
echo ""

# 1. Check Node.js version
NODE_VERSION=$(node -v 2>/dev/null || echo "not found")
echo "📦 Node.js: $NODE_VERSION"

if [[ "$NODE_VERSION" == "not found" ]]; then
  echo "❌ Node.js not found. Install v20+ first."
  exit 1
fi

# 2. Check pnpm
if ! command -v pnpm &> /dev/null; then
  echo "📥 Installing pnpm..."
  npm install -g pnpm
fi
echo "📦 pnpm: $(pnpm -v)"

# 3. Install dependencies
echo ""
echo "📥 Installing dependencies..."
pnpm install

# 4. Initialize shadcn/ui
echo ""
echo "🎨 Initializing shadcn/ui..."
pnpm dlx shadcn@latest init -y --style default --base-color zinc --css-variables true 2>/dev/null || true

# 5. Add essential shadcn components
echo ""
echo "🧱 Adding shadcn components..."
pnpm dlx shadcn@latest add button card badge input dialog dropdown-menu separator 2>/dev/null || true

# 6. Install Playwright for screenshots
echo ""
echo "🎭 Installing Playwright (for screenshots)..."
pnpm dlx playwright install chromium 2>/dev/null || true

# 7. Font instructions
echo ""
echo "🔤 Fonts:"
echo "   Download from https://www.fontshare.com:"
echo "   - Satoshi (Regular, Medium, Bold) → public/fonts/"
echo "   - General Sans (Semibold, Bold) → public/fonts/"
echo "   JetBrains Mono loads automatically from Google Fonts."
echo ""

# 8. Create required directories
mkdir -p public/fonts public/screenshots

# 9. Done
echo "═══════════════════════════════════════"
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Download fonts (see above)"
echo "  2. pnpm dev          — Start development server"
echo "  3. pnpm screenshots  — Capture project screenshots"
echo "  4. pnpm build        — Production build"
echo ""
echo "📖 Read CLAUDE.md for full documentation."
echo "🏛️  Happy designing!"
echo ""
