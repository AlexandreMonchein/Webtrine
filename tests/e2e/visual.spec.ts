import { expect, test } from "@playwright/test";

import {
  extractRoutes,
  getTestCustomers,
  loadCustomerConfig,
} from "./fixtures/customer";

/**
 * Visual Regression Testing for All Clients
 *
 * Tests each page for each customer and compares screenshots
 * to detect unintended visual changes.
 *
 * Run specific customer:
 *   TEST_CUSTOMER=chillpaws pnpm test:e2e
 *
 * Update snapshots:
 *   pnpm test:e2e --update-snapshots
 */

test.describe("Visual Regression Tests", () => {
  const customers = getTestCustomers();

  for (const customer of customers) {
    test.describe(`${customer}`, () => {
      let routes: Array<{ name: string; path: string }>;

      test.beforeAll(() => {
        try {
          const config = loadCustomerConfig(customer);
          routes = extractRoutes(config, customer);
        } catch (error) {
          console.warn(`Could not load config for ${customer}:`, error);
          routes = [{ name: "Home", path: "/" }];
        }
      });

      for (const viewport of [
        { name: "FullHD", width: 1920, height: 1080 },
        { name: "HD", width: 1280, height: 720 },
        { name: "iPad-Pro", width: 1024, height: 1366 },
        { name: "iPhone-14-Pro-Max", width: 430, height: 932 },
      ]) {
        test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
          test.beforeEach(async ({ page }) => {
            await page.setViewportSize({
              width: viewport.width,
              height: viewport.height,
            });
          });

          // Dynamically create tests for each route
          test(`should load all pages without errors`, async ({ page }) => {
            for (const route of routes) {
              const url = `${route.path}?customer=${customer}`;

              // eslint-disable-next-line no-await-in-loop
              const response = await page.goto(url, {
                waitUntil: "load", // Less strict than networkidle, better for pages with videos
                timeout: 30000,
              });

              // Check HTTP status
              expect(response?.status()).toBeLessThan(400);

              // Check no JS errors
              const errors: string[] = [];
              page.on("pageerror", (error) => errors.push(error.message));

              // Wait for content to load
              // eslint-disable-next-line no-await-in-loop
              await page.waitForLoadState("domcontentloaded");

              expect(errors).toHaveLength(0);
            }
          });

          // Visual regression test - screenshot all routes
          test(`all routes - visual snapshots`, async ({ page }) => {
            // Increase timeout for this specific test (8 routes × ~10-15s each)
            test.setTimeout(2 * 60 * 1000); // 2 minutes max

            // Ensure routes are loaded
            if (!routes || routes.length === 0) {
              throw new Error(`No routes found for ${customer}`);
            }

            for (const route of routes) {
              const url = `${route.path}?customer=${customer}`;

              // eslint-disable-next-line no-await-in-loop
              await page.goto(url, {
                waitUntil: "load",
                timeout: 30000,
              });

              // Wait for main content to be visible
              // eslint-disable-next-line no-await-in-loop
              await page.waitForSelector("section, main, [role='main']", {
                state: "visible",
                timeout: 10000,
              });

              // Pause all videos and hide them to prevent flakiness
              // eslint-disable-next-line no-await-in-loop
              await page.evaluate(() => {
                const videos = document.querySelectorAll("video");
                videos.forEach((video) => {
                  video.pause();
                  video.currentTime = 0; // Reset to first frame
                });
              });

              // Stop all image carousels and reset to first image
              // eslint-disable-next-line no-await-in-loop
              await page.evaluate(() => {
                // Clear all setInterval timers
                const highestTimeoutId = setTimeout(() => {}, 0);
                for (let i = 0; i < highestTimeoutId; i++) {
                  clearInterval(i);
                }

                // Force all carousel images to show first image
                const carouselContainers = document.querySelectorAll(
                  '[class*="carousel"]',
                );
                carouselContainers.forEach((container) => {
                  const images = container.querySelectorAll(
                    '[class*="carouselImage"]',
                  );
                  images.forEach((img, index) => {
                    const element = img as HTMLElement;
                    if (index === 0) {
                      // Show first image
                      element.classList.add("carouselImageActive");
                      element.style.opacity = "1";
                      element.style.visibility = "visible";
                    } else {
                      // Hide others
                      element.classList.remove("carouselImageActive");
                      element.style.opacity = "0";
                      element.style.visibility = "hidden";
                    }
                  });
                });
              });

              // Wait a bit for React to update
              // eslint-disable-next-line no-await-in-loop
              await page.waitForTimeout(100);

              // Scroll progressively to trigger all lazy loading (in 5 steps)
              for (let i = 0; i <= 5; i++) {
                // eslint-disable-next-line no-await-in-loop
                await page.evaluate((step) => {
                  const totalHeight = document.body.scrollHeight;
                  window.scrollTo(0, (totalHeight * step) / 5);
                }, i);
                // eslint-disable-next-line no-await-in-loop
                await page.waitForTimeout(200);
              }

              // Wait for all images to load (including lazy-loaded ones)
              // eslint-disable-next-line no-await-in-loop
              await page.waitForLoadState("load");
              // eslint-disable-next-line no-await-in-loop
              await page.waitForTimeout(300);

              // Scroll back to top
              // eslint-disable-next-line no-await-in-loop
              await page.evaluate(() => {
                window.scrollTo(0, 0);
              });
              // eslint-disable-next-line no-await-in-loop
              await page.waitForTimeout(300);

              // Find all Leaflet map containers to mask them
              const leafletMaps = page.locator(".leaflet-container");
              const mapCount = await leafletMaps.count();
              const mapMasks = [];

              for (let i = 0; i < mapCount; i++) {
                mapMasks.push(leafletMaps.nth(i));
              }

              // Full page screenshot
              // eslint-disable-next-line no-await-in-loop
              await expect(page).toHaveScreenshot(
                `${customer}-${route.name.toLowerCase().replace(/\s+/g, "-")}-${viewport.name}.png`,
                {
                  fullPage: true,
                  animations: "disabled",
                  timeout: 30000,
                  maxDiffPixels: 100,
                  // Mask Leaflet maps to prevent flakiness from tile loading
                  mask: mapMasks.length > 0 ? mapMasks : undefined,
                },
              );
            }
          });
        });
      }
    });
  }
});
