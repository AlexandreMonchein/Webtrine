import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getSocials, getClient } from "../../../store/state.selector";
import { BigLogosFooterProps } from "./bigLogosFooter.types";

import {
  FooterContainer,
  FooterContent,
  FooterGrid,
  MenuSection,
  MenuTitle,
  MenuList,
  MenuListItem,
  MenuLink,
  BrandSection,
  BrandTitle,
  BrandDescription,
  ContactInfo,
  AdditionalText,
  SocialSection,
  SocialList,
  SocialListItem,
  SocialLink,
  VisuallyHidden,
  LogosSection,
  LogosGrid,
  LogoItem,
  LogoLink,
  LogoImage,
} from "./bigLogosFooter.styled";

const BigLogosFooter: React.FC<BigLogosFooterProps> = (datas) => {
  const [socialComponents, setSocialComponents] = useState<React.ReactNode[]>(
    []
  );
  const socials: { [key: string]: { link: string; color: string } } =
    useSelector(getSocials);
  const { name: clientName } = useSelector(getClient);

  const {
    features: {
      showSocialLinks = true,
      showBrandInfo = true,
      showMenuSection = true,
      showLogos = false,
    },
    content: { menuSection, brandInfo, logos },
  } = datas;

  const componentFiles = import.meta.glob(
    "../../../assets/**/**/*.component.tsx"
  );

  useEffect(() => {
    const loadSocialComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];

      if (socials && showSocialLinks) {
        for (const [name, { link, color }] of Object.entries(socials)) {
          try {
            if (link) {
              const componentPath = `../../../assets/icons/${name}.component.tsx`;
              const module = componentFiles[componentPath];

              if (module) {
                const resolvedModule = await module();
                // @ts-expect-error TODO: to fix
                const Component = resolvedModule.default;

                loadedComponents.push(
                  <SocialListItem key={name}>
                    <SocialLink
                      href={link}
                      aria-label={`Suivre sur ${name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Component color={color} />
                      <VisuallyHidden>{name}</VisuallyHidden>
                    </SocialLink>
                  </SocialListItem>
                );
              }
            }
          } catch (error) {
            console.error(`Error loading social component: ${name}`, error);
          }
        }
      }

      setSocialComponents(loadedComponents);
    };

    loadSocialComponents();
  }, [socials, showSocialLinks]);

  return (
    <FooterContainer role="contentinfo">
      <FooterContent>
        <FooterGrid>
          {showLogos && logos && logos.length > 0 && (
            <LogosSection>
              <LogosGrid>
                {logos.map((logo, index) => (
                  <LogoItem key={`${logo.name}-${index}`}>
                    {logo.url ? (
                      <LogoLink
                        href={logo.url}
                        aria-label={`Aller vers ${logo.alt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LogoImage
                          src={`${import.meta.env.BASE_URL}assets/${clientName}/icons/${logo.name}.webp`}
                          alt={logo.alt}
                          loading="lazy"
                          width="128"
                          height="128"
                        />
                      </LogoLink>
                    ) : (
                      <LogoImage
                        src={`${import.meta.env.BASE_URL}assets/${clientName}/icons/${logo.name}.webp`}
                        alt={logo.alt}
                        loading="lazy"
                        width="128"
                        height="128"
                      />
                    )}
                  </LogoItem>
                ))}
              </LogosGrid>
            </LogosSection>
          )}

          {showMenuSection && menuSection && (
            <MenuSection>
              <MenuTitle>{menuSection.title}</MenuTitle>
              <nav aria-label="Liens du footer">
                <MenuList>
                  {menuSection.links.map((link, index) => (
                    <MenuListItem key={`${link.label}-${index}`}>
                      <MenuLink
                        href={link.url}
                        aria-label={`Aller vers ${link.label}`}
                      >
                        {link.label}
                      </MenuLink>
                    </MenuListItem>
                  ))}
                </MenuList>
              </nav>
            </MenuSection>
          )}

          {showBrandInfo && brandInfo && (
            <BrandSection>
              <BrandTitle>{brandInfo.title}</BrandTitle>
              <BrandDescription
                dangerouslySetInnerHTML={{
                  __html: brandInfo.description,
                }}
              />
              <ContactInfo>{brandInfo.contact}</ContactInfo>
              {brandInfo.additionalText && (
                <AdditionalText>{brandInfo.additionalText}</AdditionalText>
              )}
            </BrandSection>
          )}
        </FooterGrid>

        {showSocialLinks && socialComponents.length > 0 && (
          <SocialSection>
            <nav aria-label="Liens vers les réseaux sociaux">
              <SocialList role="list">{socialComponents}</SocialList>
            </nav>
          </SocialSection>
        )}
      </FooterContent>
    </FooterContainer>
  );
};

export default BigLogosFooter;
