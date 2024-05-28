import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Discord from "../../../assets/icons/discord.component";
import Facebook from "../../../assets/icons/facebook.component";
import Instagram from "../../../assets/icons/instagram.component";
import LinkedIn from "../../../assets/icons/linkedin.component";
import X from "../../../assets/icons/x.component";
import { getSocials } from "../../../store/state.selector";

import {
  FooterContainer,
  LeftSection,
  Logo,
  MiddleSection,
  RightSection,
  SocialContent,
  SocialLogo,
  Socials,
} from "./classicFooter.styled";

export const ClassicFooter = (template) => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const socials = useSelector(getSocials);

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
        <Logo src="https://via.placeholder.com/50" alt="Logo 1" />
        <Logo src="https://via.placeholder.com/50" alt="Logo 2" />
      </LeftSection>
      <MiddleSection>
        <p>&copy; 2024 Webtrine. All rights reserved.</p>
      </MiddleSection>
      <RightSection>
        <Socials>
          <SocialContent>{components}</SocialContent>
        </Socials>
      </RightSection>
    </FooterContainer>
  );
};
