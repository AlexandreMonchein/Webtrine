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
      let routes: Array<{ name: string; path: string; query?: string }>;

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
              // Build URL with customer param and optional query params
              const queryParams = route.query
                ? `customer=${customer}&${route.query}`
                : `customer=${customer}`;
              const url = `${route.path}?${queryParams}`;

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
            test.setTimeout(5 * 60 * 1000); // 5 minutes max

            // Ensure routes are loaded
            if (!routes || routes.length === 0) {
              throw new Error(`No routes found for ${customer}`);
            }

            for (const route of routes) {
              // Build URL with customer param and optional query params
              const queryParams = route.query
                ? `customer=${customer}&${route.query}`
                : `customer=${customer}`;
              const url = `${route.path}?${queryParams}`;

              // eslint-disable-next-line no-await-in-loop
              await page.goto(url, {
                waitUntil: "load",
                timeout: 30000,
              });

              // Wait for network to be idle to ensure no late navigations
              // eslint-disable-next-line no-await-in-loop
              await page
                .waitForLoadState("networkidle", { timeout: 10000 })
                .catch(() => {
                  // Ignore timeout - some pages may have long-polling or streaming
                  console.warn(
                    `[${customer}] Network not idle after 10s on ${route.path}`,
                  );
                });

              // Wait for main content to be visible
              // eslint-disable-next-line no-await-in-loop
              await page.waitForSelector("section, main, [role='main']", {
                state: "visible",
                timeout: 10000,
              });

              // Additional wait to ensure all React hydration and scripts are done
              // eslint-disable-next-line no-await-in-loop
              await page.waitForTimeout(2000); // Increased from 500ms to give more time

              // Helper function to safely execute page.evaluate with retry on context destruction
              const safeEvaluate = async (
                fn: any,
                arg: any,
                description: string,
              ) => {
                try {
                  await page.evaluate(fn, arg);
                } catch (error) {
                  if (
                    error instanceof Error &&
                    error.message.includes("Execution context was destroyed")
                  ) {
                    console.warn(
                      `[${customer}] Context destroyed during ${description} on ${route.path} - waiting and retrying`,
                    );
                    await page.waitForLoadState("load");
                    await page.waitForTimeout(1000);
                    // Retry once
                    try {
                      await page.evaluate(fn, arg);
                    } catch {
                      console.warn(
                        `[${customer}] Retry failed for ${description} - skipping`,
                      );
                    }
                  } else {
                    throw error;
                  }
                }
              };

              // Pause all videos to prevent flakiness
              // eslint-disable-next-line no-await-in-loop
              await safeEvaluate(
                () => {
                  const videos = document.querySelectorAll("video");
                  videos.forEach((video) => {
                    video.pause();
                    video.currentTime = 0;
                  });
                },
                undefined,
                "video pause",
              );

              // Force testimonial avatars to use fallback (initials) to avoid CORS/loading issues
              // eslint-disable-next-line no-await-in-loop
              await safeEvaluate(
                () => {
                  const avatarContainers = document.querySelectorAll(
                    '[data-testid="avatar-container"], [class*="AvatarContainer"]',
                  );
                  avatarContainers.forEach((container) => {
                    // Hide avatar images and show fallback
                    const img = container.querySelector("img");
                    const fallback = container.querySelector(
                      "[data-fallback]",
                    ) as HTMLElement;

                    if (img && fallback) {
                      img.style.display = "none";
                      fallback.style.display = "flex";
                    }
                  });
                },
                undefined,
                "avatar fallback",
              );

              // Stop all image carousels and reset to first image
              // eslint-disable-next-line no-await-in-loop
              await safeEvaluate(
                () => {
                  // Clear all setInterval timers
                  const highestTimeoutId = setTimeout(
                    () => {},
                    0,
                  ) as unknown as number;
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

                    // Fix image counter to always show "1/total"
                    const counter = container.querySelector(
                      '[class*="imageCounter"]',
                    ) as HTMLElement;
                    if (counter) {
                      const totalImages = images.length;
                      const fixedText = `1/${totalImages}`;

                      // Replace with a static frozen element
                      const frozenCounter = document.createElement("div");
                      frozenCounter.className = counter.className;
                      frozenCounter.style.cssText = counter.style.cssText;
                      frozenCounter.textContent = fixedText;

                      // Replace the original counter
                      counter.parentNode?.replaceChild(frozenCounter, counter);
                    }
                  });
                },
                undefined,
                "carousel freeze",
              );

              // Wait a bit for React to update
              // eslint-disable-next-line no-await-in-loop
              await page.waitForTimeout(100);

              // Scroll progressively to trigger all lazy loading (in 5 steps)
              for (let i = 0; i <= 5; i++) {
                // eslint-disable-next-line no-await-in-loop
                await safeEvaluate(
                  (step: number) => {
                    const totalHeight = document.body.scrollHeight;
                    window.scrollTo(0, (totalHeight * step) / 5);
                  },
                  i,
                  `scroll step ${i}`,
                );
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
              await safeEvaluate(
                () => {
                  window.scrollTo(0, 0);
                },
                undefined,
                "scroll to top",
              );
              // eslint-disable-next-line no-await-in-loop
              await page.waitForTimeout(300);

              // Find all Leaflet map containers to mask them
              const leafletMaps = page.locator(".leaflet-container");
              // eslint-disable-next-line no-await-in-loop
              const mapCount = await leafletMaps.count();
              const mapMasks = [];

              for (let i = 0; i < mapCount; i++) {
                mapMasks.push(leafletMaps.nth(i));
              }

              // Full page screenshot
              // Strategy:
              // - CI or Linux: Strict validation with Linux snapshots (maxDiffPixels: 2000)
              // - macOS/Windows local: Skip comparison (only capture) to avoid font issues
              //   Use Docker to generate/validate Linux snapshots: pnpm test:e2e:snapshots:linux

              const isLinuxOrCI =
                process.env.CI === "true" ||
                process.platform === "linux" ||
                process.env.FORCE_VISUAL_VALIDATION === "true";

              const screenshotName = `${customer}-${route.name.toLowerCase().replace(/\s+/g, "-")}-${viewport.name}.png`;
              const screenshotOptions = {
                fullPage: true,
                animations: "disabled" as const,
                timeout: 30000,
                mask: mapMasks.length > 0 ? mapMasks : undefined,
                maxDiffPixels: 2000, // Strict validation (detects real visual regressions)
              };
              if (isLinuxOrCI) {
                // Perform strict visual comparison
                await expect(page).toHaveScreenshot(
                  screenshotName,
                  screenshotOptions,
                );
              } else {
                // macOS/Windows: Skip comparison, just log
                console.log(
                  `⏭️  [${customer}/${route.name}] Skipping visual assertion (${process.platform})`,
                );
                console.log(
                  `   💡 Generate Linux snapshots: pnpm test:e2e:snapshots:linux`,
                );
              }
            }
          });
        });
      }
    });
  }
});
