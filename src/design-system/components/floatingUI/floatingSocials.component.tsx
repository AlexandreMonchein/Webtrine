import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getSocials } from "../../../store/state.selector";
import { FloatingContainer, SocialLogo } from "./floatingSocials.styled";

const componentFiles = import.meta.glob(
  "../../../assets/**/**/*.component.tsx",
);

const FloatingSocials: React.FC = () => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const socials: { [key: string]: { link: string; color: string } } =
    useSelector(getSocials);

  useEffect(() => {
    const loadComponents = async () => {
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
                    <SocialLogo key={name}>
                      {/* @ts-ignore TODO: fix this type error */}
                      <a aria-label={name} href={link}>
                        <Component color="full" />
                      </a>
                    </SocialLogo>
                  );
                }
              }
              return null;
            } catch (error) {
              console.error(`Error loading component: ${name}`, error);
              return null;
            }
          },
        );

        const resolvedComponents = await Promise.all(componentPromises);
        loadedComponents.push(...resolvedComponents.filter(Boolean));
      }

      setComponents(loadedComponents);
    };

    loadComponents();
  }, [socials]);

  if (!socials) {
    return null;
  }

  return (
    <FloatingContainer
      role="complementary"
      aria-label="Liens vers les réseaux sociaux"
    >
      {components}
    </FloatingContainer>
  );
};

export default FloatingSocials;
