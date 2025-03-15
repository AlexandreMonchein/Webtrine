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

const ClassicFooter = ({ template }) => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const { name: clientName } = useSelector(getClient);
  const socials = useSelector(getSocials);
  const legals = useSelector(getTemplates).filter(
    (template) => template.type === "legals"
  );

  const { images } = template || {};

  // Use import.meta.glob to load all components ahead of time
  // @ts-expect-error TODO: fix vite errors
  const componentFiles = import.meta.glob(
    "../../components/**/**/*.component.tsx"
  );

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];

      for (const [name, link] of Object.entries(socials)) {
        try {
          if (link) {
            const componentPath = `../../../components/icons/${name}.component`;

            // Check if the path matches a valid component file
            const module = componentFiles[componentPath];

            if (module) {
              const resolvedModule = await module();
              const Component = resolvedModule.default;

              loadedComponents.push(
                <li key={name}>
                  <SocialLogo>
                    {/* @ts-ignore TODO: fix this type error */}
                    <a href={link}>
                      <Component />
                    </a>
                  </SocialLogo>
                </li>
              );
            }
          } else {
            console.error(`Component not found: ${link}`);
          }
        } catch (error) {
          console.error(`Error loading component: ${name}`, error);
        }
      }

      setComponents(loadedComponents);
    };

    loadComponents();
  }, [socials]);

  return (
    <FooterContainer>
      <LeftSection>
        {images &&
          images.map((image) => {
            return (
              <a href="/" key={image.name}>
                <Logo
                  alt={image.alt}
                  // @ts-expect-error TODO: fix vite errors
                  src={`${import.meta.env.BASE_URL}assets/${clientName}/icons/${image.name}.png`}
                />
              </a>
            );
          })}
      </LeftSection>
      <MiddleSection>
        <TopSection>
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
