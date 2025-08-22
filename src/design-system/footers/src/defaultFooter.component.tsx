import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  getClient,
  getSocials,
  getTemplates,
} from "../../../store/state.selector";

import {
  FooterContainer,
  TopFooterSection,
  BottomFooterSection,
  LogosSection,
  CentralSection,
  SocialSection,
  LogoLink,
  Logo,
  LinksGrid,
  LinksColumn,
  ColumnTitle,
  LinkItem,
  SocialIconsContainer,
  SocialIcon,
  CopyrightText,
  FooterLink,
} from "./defaultFooter.styled";
import { getLogoDimensions } from "../../utils/dimensions.utils";

interface DefaultFooterProps {
  partnerLogos?: Array<{
    name: string;
    alt: string;
    link: string;
    shape?: string;
  }>;
  sitemapLinks?: Array<{
    title: string;
    links: Array<{
      label: string;
      url: string;
    }>;
  }>;
}

const DefaultFooter = (props: DefaultFooterProps) => {
  const [socialComponents, setSocialComponents] = useState<React.ReactNode[]>([]);
  const { name: clientName } = useSelector(getClient);
  const socials = useSelector(getSocials);
//   const legals = useSelector(getTemplates).filter(
//     (template) => template.type === "legals"
//   );

  const { partnerLogos = [], sitemapLinks = [] } = props || {};

  const componentFiles = import.meta.glob(
    "../../../assets/**/**/*.component.tsx"
  );

  // Configuration par défaut des liens si aucune n'est fournie
  const defaultSitemapLinks = [
    {
      title: "Navigation",
      links: [
        { label: "Accueil", url: "/" },
        { label: "Présentation", url: "/presentation" },
        { label: "Description", url: "/description" },
        { label: "Hébergement", url: "/hebergement" },
        { label: "Contact", url: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Flux", url: "/flux" },
        { label: "Prestation", url: "/prestation" },
        { label: "Accessibilité", url: "/accessibilite" },
        { label: "Galerie", url: "/gallerie" },
      ],
    },
    {
      title: "Informations légales",
      links: [
        { label: "CGU & CGV", url: "/cgu-cgv" },
        { label: "Mentions légales", url: "/mentions-legals" },
        { label: "Confidentialité", url: "/confidentialite" },
      ],
    },
  ];

  const finalSitemapLinks = sitemapLinks.length > 0 ? sitemapLinks : defaultSitemapLinks;

  useEffect(() => {
    const loadSocialComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];

      for (const [name, link] of Object.entries(socials)) {
        try {
          if (link) {
            const componentPath = `../../../assets/icons/${name}.component.tsx`;
            const module = componentFiles[componentPath];

            if (module) {
              const resolvedModule = await module();
              // @ts-expect-error TODO: to fix
              const Component = resolvedModule.default;

              loadedComponents.push(
                <SocialIcon key={name}>
                  <a
                    aria-label={`Suivez-nous sur ${name}`}
                    href={String(link)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Component />
                  </a>
                </SocialIcon>
              );
            }
          }
        } catch (error) {
          console.error(`Error loading social component: ${name}`, error);
        }
      }

      setSocialComponents(loadedComponents);
    };

    loadSocialComponents();
  }, [socials]);

  const currentYear = new Date().getFullYear();

  // Calculer quelles sections sont présentes pour le layout
  const hasLeftSection = partnerLogos.length > 0;
  const hasRightSection = socialComponents.length > 0;

  let sectionsLayout = "";
  if (hasLeftSection && hasRightSection) {
    sectionsLayout = "all";
  } else if (hasLeftSection && !hasRightSection) {
    sectionsLayout = "left-center";
  } else if (!hasLeftSection && hasRightSection) {
    sectionsLayout = "center-right";
  } else {
    sectionsLayout = "center-only";
  }

  return (
    <FooterContainer>
      <TopFooterSection data-sections={sectionsLayout}>
        {/* Section des logos partenaires */}
        {partnerLogos.length > 0 && (
          <LogosSection>
            {partnerLogos.map((logo, index) => {
              const { width, height } = getLogoDimensions(logo.shape);
              return (
                <LogoLink key={index} href={logo.link} target="_blank" rel="noopener noreferrer">
                  <Logo
                    alt={logo.alt}
                    src={`${import.meta.env.BASE_URL}assets/${clientName}/icons/${logo.name}.webp`}
                    width={width}
                    height={height}
                  />
                </LogoLink>
              );
            })}
          </LogosSection>
        )}

        {/* Section centrale avec les liens */}
        <CentralSection>
          <LinksGrid
            data-columns={finalSitemapLinks.length}
            data-layout={sectionsLayout}
          >
            {/* Colonnes de navigation */}
            {finalSitemapLinks.map((section, index) => (
              <LinksColumn key={index}>
                <ColumnTitle>{section.title}</ColumnTitle>
                {section.links.map((link, linkIndex) => (
                  <LinkItem key={linkIndex}>
                    <FooterLink href={link.url}>{link.label}</FooterLink>
                  </LinkItem>
                ))}
              </LinksColumn>
            ))}
          </LinksGrid>
        </CentralSection>

        {/* Section des réseaux sociaux */}
        {socialComponents.length > 0 && (
          <SocialSection>
            <ColumnTitle>Suivez-nous</ColumnTitle>
            <SocialIconsContainer>
              {socialComponents}
            </SocialIconsContainer>
          </SocialSection>
        )}
      </TopFooterSection>

      {/* Section du copyright */}
      <BottomFooterSection>
        <CopyrightText>
          © {currentYear} {clientName || "Webtrine"} - Tous droits réservés.
        </CopyrightText>
      </BottomFooterSection>
    </FooterContainer>
  );
};

export default DefaultFooter;
