import classNames from "classnames";

import styles from "./callToAction.module.css";
import type { CallToActionProps } from "./callToAction.types";

export const CallToAction = ({
  text,
  icon,
  onClick,
  href,
  variant = "primary",
  size = "medium",
  shape = "pill",
}: CallToActionProps) => {
  const buttonClasses = classNames(styles.button, {
    [styles.primary]: variant === "primary",
    [styles.secondary]: variant === "secondary",
    [styles.small]: size === "small",
    [styles.medium]: size === "medium",
    [styles.large]: size === "large",
    [styles.pill]: shape === "pill",
    [styles.rounded]: shape === "rounded",
  });

  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{text}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        data-testid="callToActionRoot"
        aria-label={text}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonClasses}
      data-testid="callToActionRoot"
      aria-label={text}
    >
      {content}
    </button>
  );
};

export default CallToAction;
