import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { getCustomer } from "../../../../customer.utils";

import {
  Container,
  Content,
  Image,
  ImageWrapper,
  Section,
  SectionTitle,
  Text,
  TextContent,
} from "./description.styled";

const Description = (datas) => {
  const { t } = useTranslation();
  const customer = getCustomer();
  const {
    features: { isReversed },
    image,
    title,
    content,
  } = datas;

  return (
    <Section data-testid="WhoWeAre">
      <SectionTitle>{title}</SectionTitle>
      <Container>
        <Content>
          {image ? (
            <ImageWrapper
              className={classNames({
                isReversed: isReversed,
              })}
            >
              <Image
                src={require(`../../../../assets/${customer}/${image}.jpg`)}
              />
            </ImageWrapper>
          ) : null}
          {content.map(({ text }, index) => {
            return <Text key={index}>{text}</Text>;
          })}
        </Content>
      </Container>
    </Section>
  );
};

export default Description;
