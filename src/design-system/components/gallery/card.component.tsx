import classNames from "classnames";

import { getCustomer } from "../../../customer.utils";
import { Image } from "./card.styled";
import { Wrapper } from "./gallery.styled";

export const Card = ({ data, type }) => {
  const { imageSrc, alt } = data;

  const customer = getCustomer();

  return (
    <Wrapper className={classNames({ isLogo: type === "logo" })}>
      <Image
        className={classNames({ isLogo: type === "logo" })}
        alt={alt}
        src={`${import.meta.env.BASE_URL}assets/${customer}/${imageSrc}.webp`}
        loading="lazy"
        decoding="async"
        width="450"
        height="450"
        {...({
          fetchpriority: "low",
        } as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    </Wrapper>
  );
};

export default Card;
