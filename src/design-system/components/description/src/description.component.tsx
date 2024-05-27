import classNames from "classnames";
import { useTranslation } from "react-i18next";

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
  const { features, src, title, content } = datas;

  return (
    <Section data-testid="WhoWeAre">
      <SectionTitle>{title}</SectionTitle>
      <Container>
        <Content
          className={classNames({
            isReversed: features.isReversed,
            isTextOnly: src ? false : true,
          })}
        >
          {src ? (
            <ImageWrapper>
              <Image src={src} />
            </ImageWrapper>
          ) : null}
          <Text
            className={classNames({
              isCentered: features.isCentered,
            })}
          >
            {content}
          </Text>
        </Content>
      </Container>
    </Section>
  );
};

export default Description;
