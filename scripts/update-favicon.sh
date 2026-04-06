#!/bin/bash

# Copy customer favicons to public root for dev/build
# Safari reads favicons from static HTML links in index.html
# This script is called before dev/build to update favicons

CUSTOMER="${VITE_CUSTOMER:-showcase}"
SOURCE_DIR="public/assets/$CUSTOMER/icons"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "⚠️  Directory not found: $SOURCE_DIR"
  exit 1
fi

# Copy all favicon sizes to public root
cp "$SOURCE_DIR/favicon-32x32.png" "public/favicon-32x32.png" 2>/dev/null || echo "⚠️  favicon-32x32.png not found"
cp "$SOURCE_DIR/favicon-16x16.png" "public/favicon-16x16.png" 2>/dev/null || echo "⚠️  favicon-16x16.png not found"
cp "$SOURCE_DIR/apple-touch-icon.png" "public/apple-touch-icon.png" 2>/dev/null || echo "⚠️  apple-touch-icon.png not found"

echo "✅ Favicons updated for $CUSTOMER"
