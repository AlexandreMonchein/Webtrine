import React, { FC, Suspense, useEffect, useState } from "react";
import _ from "lodash";

import { generalTemplatesTypes } from "../../../App";

import { Content } from "./home.styled";

export const Home: FC<{ templates: any[] }> = ({ templates }) => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];
      if (templates) {
        for (const template of templates) {
          if (!generalTemplatesTypes.includes(template.type)) {
            const { type, id, datas } = template;

            try {
              const Module = await import(
                `../../components/${type}/src/${id}.component`
              );

              loadedComponents.push(
                <Module.default
                  key={`${type}-${id}-${Math.floor(Math.random() * 1000)}`}
                  {...datas}
                />
              );
            } catch (error) {
              console.error(`Error loading component: ${type}/${id}`, error);
            }
          }
        }
      }

      setComponents(loadedComponents); // Ensure unique components
    };

    loadComponents();
  }, [templates]);

  return (
    <Content data-testid="Home">
      <Suspense fallback={<div>Loading...</div>}>{components}</Suspense>
    </Content>
  );
};
