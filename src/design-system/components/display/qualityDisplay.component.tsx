import { useEffect, useState } from "react";

import {
  ContentGrid,
  ContentItem,
  Section,
  SvgIcon,
  Text,
  Title,
} from "./qualityDisplay.styled";
import { Datas } from "./qualityDisplay.types";

// Use import.meta.glob to load all components ahead of time
// @ts-expect-error TODO: fix vite errors
const componentFiles = import.meta.glob("../../assets/**/*.component.tsx");

const FeatureSection = (datas: Datas) => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const { title, content } = datas;

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents = await Promise.all(
        content.map(async ({ name, text }) => {
          try {
            if (name && text) {
              const componentPath = `../../../assets/icons/${name}.component`;
              const module = componentFiles[componentPath];

              if (module) {
                const resolvedModule = await module();
                const Component = resolvedModule.default;

                return (
                  <ContentItem tabIndex={0} key={name}>
                    <SvgIcon key={name}>
                      <Component key={name} color="orange" size={64} />
                    </SvgIcon>
                    <Text>{text}</Text>
                  </ContentItem>
                );
              }
            }
          } catch (error) {
            console.error(`Error loading component: ${name}`, error);
            return null;
          }
        })
      );

      setComponents(loadedComponents.filter(Boolean));
    };

    loadComponents();
  }, [content]);

  return (
    <Section>
      <Title tabIndex={0}>{title}</Title>
      <ContentGrid>{components}</ContentGrid>
    </Section>
  );
};

export default FeatureSection;
