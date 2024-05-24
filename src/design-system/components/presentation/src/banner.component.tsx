import { getCustomer } from "../../../../customer.utils";

import {
  Background,
  BackgroundContainer,
  Content,
  SubTitle,
  TextContainer,
  Title,
} from "./banner.styled";

export const Banner = (template) => {
  const customer = getCustomer();

  const {
    features,
    datas: { title, subTitle },
  } = template;

  return (
    <Content>
      <a id="banner" />
      <TextContainer>
        {title ? <Title>{title}</Title> : null}
        {subTitle ? <SubTitle>{subTitle}</SubTitle> : null}
      </TextContainer>
      <BackgroundContainer>
        <Background
          alt="Background"
          src={require(
            `../../../../assets/${customer}/presentation/banner/banner.jpg`
          )}
        />
      </BackgroundContainer>
    </Content>
  );
};

export default Banner;
