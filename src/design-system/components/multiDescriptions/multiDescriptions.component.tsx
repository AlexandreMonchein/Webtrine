import { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import type { TemplateData } from "../../../App";
import { getTemplate } from "../../../App";
import { getClient, getTemplates } from "../../../store/state.selector";
import { PageNotFound } from "../../error/src/pageNotFound.component";
import { Container } from "./multiDescriptions.styled";
import type {
  MultiDescriptionContent,
  MultiDescriptionDatas,
  MultiDescriptionProps,
  MultiDescriptionTemplate,
} from "./multiDescriptions.types";

const regex = /-[0-9]/i;

const MultiDescription = ({ templateName = null }: MultiDescriptionProps) => {
  const location = useLocation();
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const templates = useSelector(getTemplates) as TemplateData[];
  const { fullName } = useSelector(getClient) || {};

  const template = getTemplate(
    templates,
    "description",
    "multiDescriptions",
    templateName,
  ) as MultiDescriptionTemplate | null;

  const { content, title, description } =
    (template?.datas as MultiDescriptionDatas) || {};

  // Note: This component uses dynamic imports from multiple folders (../**/*)
  // which doesn't fit the standard icon loading pattern used by useLoadComponents hook.
  // Keep the manual loading logic here for now.
  useEffect(() => {
    // Ne rien faire si pas de content
    if (!content || Object.keys(content).length === 0) {
      return;
    }

    const loadComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];
      const modules = import.meta.glob("../**/*.component.tsx");

      const contentEntries = Object.entries(
        content as Record<string, MultiDescriptionContent>,
      );

      const componentPromises = contentEntries.map(
        async ([index, datas]: [string, MultiDescriptionContent]) => {
          const { type } = datas;
          const moduleName = index.replace(regex, "");

          try {
            if (moduleName && type) {
              const modulePath = `../${moduleName}/${type}.component.tsx`;

              if (modules[modulePath]) {
                const module = (await modules[modulePath]()) as {
                  default: React.ComponentType<MultiDescriptionContent>;
                };
                const Component = module.default;

                if (location.state) {
                  const { type } = location.state as { type: string };
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
                  return <Component key={index} {...datas} />;
                }
              }
            }
            return null;
          } catch (error) {
            console.error(`Error loading component: ${moduleName}`, error);
            return null;
          }
        },
      );

      const resolvedComponents = await Promise.all(componentPromises);
      loadedComponents.push(...resolvedComponents.filter(Boolean));
      setComponents(loadedComponents);
    };
    loadComponents();
  }, [content, location.state]);

  // Vérifier si le template existe APRÈS tous les hooks
  if (!template) {
    return <PageNotFound />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Helmet>
        <title>
          {fullName} - {title}
        </title>
        <meta name="description" content={description} />
      </Helmet>
      <Container className={components.length === 1 ? "single-section" : ""}>
        {components}
      </Container>
    </Suspense>
  );
};

export default MultiDescription;
