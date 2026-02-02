import classNames from "classnames";

import styles from "./example.module.css";
import type { ExampleProps } from "./example.types";

/**
 * Example Component - CSS Modules Pattern
 *
 * This component demonstrates how to use CSS Modules in the Webtrine project.
 * It shows best practices for:
 * - Importing CSS modules
 * - Using classNames library for conditional classes
 * - Applying variant and state modifiers
 * - Maintaining TypeScript type safety
 */
export const Example = ({
  children,
  title,
  description,
  variant = "default",
  disabled = false,
  "data-testid": dataTestid,
}: ExampleProps) => {
  return (
    <div
      className={classNames(styles.exampleRoot, {
        [styles.exampleRootPrimary]: variant === "primary",
        [styles.exampleRootSecondary]: variant === "secondary",
        [styles.exampleRootDisabled]: disabled,
      })}
      data-testid={dataTestid}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
};
