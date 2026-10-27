import { useSelector } from "react-redux";

import { getTemplates } from "../../../store/state.selector";
import {
  Container,
  Content,
  ContentText,
  ContentTitle,
  ContentWrapper,
  Disclaimer,
  Main,
  MainSubtitle,
  MainTitle,
} from "./legals.styled";
import type { LegalsDatas, LegalsProps } from "./legals.types";

const Legals = ({ type = null }: LegalsProps) => {
  const templates = useSelector(getTemplates);
  const legalsTemplates = templates.filter(
    (template) => template.type === "legals",
  );

  const legalsDatas = legalsTemplates.find(
    (template) => template.datas?.type === type,
  )?.datas as LegalsDatas | undefined;

  if (!legalsDatas) {
    return null;
  }

  const { title, subTitle, disclaimer, content } = legalsDatas;

  return (
    <Container>
      <Main>
        <MainTitle>{title}</MainTitle>
        <MainSubtitle>{subTitle}</MainSubtitle>
        <Disclaimer>{disclaimer}</Disclaimer>
      </Main>
      <Content>
        {content.map(({ title, texts }) => (
          <ContentWrapper key={title}>
            <ContentTitle>{title}</ContentTitle>
            {texts.map((text) => (
              <ContentText key={text}>{text}</ContentText>
            ))}
          </ContentWrapper>
        ))}
      </Content>
    </Container>
  );
};

export default Legals;
