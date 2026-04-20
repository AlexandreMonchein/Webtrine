import classNames from "classnames";
import { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import type { TemplateData } from "../../../App";
import { getTemplate } from "../../../App";
import {
  getClient,
  getLayoutFeatures,
  getTemplates,
} from "../../../store/state.selector";
import { PageNotFound } from "../../error/src/pageNotFound.component";
import AnimatedSection from "./animatedSection.component";
import LazyComponent from "./lazyComponent.component";
import styles from "./multiDescriptions.module.css";
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
  const layoutFeatures = useSelector(getLayoutFeatures);
  const {
    scrollAnimations = true,
    alternateBackground = true,
    animateFirstElement = false,
    noBorderRadius = false,
  } = layoutFeatures || {};

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
        async ([index, datas]: [string, MultiDescriptionContent], idx) => {
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
                    return (
                      <LazyComponent key={index}>
                        <AnimatedSection
                          index={idx}
                          disabled={!scrollAnimations}
                          animateFirstElement={animateFirstElement}
                        >
                          <Component {...datas} />
                        </AnimatedSection>
                      </LazyComponent>
                    );
                  }
                } else {
                  console.warn(`>> no state`, datas.id, type);
                  return (
                    <LazyComponent key={index}>
                      <AnimatedSection
                        index={idx}
                        disabled={!scrollAnimations}
                        animateFirstElement={animateFirstElement}
                      >
                        <Component {...datas} />
                      </AnimatedSection>
                    </LazyComponent>
                  );
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
  }, [content, location.state, scrollAnimations, animateFirstElement]);

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
      <div
        className={classNames(styles.container, {
          [styles.singleSection]: components.length === 1,
          [styles.alternateBackground]: alternateBackground,
          [styles.noBorderRadius]: noBorderRadius,
        })}
      >
        {components}
      </div>
    </Suspense>
  );
};

export default MultiDescription;
