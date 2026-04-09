#!/bin/bash

# Script to generate Playwright snapshots on Linux using Docker
# This ensures snapshots match the CI environment (Ubuntu Linux)

set -e

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "❌ Docker is not installed"
  echo ""
  echo "📦 Install Docker Desktop for Mac:"
  echo "   https://www.docker.com/products/docker-desktop/"
  echo ""
  echo "Or install Colima (lighter alternative):"
  echo "   brew install colima docker"
  echo "   colima start"
  echo ""
  exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
  echo "❌ Docker is not running"
  echo ""
  echo "Start Docker Desktop or run:"
  echo "   colima start"
  echo ""
  exit 1
fi

CUSTOMERS=("apt235" "chillpaws" "dipaolo" "showcase" "webtrine")

echo "📸 Generating Playwright snapshots on Linux..."
echo "   (These snapshots will be used for CI validation)"
echo ""

# Pull Playwright image
echo "🐳 Pulling Playwright image (v1.59.1)..."
docker pull mcr.microsoft.com/playwright:v1.59.1-jammy

echo ""
echo "🚀 Generating snapshots..."
echo ""

for CUSTOMER in "${CUSTOMERS[@]}"; do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📦 Customer: $CUSTOMER"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  docker run --rm --ipc=host \
    -v "$(pwd):/work" \
    -w /work \
    -e TEST_CUSTOMER="$CUSTOMER" \
    -e CI=false \
    mcr.microsoft.com/playwright:v1.59.1-jammy \
    bash -c "
      set -e

      # Install system fonts
      apt-get update > /dev/null 2>&1
      apt-get install -y fonts-liberation fonts-noto fonts-roboto > /dev/null 2>&1

      # Install pnpm
      npm install -g pnpm@10 > /dev/null 2>&1

      # Install dependencies if needed
      if [ ! -d node_modules ]; then
        echo '📦 Installing dependencies...'
        pnpm install --frozen-lockfile
      fi

      # Generate snapshots
      echo '📸 Generating snapshots...'
      TEST_CUSTOMER=$CUSTOMER pnpm test:e2e --update-snapshots
    "

  if [ $? -eq 0 ]; then
    echo "✅ $CUSTOMER completed"
  else
    echo "❌ $CUSTOMER failed"
    exit 1
  fi
  echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Success! All Linux snapshots generated"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Next steps:"
echo "  1. git add tests/e2e/visual.spec.ts-snapshots/"
echo "  2. git commit -m 'chore: update visual snapshots (Linux)'"
echo "  3. git push"
echo ""
echo "💡 Tips:"
echo "   • Local tests (macOS): high tolerance, no errors"
echo "   • CI tests (Linux): strict validation with maxDiffPixels: 2000"
echo "   • Snapshots generated on Linux match CI environment"
