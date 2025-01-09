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
    features: { isReversed = false, isContinious = false },
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
      {title ? <SectionTitle>{title}</SectionTitle> : null}
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
          {content &&
            content.map(({ text }, index) => {
              return <Text key={index}>{text}</Text>;
            })}
        </Content>
      </Container>
    </Section>
  );
};

export default Description;
