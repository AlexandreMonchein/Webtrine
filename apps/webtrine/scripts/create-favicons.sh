#!/bin/bash

# Generate favicons for all customers from source logos
# Usage: ./scripts/create-favicons.sh [customer]
# If no customer specified, generates for all customers

# Customer favicon source configuration
# Format: CUSTOMER:SOURCE_FILE
declare -A FAVICON_SOURCES=(
  ["apt235"]="favicon_apt235.png"
  ["chillpaws"]="logo_chillpaws_color_2.png"
  ["dipaolo"]="logo-dipaolo.png"
  ["showcase"]="webtrine_logo_2_blanc_noTitle.png"
  ["webtrine"]="webtrine_logo_2_color_noTitle.png"
)

generate_favicons() {
  local customer=$1
  local source_file=${FAVICON_SOURCES[$customer]}

  if [ -z "$source_file" ]; then
    echo "⚠️  No source configured for customer: $customer"
    return 1
  fi

  local source_path="public/assets/$customer/icons/$source_file"

  if [ ! -f "$source_path" ]; then
    echo "⚠️  Source file not found: $source_path"
    return 1
  fi

  echo "🎨 Generating favicons for $customer from $source_file..."

  sips -z 32 32 "$source_path" --out "public/assets/$customer/icons/favicon-32x32.png" >/dev/null 2>&1
  sips -z 16 16 "$source_path" --out "public/assets/$customer/icons/favicon-16x16.png" >/dev/null 2>&1
  sips -z 180 180 "$source_path" --out "public/assets/$customer/icons/apple-touch-icon.png" >/dev/null 2>&1

  echo "  ✅ favicon-32x32.png (Safari compatible)"
  echo "  ✅ favicon-16x16.png"
  echo "  ✅ apple-touch-icon.png (iOS)"
}

# Main logic
if [ -n "$1" ]; then
  # Single customer specified
  generate_favicons "$1"
else
  # Generate for all customers
  echo "🚀 Generating favicons for all customers..."
  echo ""
  for customer in "${!FAVICON_SOURCES[@]}"; do
    generate_favicons "$customer"
    echo ""
  done
  echo "✅ All favicons created successfully!"
fi
