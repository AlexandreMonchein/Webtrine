/**
 * Additional routes configuration per customer
 *
 * These are routes that exist but are not in the navbar
 * (legal pages, terms, privacy policy, etc.)
 */

export interface RouteVariant {
  name: string; // Display name for the variant (e.g., "Contact - Artist DUF")
  path: string; // Route path (e.g., "/contact")
  query?: string; // Query parameters (e.g., "artist=DUF")
}

export interface AdditionalRoutes {
  mentionsLegals?: boolean;
  confidentialite?: boolean;
  cguCgv?: boolean;
  /**
   * Route variants with query parameters for visual testing
   * Useful for testing different states of the same page
   * Example: Pre-selected artist in contact form
   */
  routeVariants?: RouteVariant[];
}

export const customerRoutesConfig: Record<string, AdditionalRoutes> = {
  showcase: {
    mentionsLegals: true,
    confidentialite: true,
    cguCgv: true,
  },
  webtrine: {
    mentionsLegals: true,
    confidentialite: true,
    cguCgv: true,
  },
  chillpaws: {
    mentionsLegals: true,
    confidentialite: true,
    cguCgv: false, // No CGU-CGV page
  },
  dipaolo: {
    mentionsLegals: true,
    confidentialite: true,
    cguCgv: false, // No CGU-CGV page
  },
  apt235: {
    mentionsLegals: true,
    confidentialite: true,
    cguCgv: false, // No CGU-CGV page
    routeVariants: [
      {
        name: "Contact - Artist DUF",
        path: "/contact",
        query: "artist=DUF",
      },
    ],
  },
};
