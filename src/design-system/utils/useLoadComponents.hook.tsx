import { useEffect, useState } from "react";

// Type for SVG icon component props
type IconProps = {
  color?: string;
  size?: number;
  [key: string]: unknown;
};

// Type definitions
type LoaderResult<T = React.ComponentType<IconProps>> = {
  name: string;
  component: T | null;
  data?: Record<string, unknown>;
  error?: Error;
};

type SingleComponentOptions = {
  folder?: "navbars" | "footers" | string;
  customPath?: string;
  onError?: (error: Error, name: string) => void;
};

type MultipleComponentsOptions<T> = {
  returnAsRecord?: boolean;
  renderFn?: (
    Component: React.ComponentType<IconProps>,
    data: T,
    index: number,
  ) => React.ReactNode;
  onError?: (error: Error, name: string) => void;
};

// Get all icon component files
const componentFiles = import.meta.glob("../../assets/icons/*.component.tsx");

/**
 * Hook to load a single component dynamically
 * Handles both icons (from assets/icons) and templates (navbars, footers)
 *
 * @param componentName - Name of the component/icon to load
 * @param options - Configuration options
 * @param options.folder - Folder for templates (e.g., "navbars", "footers")
 * @param options.customPath - Full custom path for the component
 * @param options.onError - Error callback
 * @returns The loaded component or null
 *
 * @example
 * // Load an icon
 * const Icon = useLoadComponent('instagram');
 *
 * @example
 * // Load a template
 * const Footer = useLoadComponent('classicFooter', { folder: 'footers' });
 */
export function useLoadComponent<T = React.ComponentType<IconProps>>(
  componentName: string | null,
  options?: SingleComponentOptions,
): T | null {
  const [component, setComponent] = useState<T | null>(null);

  useEffect(() => {
    if (!componentName) {
      setComponent(null);
      return;
    }

    const loadComponent = async () => {
      try {
        let module;

        if (options?.customPath) {
          // Load from custom path
          module = await import(/* @vite-ignore */ options.customPath);
        } else if (options?.folder) {
          // Load template component (navbar, footer, etc.)
          const path = `../${options.folder}/src/${componentName}.component.tsx`;
          module = await import(/* @vite-ignore */ path);
        } else {
          // Load icon from assets
          const componentPath = `../../assets/icons/${componentName}.component.tsx`;
          const moduleLoader = componentFiles[componentPath];

          if (!moduleLoader) {
            throw new Error(`Component file not found: ${componentPath}`);
          }

          module = await moduleLoader();
        }

        const Component = module.default;
        setComponent(Component);
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        console.error(`Error loading component: ${componentName}`, err);
        options?.onError?.(err, componentName);
        setComponent(null);
      }
    };

    loadComponent();
  }, [componentName, options]);

  return component;
}

/**
 * Hook to load multiple components dynamically with flexible return types
 * Can return as array, record, or pre-rendered ReactNodes
 *
 * @param items - Array of component names (strings) or objects with {name, ...data}
 * @param options - Configuration options
 * @param options.returnAsRecord - Return as Record<name, Component> instead of array
 * @param options.renderFn - Optional render function to return ReactNodes instead of components
 * @param options.onError - Error callback
 * @returns Array of results, Record, or ReactNodes based on options
 *
 * @example
 * // Load as Record
 * const icons = useLoadComponents(['instagram', 'facebook'], { returnAsRecord: true });
 * // Result: { instagram: Component, facebook: Component }
 *
 * @example
 * // Load and render
 * const socialIcons = useLoadComponents(
 *   socials,
 *   { renderFn: (Component, data) => <a key={data.name}><Component /></a> }
 * );
 * // Result: [<a>...</a>, <a>...</a>]
 *
 * @example
 * // Load as array with data
 * const results = useLoadComponents([{ name: 'icon1' }, { name: 'icon2' }]);
 * // Result: [{ name, component, data }, { name, component, data }]
 */
export function useLoadComponents<T extends string | { name: string }>(
  items: T[],
  options?: MultipleComponentsOptions<T extends string ? { name: string } : T>,
):
  | Record<string, React.ComponentType<IconProps> | null>
  | React.ReactNode[]
  | Array<LoaderResult> {
  const hasRenderFn = !!options?.renderFn;
  const returnAsRecord = options?.returnAsRecord ?? false;

  const getInitialState = () => {
    if (hasRenderFn) return [];
    if (returnAsRecord) return {};
    return [];
  };

  const [result, setResult] = useState<
    | Record<string, React.ComponentType<IconProps> | null>
    | React.ReactNode[]
    | Array<LoaderResult>
  >(getInitialState());

  useEffect(() => {
    if (!items || items.length === 0) {
      let emptyState;
      if (hasRenderFn) {
        emptyState = [];
      } else if (returnAsRecord) {
        emptyState = {};
      } else {
        emptyState = [];
      }
      setResult(emptyState);
      return;
    }

    const loadComponents = async () => {
      const loadPromises = items.map(async (item, index) => {
        const name = typeof item === "string" ? item : item.name;
        const data = typeof item === "object" ? item : { name };

        try {
          const componentPath = `../../assets/icons/${name}.component.tsx`;
          const moduleLoader = componentFiles[componentPath];

          if (!moduleLoader) {
            throw new Error(`Component file not found: ${componentPath}`);
          }

          const module = await moduleLoader();
          // @ts-expect-error - Dynamic import type
          const Component = module.default;

          // If renderFn is provided, render immediately
          if (hasRenderFn && options.renderFn) {
            return options.renderFn(
              Component,
              data as T extends string ? { name: string } : T,
              index,
            );
          }

          return {
            name,
            component: Component,
            data: typeof item === "object" ? item : undefined,
          };
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error));
          console.error(`Error loading component: ${name}`, err);
          options?.onError?.(err, name);

          if (hasRenderFn) {
            return null;
          }

          return {
            name,
            component: null,
            error: err,
            data: typeof item === "object" ? item : undefined,
          };
        }
      });

      const results = await Promise.all(loadPromises);

      if (hasRenderFn) {
        // Return filtered ReactNodes
        setResult(results.filter(Boolean) as React.ReactNode[]);
      } else if (returnAsRecord) {
        // Return as Record<string, Component>
        const componentsRecord: Record<
          string,
          React.ComponentType<IconProps> | null
        > = {};
        results.forEach((res: LoaderResult | React.ReactNode) => {
          if (res && typeof res === "object" && "name" in res) {
            componentsRecord[res.name] = res.component;
          }
        });
        setResult(componentsRecord);
      } else {
        // Return as array of LoaderResult
        setResult(results as LoaderResult[]);
      }
    };

    loadComponents();
  }, [items, hasRenderFn, returnAsRecord]);

  return result;
}
