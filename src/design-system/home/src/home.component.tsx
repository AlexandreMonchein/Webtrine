import React from "react";

import { Contact } from "../../components/contact/src/contact.component";
import { Description } from "../../components/description/src/description.component";
import { Banner } from "../../components/presentation/src/banner.component";
import { Showcase } from "../../components/showcase/src/showcase.component";

import { Content } from "./home.styled";

export const Home = ({ template }) => {

  return (
    <Content data-testid="Home">
      <Banner {...template[0]?.datas} />
      <Description {...template[1]?.datas} />
      <Showcase {...template[2]?.datas} />
      <Description {...template[3]?.datas} />
      <Contact {...template[4]?.datas} />
    </Content>
  );
};
