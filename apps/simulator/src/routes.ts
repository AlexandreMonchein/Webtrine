export interface PageRoute {
  path: string;
  templateName: string;
}

export const PAGE_ROUTES: PageRoute[] = [
  { path: "/", templateName: "Home" },
  { path: "/presentation", templateName: "Presentation" },
  { path: "/description", templateName: "Description" },
  { path: "/hebergement", templateName: "Hebergement" },
  { path: "/accessibilite", templateName: "Accessibilite" },
  { path: "/faq", templateName: "Faq" },
  { path: "/flux", templateName: "Flux" },
  { path: "/prestation", templateName: "Prestation" },
  { path: "/artistes", templateName: "Artistes" },
  { path: "/events", templateName: "Evenements" },
  { path: "/tarifs", templateName: "Tarifs" },
  { path: "/information", templateName: "Information" },
  { path: "/private-map", templateName: "PrivateMap" },
  { path: "/contact", templateName: "Contact" },
];
