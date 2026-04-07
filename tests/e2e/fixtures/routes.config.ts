/**
 * Additional routes configuration per customer
 *
 * These are routes that exist but are not in the navbar
 * (legal pages, terms, privacy policy, etc.)
 */

export interface AdditionalRoutes {
  mentionsLegals?: boolean;
  confidentialite?: boolean;
  cguCgv?: boolean;
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
  },
};
