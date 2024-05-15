import React from "react";
import { useSelector } from "react-redux";

import { getTemplates } from "../../../store/state.selector";
import PresentationWithBackground from "../../components/presentation/src/presentationWithBackground.component";

import { Content } from "./home.styled";

export const Home = () => {
  const templates = useSelector(getTemplates);
  console.warn(">>> Home", templates);

  return <Content data-testid='Home'>
    <PresentationWithBackground {...templates[0].datas} />
  </Content>;
};
