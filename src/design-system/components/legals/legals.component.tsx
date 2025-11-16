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

const Legals = ({ type = null }) => {
  const templates = useSelector(getTemplates);
  const legalsTemplates = templates.filter(
    (template) => template.type === "legals",
  );

  const {
    datas: { title, subTitle, disclaimer, content },
  } = legalsTemplates.find((template) => template.datas.type === type);

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
            {texts.map((text, index) => (
              <ContentText key={index}>{text}</ContentText>
            ))}
          </ContentWrapper>
        ))}
      </Content>
    </Container>
  );
};

export default Legals;
