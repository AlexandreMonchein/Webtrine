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
        alt={alt}
        src={`${import.meta.env.BASE_URL}assets/${customer}/${imageSrc}.webp`}
        loading="lazy"
      />
    </Wrapper>
  );
};

export default Card;
