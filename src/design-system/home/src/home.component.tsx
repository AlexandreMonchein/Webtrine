import React, { FC, Suspense, useEffect, useState } from "react";

import {
  templatesIdsBlackList,
  templatesNamesBlackList,
  templatesTypesBlackList,
} from "../../../App";

import { Content } from "./home.styled";

interface Templates {
  type: string;
  id: string;
  name?: string;
  datas: any;
}

export const Home: FC<{ templates: Templates[] }> = ({ templates }) => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);

  // Use import.meta.glob to load all components ahead of time
  // @ts-expect-error TODO: fix vite errors
  const componentFiles = import.meta.glob(
    "../../components/**/**/*.component.tsx"
  );

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];
      if (templates) {
        for (const template of templates) {
          if (
            !templatesTypesBlackList.includes(template.type) &&
            !templatesIdsBlackList.includes(template.id) &&
            !templatesNamesBlackList.includes(template.name)
          ) {
            const { type, id, datas } = template;

            const componentPath = `../../components/${type}/${id}.component.tsx`;
            const module = componentFiles[componentPath];

            if (module) {
              try {
                const resolvedModule = await module();
                const Component = resolvedModule.default;

                loadedComponents.push(
                  <Component
                    key={`${type}-${id}`} // Fixed key
                    {...datas}
                  />
                );
              } catch (error) {
                console.error(`Error loading component: ${type}/${id}`, error);
              }
            } else {
              console.error(`Component not found: ${componentPath}`);
            }
          }
        }
      }
      setComponents(loadedComponents); // Update once all components are loaded
    };

    loadComponents();
  }, [templates, componentFiles]);

  return (
    <Content data-testid="Home">
      <Suspense fallback={<div>Loading Home Component...</div>}>
        {components}
      </Suspense>
    </Content>
  );
};
