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
      const componentPromises = Object.entries(content).map(
        async ([_, data]) => {
          if (!data) return null;

          try {
            const { name, text } = data;
            const componentPath = `../../../assets/icons/${name}.component.tsx`;
            const module = componentFiles[componentPath];

            if (module) {
              const resolvedModule = await module();
              // @ts-expect-error TODO: to fix
              const Component = resolvedModule.default;

              return (
                <ContentItem key={name}>
                  <SvgIcon key={name}>
                    <Component key={name} color="orange" size={64} />
                  </SvgIcon>
                  <Text>{text}</Text>
                </ContentItem>
              );
            }
          } catch (error) {
            console.error(`Error loading component: ${data?.name}`, error);
          }
          return null;
        },
      );

      const loadedComponents = await Promise.all(componentPromises);
      setComponents(loadedComponents.filter(Boolean));
    };

    loadComponents();
  }, [componentFiles, content]);

  return (
    <Section>
      <Title>{title}</Title>
      <ContentGrid>{components}</ContentGrid>
    </Section>
  );
};

export default FeatureSection;
