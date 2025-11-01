import DOMPurify from "dompurify";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

import { getCustomer } from "../../../customer.utils";
import { DescriptionProps, DescriptionContentItem } from "./description.types";

import {
  Container,
  Content,
  Image,
  ImageContainer,
  Section,
  SectionTitle,
  Text,
  ButtonLink,
} from "./description.styled";

const Description: React.FC<DescriptionProps> = (datas) => {
  const customer = getCustomer();
  const { state: locationState } = useLocation();

  const {
    features: { isReversed = false, isContinious = false },
    image,
    title,
    content,
  } = datas;

  const renderContentItem = (item: DescriptionContentItem, index: number) => {
    // Vérifier si c'est un bouton
    if ("button" in item) {
      return (
        <ButtonLink key={index}>
          <Link to={item.button.to} tabIndex={0}>
            {item.button.label}
          </Link>
        </ButtonLink>
      );
    }

    // Sinon c'est un texte
    if ("text" in item) {
      return (
        <Text
          tabIndex={0}
          key={index}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.text) }}
        />
      );
    }

    return null;
  };

  return (
    <Section
      className={classNames({
        isContinious: isContinious,
      })}
    >
      {title ? <SectionTitle tabIndex={0}>{title}</SectionTitle> : null}
      <Container>
        <Content>
          {image ? (
            <ImageContainer
              className={classNames({
                isReversed: isReversed,
              })}
            >
              <Image
                tabIndex={image.focusable ? 0 : -1}
                src={`${import.meta.env.BASE_URL}assets/${customer}/${image.name}.webp`}
                alt={image.alt}
              />
            </ImageContainer>
          ) : null}
          {content
            ? content.map((item, index) => renderContentItem(item, index))
            : null}
        </Content>
      </Container>
    </Section>
  );
};

export default Description;
