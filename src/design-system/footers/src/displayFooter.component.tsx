import { Suspense, useEffect, useState } from "react";

const DisplayFooter = ({ template }) => {
  const [navbar, setNavbar] = useState<React.ReactNode>();

  useEffect(() => {
    const loadComponent = async () => {
      const { type, id, datas } = template;

      try {
        const module = await import(`./${id}.component`);
        const Component = module.default;

        setNavbar(
          <Component
            key={`${type}-${id}-${Math.floor(Math.random() * 1000)}`}
            {...datas}
          />
        );
      } catch (error) {
        console.error(`Error loading component: ${type}/${id}`, error);
      }
    };

    loadComponent();
  }, [template]);

  return <Suspense fallback={<div>Loading...</div>}>{navbar}</Suspense>;
};

export default DisplayFooter;
