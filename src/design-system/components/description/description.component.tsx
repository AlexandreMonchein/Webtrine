import classNames from "classnames";

import { getCustomer } from "../../../customer.utils";

import {
  Container,
  Content,
  Image,
  ImageContainer,
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
                tabIndex={0}
                src={require(`../../../assets/${customer}/${image}.jpg`)}
                alt=""
              />
            </ImageContainer>
          ) : null}
          {content &&
            content.map(({ text }, index) => {
              return (
                <Text tabIndex={0} key={index}>
                  {text}
                </Text>
              );
            })}
        </Content>
      </Container>
    </Section>
  );
};

export default Description;
