import React from "react";
import { useSelector } from "react-redux";

import { getTemplates } from "../../../store/state.selector";
import { Contact } from "../../components/contact/src/contact.component";
import { Description } from "../../components/description/src/description.component";
import { Banner } from "../../components/presentation/src/banner.component";
import { Showcase } from "../../components/showcase/src/showcase.component";

import { Content } from "./home.styled";

export const Home = () => {
  const templates = useSelector(getTemplates);

  return (
    <Content data-testid="Home">
      <Banner {...templates[0].datas} />
      <Description {...templates[1].datas} />
      <Showcase {...templates[2].datas} />
      <Description {...templates[1].datas} />
      <Contact />
    </Content>
  );
};
