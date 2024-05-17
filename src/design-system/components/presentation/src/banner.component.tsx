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
    const client = useSelector(getClient);
    console.warn(">>> Banner", title, subTitle);

    return (
        <Content>
            <TextContainer>
                {title ? <Title>{title}</Title> : null}
                {subTitle ? <SubTitle>{subTitle}</SubTitle> : null}
            </TextContainer>
            <BackgroundContainer>
                <Background alt='Background' src={require(`../../../../assets/${client}/presentation/presentationWithBackground/background.jpg`)} /></BackgroundContainer>
        </Content>
    );
};

export default Banner;