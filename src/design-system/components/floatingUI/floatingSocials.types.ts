export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok' | 'discord' | 'github';
  url: string;
  label?: string; // Pour l'accessibilité
}

export interface FloatingSocialsProps {
  position?: {
    side: 'left' | 'right';
    offset?: string; // Distance depuis le bord (ex: "20px")
  };
  features?: {
    hideOnMobile?: boolean; // Masquer sur mobile
    animated?: boolean; // Animations au survol
    compact?: boolean; // Mode compact (icônes plus petites)
  };
}