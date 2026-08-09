export interface TeamMember {
  name: string;
  position?: string;
  /** Image filename without extension (.webp will be added automatically) */
  image: string;
  imageAlt: string;
}

export interface TeamProps {
  type: "team";
  preTitle?: string;
  /** Main title - Rendered as h2 */
  title?: string;
  description?: string;
  members: TeamMember[];
}
