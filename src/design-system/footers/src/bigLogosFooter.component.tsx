import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getClient, getSocials } from "../../../store/state.selector";
import {
  AdditionalText,
  BrandDescription,
  BrandSection,
  BrandTitle,
  FooterContainer,
  FooterContent,
  FooterGrid,
  LogoImage,
  LogoItem,
  LogoLink,
  LogosGrid,
  LogosSection,
  MenuLink,
  MenuList,
  MenuListItem,
  MenuSection,
  MenuTitle,
  SiteRef,
  SocialLink,
  SocialList,
  SocialListItem,
  SocialSection,
  VisuallyHidden,
} from "./bigLogosFooter.styled";
import { BigLogosFooterProps } from "./bigLogosFooter.types";

const componentFiles = import.meta.glob(
  "../../../assets/**/**/*.component.tsx",
);

const BigLogosFooter: React.FC<BigLogosFooterProps> = (datas) => {
  const [socialComponents, setSocialComponents] = useState<React.ReactNode[]>(
    [],
  );
  const socials: { [key: string]: { link: string; color: string } } =
    useSelector(getSocials);
  const { name: clientName } = useSelector(getClient);

  const { menuSection, brandInfo, logos } = datas;

  useEffect(() => {
    const loadSocialComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];

      if (socials) {
        const socialEntries = Object.entries(socials);
        const componentPromises = socialEntries.map(
          async ([name, { link }]) => {
            try {
              if (link) {
                const componentPath = `../../../assets/icons/${name}.component.tsx`;
                const module = componentFiles[componentPath];

                if (module) {
                  const resolvedModule = await module();
                  // @ts-expect-error TODO: to fix
                  const Component = resolvedModule.default;

                  return (
                    <SocialListItem key={name}>
                      <SocialLink
                        href={link}
                        aria-label={`Suivre sur ${name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Component />
                        <VisuallyHidden>{name}</VisuallyHidden>
                      </SocialLink>
                    </SocialListItem>
                  );
                }
              }
              return null;
            } catch (error) {
              console.error(`Error loading social component: ${name}`, error);
              return null;
            }
          },
        );

        const resolvedComponents = await Promise.all(componentPromises);
        loadedComponents.push(...resolvedComponents.filter(Boolean));
      }

      setSocialComponents(loadedComponents);
    };

    loadSocialComponents();
  }, [socials]);

  return (
    <FooterContainer role="contentinfo">
      <FooterContent>
        <FooterGrid
          className={classNames({ isLogo: logos && logos.length > 0 })}
        >
          {logos && logos.length > 0 ? (
            <LogosSection>
              <LogosGrid>
                {logos.map((logo) => (
                  <LogoItem key={`${logo.name}`}>
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
          ) : null}

          {menuSection ? (
            <MenuSection>
              <MenuTitle>{menuSection.title}</MenuTitle>
              <nav aria-label="Liens du footer">
                <MenuList>
                  {menuSection.links.map((link) => (
                    <MenuListItem key={link.label}>
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
          ) : null}

          {brandInfo ? (
            <BrandSection>
              <BrandTitle>{brandInfo.title}</BrandTitle>
              <BrandDescription
                dangerouslySetInnerHTML={{
                  __html: brandInfo.description,
                }}
              />
              {brandInfo.additionalText && (
                <AdditionalText>{brandInfo.additionalText}</AdditionalText>
              )}
            </BrandSection>
          ) : null}
        </FooterGrid>

        {socialComponents.length > 0 && (
          <SocialSection>
            <nav aria-label="Liens vers les réseaux sociaux">
              <SocialList role="list">{socialComponents}</SocialList>
            </nav>
            <nav aria-label="© Réalisé par Webtrine 2025 - tout droit réservé">
              <SiteRef href="https://www.webtrine.fr">
                Webtrine 2025 - tous droits réservés.
              </SiteRef>
            </nav>
          </SocialSection>
        )}
      </FooterContent>
    </FooterContainer>
  );
};

export default BigLogosFooter;
