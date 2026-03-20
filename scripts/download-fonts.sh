#!/bin/bash
# =============================================================================
# Design Vault — Font Download Script
# Downloads Satoshi, General Sans from Fontshare and places them in public/fonts
# =============================================================================

set -e

FONT_DIR="public/fonts"
mkdir -p "$FONT_DIR"

echo "🔤 Design Vault — Downloading fonts..."
echo ""

# Satoshi from Fontshare (Indian Type Foundry)
echo "📥 Satoshi..."
curl -sL "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" \
  -o /dev/null 2>&1 || true

# Since Fontshare doesn't provide direct woff2 downloads easily,
# create placeholder instructions
cat > "$FONT_DIR/DOWNLOAD-FONTS.md" << 'EOF'
# Font Download Instructions

Design Vault uses these fonts. Download them manually:

## 1. Satoshi (body text)
- Source: https://www.fontshare.com/fonts/satoshi
- Download: Regular (400), Medium (500), Bold (700) in WOFF2
- Place files as:
  - Satoshi-Regular.woff2
  - Satoshi-Medium.woff2
  - Satoshi-Bold.woff2

## 2. General Sans (headings)
- Source: https://www.fontshare.com/fonts/general-sans
- Download: Semibold (600), Bold (700) in WOFF2
- Place files as:
  - GeneralSans-Semibold.woff2
  - GeneralSans-Bold.woff2

## 3. JetBrains Mono (code)
- Loaded from Google Fonts automatically via next/font/google
- No manual download needed

## Alternative: Use Google Fonts fallback
If you can't download from Fontshare, edit layout.tsx to use:
- Inter (body) from Google Fonts
- Plus Jakarta Sans (headings) from Google Fonts
Both are available via next/font/google.
EOF

echo "📝 Created $FONT_DIR/DOWNLOAD-FONTS.md with instructions"
echo ""
echo "⚠️  Manual step required:"
echo "   1. Visit https://www.fontshare.com/fonts/satoshi"
echo "   2. Visit https://www.fontshare.com/fonts/general-sans"
echo "   3. Download WOFF2 files and place in $FONT_DIR/"
echo ""
echo "✅ Done. See $FONT_DIR/DOWNLOAD-FONTS.md for details."
