import classNames from "classnames";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

import { getCustomer } from "../../../customer.utils";
import {
  ButtonLink,
  ButtonWrapper,
  Container,
  Content,
  Image,
  ImageContainer,
  Section,
  SectionTitle,
  Text,
} from "./description.styled";
import { DescriptionContentItem, DescriptionProps } from "./description.types";

const Description: React.FC<DescriptionProps> = (datas) => {
  const customer = getCustomer();

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
        <ButtonWrapper key={`${item.button.label}-${index}`}>
          <ButtonLink>
            <Link to={item.button.to}>{item.button.label}</Link>
          </ButtonLink>
        </ButtonWrapper>
      );
    }

    // Sinon c'est un texte
    if ("text" in item) {
      return (
        <Text
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
      {title ? <SectionTitle>{title}</SectionTitle> : null}
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
