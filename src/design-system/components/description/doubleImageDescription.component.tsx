import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getClient } from "../../../store/state.selector";
import styles from "./doubleImageDescription.module.css";
import type { DoubleImageDescriptionProps } from "./doubleImageDescription.types";

export const DoubleImageDescription = ({
  leftText,
  leftImage,
  rightImage,
  rightText,
  "data-testid": dataTestid,
}: DoubleImageDescriptionProps) => {
  const { name: clientName } = useSelector(getClient);

  const leftImageSrc = `${import.meta.env.BASE_URL}assets/${clientName}/${leftImage.image}.webp`;
  const rightImageSrc = `${import.meta.env.BASE_URL}assets/${clientName}/${rightImage.image}.webp`;

  return (
    <section
      className={styles.doubleImageDescriptionRoot}
      data-testid={dataTestid}
    >
      <div className={styles.column}>
        <div className={styles.imageWrapper}>
          <img
            src={leftImageSrc}
            alt={leftImage.imageAlt || ""}
            className={styles.image}
          />
          <Link
            to={leftText.link}
            className={`${styles.textBlock} ${styles.textBlockTop}`}
          >
            <div className={styles.textContent}>
              <h3 className={styles.title}>{leftText.title}</h3>
              <hr className={styles.divider} />
              <p className={styles.description}>{leftText.description}</p>
              <div className={styles.arrow}>→</div>
            </div>
          </Link>
        </div>
      </div>

      <div className={`${styles.column}`}>
        <div className={styles.imageWrapper}>
          <img
            src={rightImageSrc}
            alt={rightImage.imageAlt || ""}
            className={styles.image}
          />
          <Link
            to={rightText.link}
            className={`${styles.textBlock} ${styles.textBlockBottom}`}
          >
            <div className={styles.textContent}>
              <h3 className={styles.title}>{rightText.title}</h3>
              <hr className={styles.divider} />
              <p className={styles.description}>{rightText.description}</p>
              <div className={styles.arrow}>→</div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoubleImageDescription;
