#!/bin/bash

# Helper script to run E2E tests with proper dev server setup
# This ensures the dev server is properly configured before running tests

set -e

CUSTOMER="${TEST_CUSTOMER:-showcase}"

echo "🚀 Starting E2E tests for customer: $CUSTOMER"
echo ""

# Check if dev server is already running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "✅ Dev server already running on port 3000"
  echo "   Tests will reuse the existing server"
  echo ""
else
  echo "📝 No dev server detected on port 3000"
  echo "   Playwright will start one automatically"
  echo ""
fi

# Run Playwright tests
VITE_CUSTOMER=$CUSTOMER TEST_CUSTOMER=$CUSTOMER playwright test "$@"

echo ""
echo "✅ E2E tests completed for $CUSTOMER"
