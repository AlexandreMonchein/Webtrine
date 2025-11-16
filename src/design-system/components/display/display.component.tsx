import { useEffect, useState } from "react";

import {
  ContentGrid,
  ContentItem,
  Section,
  SvgIcon,
  Text,
  Title,
} from "./display.styled";
import { Datas } from "./display.types";

const FeatureSection = (datas: Datas) => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const componentFiles = import.meta.glob(
    "../../../assets/**/**/*.component.tsx",
  );

  const { title, content } = datas || {};

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];

      for (const [_, data] of Object.entries(content)) {
        try {
          if (data) {
            const { name, text } = data;
            const componentPath = `../../../assets/icons/${name}.component.tsx`;
            const module = componentFiles[componentPath];

            if (module) {
              const resolvedModule = await module();
              // @ts-expect-error TODO: to fix
              const Component = resolvedModule.default;

              loadedComponents.push(
                <ContentItem tabIndex={0} key={name}>
                  <SvgIcon key={name}>
                    <Component key={name} color="orange" size={64} />
                  </SvgIcon>
                  <Text>{text}</Text>
                </ContentItem>,
              );
            }
          }
        } catch (error) {
          const { name } = data;
          console.error(`Error loading component: ${name}`, error);
        }
      }
      setComponents(loadedComponents);
    };

    loadComponents();
  }, [componentFiles, content]);

  return (
    <Section>
      <Title tabIndex={0}>{title}</Title>
      <ContentGrid>{components}</ContentGrid>
    </Section>
  );
};

export default FeatureSection;
