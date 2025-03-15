import { Suspense, useEffect, useState } from "react";

import { getTemplate } from "../../../App";
import { useSelector } from "react-redux";
import { getTemplates } from "../../../store/state.selector";

const regex = /-[0-9]/i;

const MultiDescription = ({ templateName = null }) => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const templates = useSelector(getTemplates);

  const template = getTemplate(
    templates,
    "description",
    "multiDescriptions",
    templateName
  );

  const {
    datas: { content },
  } = template || {};

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];
      // @ts-expect-error TODO: fix vite errors
      const modules = import.meta.glob("../**/*.component.tsx");

      for (const [index, datas] of Object.entries(content)) {
        const moduleName = index.replace(regex, "");

        try {
          if (moduleName) {
            const modulePath = `../${moduleName}/${moduleName}.component.tsx`;
            if (modules[modulePath]) {
              const module = await modules[modulePath]();
              const Component = module.default;

              // @ts-ignore
              loadedComponents.push(<Component key={index} {...datas} />);
            }
          }
        } catch (error) {
          console.error(`Error loading component: ${moduleName}`, error);
        }
      }
      setComponents(loadedComponents);
    };
    loadComponents();
  }, [content]);

  if (!template) {
    return null;
  }

  return <Suspense fallback={<div>Loading...</div>}>{components}</Suspense>;
};

export default MultiDescription;
