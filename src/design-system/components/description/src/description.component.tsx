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

export const Description = (template) => {
  const { t } = useTranslation();
  const { features, src, title, content } = template;

  return (
    <Section data-testid="WhoWeAre">
      <a id="description" />
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

          <TextContent>
            <Text
              className={classNames({
                isCentered: features.isCentered,
              })}
            >
              {content}
            </Text>
          </TextContent>
        </Content>
      </Container>
    </Section>
  );
};
