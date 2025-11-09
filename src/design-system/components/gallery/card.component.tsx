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
        tabIndex={0}
        alt={alt}
        src={`${import.meta.env.BASE_URL}assets/${customer}/${imageSrc}.webp`}
      />
    </Wrapper>
  );
};

export default Card;
