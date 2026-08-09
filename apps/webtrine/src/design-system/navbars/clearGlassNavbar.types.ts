export type ClearGlassNavbarLink = {
  /** Label of the link */
  label: string;
  /** Path/URL of the link */
  path: string;
};

export type ClearGlassNavbarFeatures = {
  /** Hide navbar on scroll down, show on scroll up (mobile only) */
  hideOnScroll?: boolean;
};

export type ClearGlassNavbarProps = {
  /** Logo name (without extension) */
  logo: string;
  /** Logo shape for dimensions */
  shape?: string;
  /** Navigation links */
  links: ClearGlassNavbarLink[];
  /** Current active path */
  activePath?: string;
  /** Optional features configuration */
  features?: ClearGlassNavbarFeatures;
  /** Test ID for testing */
  "data-testid"?: string;
};
