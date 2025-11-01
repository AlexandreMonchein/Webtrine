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
import { getLogoDimensions } from "../../utils/dimensions.utils";

const ClassicFooter = (props) => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const { name: clientName } = useSelector(getClient);
  const socials = useSelector(getSocials);
  const legals = useSelector(getTemplates).filter(
    (template) => template.type === "legals"
  );

  const { logo } = props || {};
  const { name, alt, link, shape } = logo || {};
  const { width, height } = getLogoDimensions(shape);

  const componentFiles = import.meta.glob(
    "../../../assets/**/**/*.component.tsx"
  );

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];

      if (socials) {
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
                  <li key={name}>
                    <SocialLogo>
                      {/* @ts-ignore TODO: fix this type error */}
                      <a aria-label={name} href={link}>
                        <Component />
                      </a>
                    </SocialLogo>
                  </li>
                );
              }
            }
          } catch (error) {
            console.error(`Error loading component: ${name}`, error);
          }
        }
      }

      setComponents(loadedComponents);
    };

    loadComponents();
  }, [socials]);

  return (
    <FooterContainer>
      <LeftSection>
        {logo && (
          <a href={link} key={name}>
            <Logo
              alt={alt}
              src={`${import.meta.env.BASE_URL}assets/${clientName}/icons/${name}.webp`}
              width={width}
              height={height}
            />
          </a>
        )}
      </LeftSection>
      <MiddleSection>
        <TopSection>
          <SiteRef tabIndex={0} href="https://www.webtrine.fr">Webtrine 2025 - tous droits réservés.</SiteRef>
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
