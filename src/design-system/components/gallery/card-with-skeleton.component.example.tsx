import classNames from "classnames";
import { useState } from "react";

import { getCustomer } from "../../../customer.utils";
import { ImageSkeleton } from "./card.styled";
import { Image, Wrapper } from "./gallery.styled";

export const Card = ({ data, type }) => {
  const { imageSrc, alt } = data;
  const [isLoaded, setIsLoaded] = useState(false);
  const customer = getCustomer();

  const imageSrc = `${import.meta.env.BASE_URL}assets/${customer}/${imageSrc}.webp`;

  return (
    <Wrapper className={classNames({ isLogo: type === "logo" })}>
      {!isLoaded && (
        <ImageSkeleton className={classNames({ isLogo: type === "logo" })} />
      )}
      <Image
        className={classNames({ isLogo: type === "logo", loaded: isLoaded })}
        alt={alt}
        src={imageSrc}
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        width="450"
        height="450"
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? "block" : "none" }}
      />
    </Wrapper>
  );
};

export default Card;
