import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { getClient } from "../../../../store/state.selector";

import {
    Background,
    BackgroundContainer,
    Content,
    SubTitle,
    TextContainer,
    Title,
} from "./presentationWithBackground.styled";

export const PresentationWithBackground = ({ title, subTitle }) => {
    const client = useSelector(getClient);
    console.warn(">>> PresentationWithBackground", title, subTitle);

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

export default PresentationWithBackground;