import classNames from "classnames";

import styles from "./example.module.css";
import type { ExampleProps } from "./example.types";

export const Example = ({
  children,
  title,
  description,
  variant = "default",
  disabled = false,
}: ExampleProps) => {
  return (
    <div
      className={classNames(styles.exampleRoot, {
        [styles.exampleRootPrimary]: variant === "primary",
        [styles.exampleRootSecondary]: variant === "secondary",
        [styles.exampleRootDisabled]: disabled,
      })}
      data-testid="exampleRoot"
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
};

export default Example;
