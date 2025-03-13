import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  getClient,
  getSocials,
  getTemplates,
} from "../../../store/state.selector";

import {
  BottomSection,
  FooterContainer,
  LeftSection,
  Logo,
  MiddleSection,
  RightSection,
  SiteRef,
  SocialContent,
  SocialLogo,
  Socials,
  TopSection,
} from "./classicFooter.styled";

const ClassicFooter = (template) => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const { name: clientName } = useSelector(getClient);
  const socials = useSelector(getSocials);
  const legals = useSelector(getTemplates).filter(
    (template) => template.type === "legals"
  );

  const { images } = template || {};

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];

      for (const [name, link] of Object.entries(socials)) {
        try {
          if (link) {
            const Module = await import(
              `../../../assets/icons/${name}.component`
            );

            loadedComponents.push(
              <li key={name}>
                <SocialLogo>
                  {/* @ts-ignore */}
                  <a href={link}>
                    <Module.default key={name} />
                  </a>
                </SocialLogo>
              </li>
            );
          }
        } catch (error) {
          console.error(`Error loading component: ${name}`, error);
        }
      }

      setComponents(loadedComponents);
    };

    loadComponents();
  }, []);

  return (
    <FooterContainer>
      <LeftSection>
        {images.map((image) => {
          return (
            <a href="/" key={image.name}>
              <Logo
                alt={image.alt}
                src={require(
                  `../../../assets/${clientName}/icons/${image.name}.png`
                )}
              />
            </a>
          );
        })}
      </LeftSection>
      <MiddleSection>
        <TopSection>
          {" "}
          <p tabIndex={0}>
            © 2024 Webtrine, tous droits réservés. Réalisé par{" "}
            <SiteRef tabIndex={-1} href="/">
              Webtrine
            </SiteRef>
            .
          </p>
        </TopSection>
        <BottomSection>
          {legals.map((legal, index) => (
            <SiteRef key={index} href={legal.datas.type}>
              {legal.datas.type}
            </SiteRef>
          ))}
        </BottomSection>
      </MiddleSection>
      <RightSection>
        <Socials>
          <SocialContent>{components}</SocialContent>
        </Socials>
      </RightSection>
    </FooterContainer>
  );
};

export default ClassicFooter;
