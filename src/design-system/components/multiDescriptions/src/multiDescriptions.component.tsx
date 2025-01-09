import { Suspense, useEffect, useState } from "react";

import { getTemplate } from "../../../../App";
import Banner from "../../banner/src/banner.component";
import Description from "../../description/src/description.component";
import Gallery from "../../gallery/src/gallery.component";

const regex = /-[0-9]/i;

const MultiDescription = ({ templateName = null }) => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);

  const template = getTemplate(
    "description",
    "multiDescriptions",
    templateName
  );

  if (!template) {
    return null;
  }

  const {
    datas: { content },
  } = template || {};

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];

      for (const [index, datas] of Object.entries(content)) {
        const moduleName = index.replace(regex, "");

        try {
          if (moduleName) {
            const Module = await import(
              `../../${moduleName}/src/${moduleName}.component`
            );

            // @ts-ignore
            loadedComponents.push(<Module.default key={index} {...datas} />);
          }
        } catch (error) {
          console.error(`Error loading component: ${name}`, error);
        }
      }
      setComponents(loadedComponents);
    };
    loadComponents();
  }, [content]);

  return <Suspense fallback={<div>Loading...</div>}>{components}</Suspense>;

  // return (
  //   <>
  //     {topBanner && <Banner {...topBanner} />}
  //     {description.map((data, index) => {
  //       return (
  //         <Description
  //           key={index}
  //           {...data}
  //           features={{ isReversed: index % 2 === 1, isContinious: true }}
  //         />
  //       );
  //     })}
  //     {gallery && <Gallery template={gallery} />}
  //     {bottomBanner && <Banner {...bottomBanner} />}
  //   </>
  // );
};

export default MultiDescription;
