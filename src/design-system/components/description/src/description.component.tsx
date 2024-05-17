import classNames from "classnames";
import { useSelector } from "react-redux";

import { getTemplates } from "../../../../store/state.selector";

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
  const src = "https://changemavie.com/wp-content/uploads/2024/02/equipe-1.jpg";

  return (
    <Section data-testid="WhoWeAre">
      <SectionTitle>Qui sommes-nous ?</SectionTitle>
      <Container>
        <Content
          className={classNames({
            isReversed: false,
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
                isCentered: false,
              })}
            >
              Enim ex aliquip reprehenderit ad excepteur aliqua excepteur amet
              proident duis qui exercitation. Exercitation laboris duis elit
              mollit ut incididunt adipisicing voluptate irure adipisicing minim
              culpa proident. Proident nostrud cillum sint Lorem excepteur.
              Laboris non exercitation sint do quis id deserunt exercitation
              sunt sunt pariatur ullamco esse.
            </Text>
          </TextContent>
        </Content>
      </Container>
    </Section>
  );
};
