import { Suspense, useEffect, useState } from "react";

const DisplayNavbar = ({ template, toggleTheme, theme }) => {
  const [navbar, setNavbar] = useState<React.ReactNode>();

  useEffect(() => {
    const loadComponent = async () => {
      const { type, id, datas } = template;

      try {
        const Module = await import(`../../navbars/src/${id}.component.tsx`);
        const Component = Module.default;

        const props = { ...datas, toggleTheme, theme };

        setNavbar(
          <Component
            key={`${type}-${id}-${Math.floor(Math.random() * 1000)}`}
            {...props}
          />
        );
      } catch (error) {
        console.error(`Error loading component: ${type}/${id}`, error);
      }
    };

    loadComponent();
  }, [template, toggleTheme, theme]);

  return <Suspense fallback={<div>Loading...</div>}>{navbar}</Suspense>;
};

export default DisplayNavbar;
