import { Suspense, useEffect, useState } from "react";

const DisplayFooter = ({ template }) => {
  const [footer, setFooter] = useState<React.ReactNode>();

  useEffect(() => {
    const loadComponent = async () => {
      const { type, id, datas } = template;

      try {
        const Module = await import(`../../footers/src/${id}.component.tsx`);
        const Component = Module.default;

        setFooter(
          <Component
            key={`${type}-${id}-${Math.floor(Math.random() * 1000)}`}
            {...datas}
          />,
        );
      } catch (error) {
        console.error(`Error loading component: ${type}/${id}`, error);
      }
    };

    loadComponent();
  }, [template]);

  return <Suspense fallback={<div>Loading...</div>}>{footer}</Suspense>;
};

export default DisplayFooter;
