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
      <a id="banner" />
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
