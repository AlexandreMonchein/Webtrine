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

const FeatureSection = (datas: Datas) => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const { title, content } = datas;

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents = await Promise.all(
        content.map(async ({ name, text }) => {
          try {
            if (name && text) {
              const module = await import(
                `../../../../assets/icons/${name}.component`
              );
              const Component = module.default;

              return (
                <ContentItem tabIndex={0} key={name}>
                  <SvgIcon key={name}>
                    <Component key={name} color="orange" size={64} />
                  </SvgIcon>
                  <Text>{text}</Text>
                </ContentItem>
              );
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
