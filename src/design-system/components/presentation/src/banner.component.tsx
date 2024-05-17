import { useSelector } from "react-redux";

import { getClient } from "../../../../store/state.selector";

import {
  Background,
  BackgroundContainer,
  Content,
  SubTitle,
  TextContainer,
  Title,
} from "./banner.styled";

export const Banner = ({ title, subTitle }) => {
  const client = 'dipaolo';

  return (
    <Content>
      <TextContainer>
        {title ? <Title>{title}</Title> : null}
        {subTitle ? <SubTitle>{subTitle}</SubTitle> : null}
      </TextContainer>
      <BackgroundContainer>
        <Background
          alt="Background"
          src={require(
            `../../../../assets/${client}/presentation/banner/banner.jpg`
          )}
        />
      </BackgroundContainer>
    </Content>
  );
};

export default Banner;
