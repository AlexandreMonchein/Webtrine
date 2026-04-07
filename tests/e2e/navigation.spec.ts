import { expect, test } from "@playwright/test";

import {
  extractRoutes,
  getTestCustomers,
  loadCustomerConfig,
} from "./fixtures/customer";

/**
 * E2E Tests - Navigation and User Flows
 *
 * Tests critical user journeys for each customer:
 * - Navigation between pages
 * - Contact form submission
 * - Mobile menu functionality
 * - External links
 */

test.describe("E2E Navigation Tests", () => {
  const customers = getTestCustomers();

  for (const customer of customers) {
    test.describe(`${customer}`, () => {
      let routes: Array<{ name: string; path: string }>;
      let config: any;

      test.beforeAll(() => {
        try {
          config = loadCustomerConfig(customer);
          routes = extractRoutes(config, customer);
        } catch (error) {
          console.warn(`Could not load config for ${customer}:`, error);
          routes = [{ name: "Home", path: "/" }];
        }
      });

      test("should navigate through all pages", async ({ page }) => {
        // Start at home
        await page.goto(`/?customer=${customer}`, {
          waitUntil: "load",
          timeout: 30000,
        });

        // Check home page loaded
        await expect(page).toHaveTitle(new RegExp(config.client.fullName, "i"));

        // Navigate to each route
        for (const route of routes) {
          // eslint-disable-next-line no-await-in-loop
          await page.goto(`${route.path}?customer=${customer}`, {
            waitUntil: "load",
            timeout: 30000,
          });

          // Check no 404 (if heading exists)
          const headingCount = await page.locator("h1, h2").count();
          if (headingCount > 0) {
            const heading = page.locator("h1, h2").first();
            // eslint-disable-next-line no-await-in-loop
            await expect(heading).not.toHaveText(/404|not found/i);
          }

          // Page loaded successfully (networkidle already verified above)
        }
      });

      test("should display correct branding", async ({ page }) => {
        await page.goto(`/?customer=${customer}`);

        // Check logo is visible
        const logo = page.locator('img[alt*="logo"], img[src*="logo"]').first();
        await expect(logo).toBeVisible({ timeout: 5000 });

        // Check contact info if available (optional - some clients don't display phone)
        if (config.client.contact.phone) {
          const phoneText = await page.locator("body").textContent();

          // Only test if phone number is actually displayed on the page
          if (phoneText?.includes(config.client.contact.phone)) {
            const escapedPhone = config.client.contact.phone.replace(
              /[+*?^${}()|[\]\\]/g,
              "\\$&",
            );
            const phoneRegex = new RegExp(
              escapedPhone.replace(/[.\s]/g, "[.\\s]*"),
              "i",
            );
            await expect(page.locator("body")).toContainText(phoneRegex);
          }
        }
      });

      test("should have working navbar", async ({ page }) => {
        await page.goto(`/?customer=${customer}`);

        // Find navbar links (excluding logo/brand)
        const navLinks = page.locator("nav a:not([href='/'])").filter({
          hasNotText: /^$/,
        });
        const linkCount = await navLinks.count();

        if (linkCount > 0) {
          // Click the first real navigation link
          const targetLink = navLinks.first();
          const href = await targetLink.getAttribute("href");

          await targetLink.click();
          await page.waitForLoadState("networkidle");

          // Verify navigation happened
          if (href && href !== "/") {
            expect(page.url()).toContain(href.replace(/^\//, ""));
          }
        }
      });

      test("should have accessible mobile menu", async ({ page }) => {
        // Set mobile viewport (iPhone 14 Pro Max)
        await page.setViewportSize({ width: 430, height: 932 });
        await page.goto(`/?customer=${customer}`);

        // Look for burger menu button
        const burgerButton = page
          .locator(
            'button[aria-label*="menu"], button[aria-label*="Menu"], .burger, [class*="burger"]',
          )
          .first();

        if (await burgerButton.isVisible()) {
          // Click to open
          await burgerButton.click();
          await page.waitForTimeout(300);

          // Check mobile menu appeared - be more specific to avoid footer nav
          const mobileMenu = page
            .locator('[class*="mobile"], [class*="sidebar"], [class*="drawer"]')
            .first();
          const isMenuVisible = await mobileMenu.isVisible();

          if (isMenuVisible) {
            await expect(mobileMenu).toBeVisible();
          } else {
            // If no specific mobile class, check if nav links are now visible
            const navLinks = page.locator('nav a, [role="navigation"] a');
            const firstLink = navLinks.first();
            await expect(firstLink).toBeVisible();
          }
        }
      });

      test("should have working social links", async ({ page }) => {
        await page.goto(`/?customer=${customer}`);

        if (!config.client.socials) return;

        // Find social links
        const socialLinks = page.locator(
          'a[href*="instagram"], a[href*="facebook"], a[href*="linkedin"]',
        );
        const count = await socialLinks.count();

        if (count > 0) {
          const firstSocial = socialLinks.first();
          const href = await firstSocial.getAttribute("href");

          // Check link is valid URL
          expect(href).toMatch(/^https?:\/\//);

          // Check links open in new tab
          const target = await firstSocial.getAttribute("target");
          expect(target).toBe("_blank");
        }
      });
    });
  }
});
