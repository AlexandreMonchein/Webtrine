import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getSocials } from "../../../store/state.selector";
import { FloatingContainer, SocialLogo } from "./floatingSocials.styled";

const FloatingSocials: React.FC = () => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const socials: { [key: string]: { link: string; color: string } } =
    useSelector(getSocials);

  const componentFiles = import.meta.glob(
    "../../../assets/**/**/*.component.tsx",
  );

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];

      if (socials) {
        for (const [name, { link }] of Object.entries(socials)) {
          try {
            if (link) {
              const componentPath = `../../../assets/icons/${name}.component.tsx`;
              const module = componentFiles[componentPath];

              if (module) {
                const resolvedModule = await module();
                // @ts-expect-error TODO: to fix
                const Component = resolvedModule.default;

                loadedComponents.push(
                  <SocialLogo key={name}>
                    {/* @ts-ignore TODO: fix this type error */}
                    <a aria-label={name} href={link}>
                      <Component color="full" />
                    </a>
                  </SocialLogo>,
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
