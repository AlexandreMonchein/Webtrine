import { readFileSync } from "fs";
import { join } from "path";

import { customerRoutesConfig } from "./routes.config";

export interface CustomerConfig {
  client: {
    name: string;
    fullName: string;
    logo: string;
    contact: {
      name: string;
      phone: string;
      email: string;
    };
    socials?: Record<string, { link: string; color?: string }>;
  };
  layout: {
    features?: Record<string, boolean>;
    templates: Array<{
      type: string;
      id: string;
      name?: string;
      datas?: any;
    }>;
  };
}

export interface Route {
  name: string;
  path: string;
  query?: string; // Optional query parameters (e.g., "artist=DUF")
}

/**
 * Load customer configuration from config.fr.json
 */
export function loadCustomerConfig(customer: string): CustomerConfig {
  const configPath = join(
    process.cwd(),
    "config",
    "customer",
    customer,
    "config.fr.json",
  );
  const configContent = readFileSync(configPath, "utf-8");
  return JSON.parse(configContent);
}

/**
 * Extract routes from navbar configuration
 */
export function extractRoutes(
  config: CustomerConfig,
  customer?: string,
): Route[] {
  const navbarTemplate = config.layout.templates.find(
    (t) => t.type === "navbars",
  );

  // Start with home page
  const routes: Route[] = [{ name: "Home", path: "/" }];

  // Extract routes from navbar - support both 'links' and 'categories' structure
  const navbarLinks =
    navbarTemplate?.datas?.links || navbarTemplate?.datas?.categories;

  if (navbarLinks && Array.isArray(navbarLinks)) {
    const navbarRoutes: Route[] = navbarLinks
      .filter((link: any) => link.path !== "/") // Skip home page duplicate
      .map((link: any) => ({
        name: link.label || link.name,
        path: link.path || link.link,
      }));
    routes.push(...navbarRoutes);
  }

  // Add additional routes based on customer config (if customer is provided)
  if (customer) {
    const customerName = customer.toLowerCase();
    const additionalRoutes = customerRoutesConfig[customerName];

    if (additionalRoutes) {
      const existingPaths = new Set(routes.map((r) => r.path));

      // Add routes only if they're enabled in the config
      if (
        additionalRoutes.mentionsLegals &&
        !existingPaths.has("/mentions-legals")
      ) {
        routes.push({ name: "Mentions légales", path: "/mentions-legals" });
      }

      if (
        additionalRoutes.confidentialite &&
        !existingPaths.has("/confidentialite")
      ) {
        routes.push({ name: "Confidentialité", path: "/confidentialite" });
      }

      if (additionalRoutes.cguCgv && !existingPaths.has("/cgu-cgv")) {
        routes.push({ name: "CGU-CGV", path: "/cgu-cgv" });
      }

      // Add route variants with query parameters
      if (additionalRoutes.routeVariants) {
        additionalRoutes.routeVariants.forEach((variant) => {
          routes.push({
            name: variant.name,
            path: variant.path,
            query: variant.query,
          });
        });
      }
    }
  }

  return routes;
}

/**
 * Get all available customers
 */
export function getAvailableCustomers(): string[] {
  return ["chillpaws", "dipaolo", "showcase", "webtrine", "apt235"];
}

/**
 * Filter customers based on TEST_CUSTOMER env var
 */
export function getTestCustomers(): string[] {
  const testCustomer = process.env.TEST_CUSTOMER;
  if (testCustomer) {
    return [testCustomer];
  }
  return getAvailableCustomers();
}
