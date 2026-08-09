import classNames from "classnames";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

import { getCustomer } from "../../../customer.utils";
import styles from "./description.module.css";
import { DescriptionContentItem, DescriptionProps } from "./description.types";

const Description: React.FC<DescriptionProps> = (datas) => {
  const customer = getCustomer();

  const {
    features: {
      isReversed = false,
      isContinious = false,
      isCentered = false,
      isTextBefore = false,
    },
    images,
    title,
    hash,
    content,
  } = datas;

  const renderContentItem = (item: DescriptionContentItem, index: number) => {
    // Vérifier si c'est un bouton
    if ("button" in item) {
      return (
        <div
          key={`${item.button.label}-${index}`}
          className={styles.buttonWrapper}
        >
          <button type="button" className={styles.buttonLink}>
            <Link to={item.button.to}>{item.button.label}</Link>
          </button>
        </div>
      );
    }

    // Sinon c'est un texte
    if ("text" in item) {
      return (
        <p
          key={index}
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.text) }}
        />
      );
    }

    return null;
  };

  return (
    <section
      data-testid="descriptionRoot"
      className={classNames(styles.section, {
        [styles.isContinious]: isContinious,
      })}
    >
      {title ? (
        <h2 id={hash} className={styles.sectionTitle}>
          {title}
        </h2>
      ) : null}
      <div className={styles.container}>
        <div
          className={classNames(styles.content, {
            [styles.isTextBefore]: isTextBefore,
            [styles.isReversed]: isReversed,
            [styles.isCentered]: isCentered,
          })}
        >
          {images && images.length !== 0 ? (
            <div
              className={classNames(styles.imageContainer, {
                [styles.isReversed]: isReversed,
                [styles.isCentered]: isCentered,
              })}
            >
              {images.map((image) => (
                <div key={image.name}>
                  <img
                    src={`${import.meta.env.BASE_URL}assets/${customer}/${image.name}.webp`}
                    alt={image.alt}
                    className={classNames(styles.image, {
                      [styles.isCentered]: isCentered,
                    })}
                  />
                  {image.description ? (
                    <p style={{ textAlign: "center" }}>{image.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
          <div
            className={classNames(styles.textContent, {
              [styles.isCentered]: isCentered,
            })}
          >
            {content
              ? content.map((item, index) => renderContentItem(item, index))
              : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
