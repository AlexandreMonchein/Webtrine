import classNames from "classnames";
import { useState } from "react";

import { getCustomer } from "../../../customer.utils";
import styles from "./card.module.css";
import type { CardProps } from "./gallery.types";

export const Card = ({ data, type }: CardProps) => {
  const { imageSrc: imageFileName, alt } = data;
  const [isLoaded, setIsLoaded] = useState(false);

  const customer = getCustomer();
  const imageSrc = `${import.meta.env.BASE_URL}assets/${customer}/${imageFileName}.webp`;

  return (
    <article style={{ position: "relative" }}>
      {!isLoaded && (
        <div
          className={classNames(styles.imageSkeleton, {
            [styles.imageSkeletonIsLogo]: type === "logo",
          })}
        />
      )}
      <img
        className={classNames(styles.image, {
          [styles.imageIsLogo]: type === "logo",
        })}
        alt={alt}
        src={imageSrc}
        loading="lazy"
        decoding="async"
        width="450"
        height="450"
        onLoad={() => setIsLoaded(true)}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        {...({
          fetchpriority: "low",
        } as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    </article>
  );
};

export default Card;
