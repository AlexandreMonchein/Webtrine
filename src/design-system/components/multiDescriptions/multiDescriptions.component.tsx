import { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { getTemplate } from "../../../App";
import { useSelector } from "react-redux";
import { getClient, getTemplates } from "../../../store/state.selector";
import { Container } from "./multiDescriptions.styled";

const regex = /-[0-9]/i;

const MultiDescription = ({ templateName = null }) => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const templates = useSelector(getTemplates);
  const { fullName } = useSelector(getClient);

  const template = getTemplate(
    templates,
    "description",
    "multiDescriptions",
    templateName
  );

  const {
    datas: { content, title, description },
  } = template || {};

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];
      const modules = import.meta.glob("../**/*.component.tsx");

      for (const [index, datas] of Object.entries(
        content as Record<string, { type: string }>
      )) {
        const { type } = datas;
        const moduleName = index.replace(regex, "");

        try {
          if (moduleName && type) {
            const modulePath = `../${moduleName}/${type}.component.tsx`;
            if (modules[modulePath]) {
              const module = await modules[modulePath]();
              // @ts-expect-error TODO: to fix
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
