import classNames from "classnames";
import { useEffect, useState } from "react";

import { getCustomer } from "../../../customer.utils";
import { ToggleButton } from "../../buttons/src/classicButton.component";
import styles from "./banner.module.css";
import { BannerDatas } from "./banner.types";

const Banner = (datas: BannerDatas) => {
  const customer = getCustomer();

  const {
    features: {
      multi,
      textPositionFeature,
      medium = false,
      mask = true,
      logoAsTitle = false,
    },
    title,
    subTitle,
    subTitle2,
    images,
    textPosition = "bottom-left",
    contact,
  } = datas;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (multi) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [images.length, multi]);

  const handleSelectorClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Convert kebab-case to camelCase for CSS class names
  const textPositionClass = textPosition.replace(/-([a-z])/g, (g) =>
    g[1].toUpperCase(),
  );

  // Render title content (either logo or text)
  const renderTitleContent = () => {
    if (logoAsTitle && title) {
      return (
        <div className={styles.logoContainer}>
          <img
            src={`/assets/${customer}/icons/${title}.webp`}
            alt={title}
            className={styles.logo}
          />
        </div>
      );
    }

    return (
      <>
        {title ? <h1 className={styles.title}>{title}</h1> : null}
        {subTitle ? <h2 className={styles.subTitle}>{subTitle}</h2> : null}
        {subTitle2 ? <h2 className={styles.subTitle}>{subTitle2}</h2> : null}
      </>
    );
  };

  return (
    <section
      className={classNames(styles.content, {
        [styles.medium]: medium,
      })}
      data-testid="bannerRoot"
    >
      {contact ? (
        <div className={styles.overlay}>
          <div
            className={classNames(
              styles.textContainer,
              styles[textPositionClass],
              {
                active: textPositionFeature,
                [styles.medium]: medium,
                [styles.isSplit]: contact,
              },
            )}
          >
            {renderTitleContent()}
          </div>
          <div className={styles.contactContainer}>
            {contact.map((info) => (
              <ToggleButton key={info.type} {...info} />
            ))}
          </div>
        </div>
      ) : (
        <div
          className={classNames(
            styles.textContainer,
            styles[textPositionClass],
            {
              active: textPositionFeature,
              [styles.medium]: medium,
              [styles.isSplit]: contact,
            },
          )}
        >
          {renderTitleContent()}
        </div>
      )}
      <div
        className={classNames(styles.backgroundContainer, {
          [styles.mask]: mask,
        })}
      >
        {images.map((image, index) => {
          const { name, copyright } = image || {};
          const { url, title: copyrightTitle } = copyright || {};

          return (
            <div key={name}>
              <img
                alt={`Background ${name}`}
                src={`/assets/${customer}/${name}.webp`}
                className={classNames(styles.background, {
                  [styles.active]: index === currentIndex,
                })}
              />
              {url && copyrightTitle ? (
                <a
                  key={`link-${url}`}
                  href={url}
                  className={styles.redirectLink}
                >
                  {copyrightTitle}
                </a>
              ) : null}
            </div>
          );
        })}
      </div>
      {multi ? (
        <div className={styles.selectorsContainer}>
          {images.map((image, index) => (
            <div
              key={`image-${image.name}`}
              className={classNames(styles.selector, {
                [styles.active]: index === currentIndex,
              })}
              onClick={() => handleSelectorClick(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelectorClick(index);
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default Banner;
