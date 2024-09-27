import classNames from "classnames";

import { getCustomer } from "../../../../customer.utils";

import {
  Container,
  Content,
  Image,
  ImageWrapper,
  Section,
  SectionTitle,
  Text,
} from "./description.styled";

const Description = (datas) => {
  const customer = getCustomer();
  const {
    features: { isReversed, isContinious = false },
    image,
    title,
    content,
  } = datas;

  return (
    <Section
      data-testid="WhoWeAre"
      className={classNames({
        isContinious: isContinious,
      })}
    >
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
