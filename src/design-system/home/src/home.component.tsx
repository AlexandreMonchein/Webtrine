import { Contact } from "../../components/contact/src/contact.component";
import { Description } from "../../components/description/src/description.component";
import { Banner } from "../../components/presentation/src/banner.component";
import { Showcase } from "../../components/showcase/src/showcase.component";

import { Content } from "./home.styled";

export const Home = ({ templates }) => {
  return (
    <Content data-testid="Home">
      <Banner {...templates[2]?.datas} />
      <Description {...templates[3]?.datas} />
      <Showcase {...templates[4]?.datas} />
      <Description {...templates[5]?.datas} />
      <Contact {...templates[6]?.datas} />
    </Content>
  );
};
