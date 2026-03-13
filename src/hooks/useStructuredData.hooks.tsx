import { useEffect } from "react";

export interface StructuredDataAddress {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface StructuredDataGeo {
  latitude?: number;
  longitude?: number;
}

export interface StructuredDataOpeningHours {
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
}

export interface StructuredDataReview {
  ratingValue?: number;
  bestRating?: number;
  author?: string;
}

export interface StructuredDataAreaServed {
  name: string;
  "@type"?: string;
}

export interface StructuredData {
  "@type"?: string;
  name?: string;
  image?: string[];
  address?: StructuredDataAddress;
  geo?: StructuredDataGeo;
  url?: string;
  telephone?: string;
  priceRange?: string;
  servesCuisine?: string;
  menu?: string;
  openingHoursSpecification?: StructuredDataOpeningHours[];
  review?: StructuredDataReview;
  areaServed?: (string | StructuredDataAreaServed)[]; // Support both string[] and object[]
}

/**
 * Hook pour injecter les données structurées JSON-LD dans le <head>
 * pour améliorer le SEO et l'indexation Google
 */
export const useStructuredData = (structuredData?: StructuredData) => {
  // Stabiliser la dépendance en utilisant JSON.stringify
  const structuredDataString = structuredData
    ? JSON.stringify(structuredData)
    : null;

  useEffect(() => {
    if (!structuredDataString) {
      return;
    }

    const data: StructuredData = JSON.parse(structuredDataString);

    if (!data || Object.keys(data).length === 0) {
      return;
    }

    // Construire l'objet JSON-LD
    const jsonLd: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": data["@type"] || "LocalBusiness",
    };

    // Ajouter les propriétés simples si elles existent
    if (data.name) jsonLd.name = data.name;
    if (data.image) jsonLd.image = data.image;
    if (data.url) jsonLd.url = data.url;
    if (data.telephone) jsonLd.telephone = data.telephone;
    if (data.priceRange) jsonLd.priceRange = data.priceRange;
    if (data.servesCuisine) jsonLd.servesCuisine = data.servesCuisine;
    if (data.menu) jsonLd.menu = data.menu;

    // Ajouter l'adresse si elle existe
    if (data.address && Object.keys(data.address).length > 0) {
      const address: Record<string, string> = {
        "@type": "PostalAddress",
      };
      if (data.address.streetAddress)
        address.streetAddress = data.address.streetAddress;
      if (data.address.addressLocality)
        address.addressLocality = data.address.addressLocality;
      if (data.address.addressRegion)
        address.addressRegion = data.address.addressRegion;
      if (data.address.postalCode) address.postalCode = data.address.postalCode;
      if (data.address.addressCountry)
        address.addressCountry = data.address.addressCountry;

      if (Object.keys(address).length > 1) {
        jsonLd.address = address;
      }
    }

    // Ajouter les coordonnées géographiques si elles existent
    if (data.geo && (data.geo.latitude || data.geo.longitude)) {
      jsonLd.geo = {
        "@type": "GeoCoordinates",
        ...(data.geo.latitude && {
          latitude: data.geo.latitude,
        }),
        ...(data.geo.longitude && {
          longitude: data.geo.longitude,
        }),
      };
    }

    // Ajouter les horaires d'ouverture si ils existent
    if (
      data.openingHoursSpecification &&
      data.openingHoursSpecification.length > 0
    ) {
      jsonLd.openingHoursSpecification = data.openingHoursSpecification.map(
        (hours) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: hours.dayOfWeek,
          opens: hours.opens,
          closes: hours.closes,
        }),
      );
    }

    // Ajouter la review si elle existe
    if (data.review && (data.review.ratingValue || data.review.author)) {
      const review: Record<string, unknown> = {
        "@type": "Review",
      };

      if (data.review.ratingValue) {
        review.reviewRating = {
          "@type": "Rating",
          ratingValue: data.review.ratingValue,
          ...(data.review.bestRating && {
            bestRating: data.review.bestRating,
          }),
        };
      }

      if (data.review.author) {
        review.author = {
          "@type": "Person",
          name: data.review.author,
        };
      }

      if (Object.keys(review).length > 1) {
        jsonLd.review = review;
      }
    }

    // Ajouter la zone de service si elle existe
    if (data.areaServed && data.areaServed.length > 0) {
      jsonLd.areaServed = data.areaServed.map((area) => {
        // Support both string format and object format
        if (typeof area === "string") {
          return {
            "@type": "City",
            name: area,
          };
        }
        return {
          "@type": area["@type"] || "City",
          name: area.name,
        };
      });
    }

    // Créer le script et l'injecter dans le head
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "structured-data";
    script.textContent = JSON.stringify(jsonLd, null, 2);

    // Supprimer l'ancien script s'il existe
    const existingScript = document.getElementById("structured-data");
    if (existingScript) {
      existingScript.remove();
    }

    // Ajouter le nouveau script
    document.head.appendChild(script);
  }, [structuredDataString]);
};
