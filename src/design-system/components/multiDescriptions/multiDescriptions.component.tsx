import { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { getTemplate } from "../../../App";
import { getClient, getTemplates } from "../../../store/state.selector";
import { Container } from "./multiDescriptions.styled";

const regex = /-[0-9]/i;

const MultiDescription = ({ templateName = null }) => {
  const location = useLocation();
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const templates = useSelector(getTemplates);
  const { fullName } = useSelector(getClient);

  const template = getTemplate(
    templates,
    "description",
    "multiDescriptions",
    templateName,
  );

  const {
    datas: { content, title, description },
  } = template || {};

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];
      const modules = import.meta.glob("../**/*.component.tsx");

      const contentEntries = Object.entries(
        content as Record<string, { type: string; id: string }>,
      );

      const componentPromises = contentEntries.map(async ([index, datas]) => {
        const { type } = datas;
        const moduleName = index.replace(regex, "");

        try {
          if (moduleName && type) {
            const modulePath = `../${moduleName}/${type}.component.tsx`;
            if (modules[modulePath]) {
              const module = await modules[modulePath]();
              // @ts-expect-error TODO: to fix
              const Component = module.default;

              if (location.state) {
                const { type } = location.state;
                console.warn(">> has locationState", type, datas);

                if (datas.id === type) {
                  console.warn(
                    ">> id match type, pushing component",
                    datas.id,
                    type,
                  );
                  return <Component key={index} {...datas} />;
                }
              } else {
                console.warn(`>> no state`, datas.id, type);
                // @ts-ignore
                return <Component key={index} {...datas} />;
              }
            }
          }
          return null;
        } catch (error) {
          console.error(`Error loading component: ${moduleName}`, error);
          return null;
        }
      });

      const resolvedComponents = await Promise.all(componentPromises);
      loadedComponents.push(...resolvedComponents.filter(Boolean));
      setComponents(loadedComponents);
    };
    loadComponents();
  }, [content, location.state]);

  if (!template) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Helmet>
        <title>
          {fullName} - {title}
        </title>
        <meta name="description" content={description} />
      </Helmet>
      <Container>{components}</Container>
    </Suspense>
  );
};

export default MultiDescription;
