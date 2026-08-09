import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface ClientConfig {
  client: {
    name: string;
    fullName: string;
    logo: string;
    contact: {
      phone: string;
      email: string;
    };
  };
  layout: {
    templates: Array<{
      type: string;
      id: string;
      datas: Record<string, unknown>;
    }>;
  };
}

/**
 * Load client configuration from config.fr.json
 */
export function loadClientConfig(customer: string): ClientConfig {
  const configPath = path.join(
    __dirname,
    "../../../config/customer",
    customer,
    "config.fr.json",
  );

  if (!fs.existsSync(configPath)) {
    throw new Error(
      `Config not found for customer: ${customer} at ${configPath}`,
    );
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  return config;
}

/**
 * Extract routes from navbar configuration
 */
export function extractRoutes(config: ClientConfig): string[] {
  const navbarTemplate = config.layout.templates.find(
    (t) => t.type === "navbars",
  );

  if (!navbarTemplate) {
    return ["/"];
  }

  const categories =
    (navbarTemplate.datas.categories as Array<{ link: string }>) || [];
  const routes = categories.map((cat) => cat.link);

  // Add default routes that might not be in navbar
  const defaultRoutes = ["/mentions-legals", "/confidentialite"];

  return [...new Set([...routes, ...defaultRoutes])];
}

/**
 * Get customer name from environment or fallback
 */
export function getCustomerName(): string {
  return process.env.VITE_CUSTOMER || "showcase";
}
