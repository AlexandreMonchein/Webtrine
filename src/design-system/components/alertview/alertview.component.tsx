import { useEffect } from "react";

import { getCustomer } from "../../../customer.utils";
import { CallToAction } from "../../buttons/src/callToAction.component";
import { useLoadComponent } from "../../utils/useLoadComponents.hook";
import styles from "./alertview.module.css";
import type { AlertViewProps } from "./alertview.types";

export const AlertView = ({
  logo,
  title,
  description,
  ctaText,
  ctaIcon,
  ctaPosition,
  onClose,
}: AlertViewProps) => {
  const customer = getCustomer();
  const IconComponent = useLoadComponent(ctaIcon || null);

  // Block body scroll when modal is open
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleCtaClick = () => {
    if (onClose) {
      onClose();
    }
  };

  console.warn(">>> Alertview props:", {
    logo,
    title,
    description,
    ctaText,
    ctaIcon,
  });

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      data-testid="alertviewOverlay"
    >
      <div className={styles.alertviewRoot} data-testid="alertviewRoot">
        <div className={styles.content}>
          {logo && (
            <div className={styles.logoWrapper}>
              <img
                src={`/assets/${customer}/icons/${logo}.webp`}
                alt={logo}
                className={styles.logo}
              />
            </div>
          )}

          {title && <h2 className={styles.title}>{title}</h2>}

          {description && <p className={styles.description}>{description}</p>}

          {ctaText && (
            <CallToAction
              text={ctaText}
              onClick={handleCtaClick}
              variant="primary"
              icon={IconComponent ? <IconComponent size={24} /> : null}
              iconPosition={ctaPosition}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertView;
