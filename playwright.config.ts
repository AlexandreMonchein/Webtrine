import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for multi-client visual regression and E2E testing
 *
 * Usage:
 *   pnpm test:e2e                          # Run all tests
 *   TEST_CUSTOMER=chillpaws pnpm test:e2e  # Test specific customer
 *   playwright test --update-snapshots     # Update visual snapshots
 *
 * Note: Snapshots are stored locally and not committed to Git
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests/e2e",

  /* Maximum time one test can run for */
  timeout: 30 * 1000,

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use */
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["list"],
    process.env.CI ? ["github"] : ["list"],
  ],

  /* Snapshot path template - remove platform suffix for cross-platform compatibility */
  snapshotPathTemplate:
    "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{ext}",

  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",

    /* Collect trace when retrying the failed test */
    trace: "on-first-retry",

    /* Screenshot on failure */
    screenshot: "only-on-failure",

    /* Video on first retry */
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: `VITE_CUSTOMER=\${TEST_CUSTOMER:-showcase} bash ./scripts/update-favicon.sh && VITE_CUSTOMER=\${TEST_CUSTOMER:-showcase} vite`,
    url: "http://localhost:3000",
    reuseExistingServer: false,
    timeout: 120 * 1000,
  },
});
