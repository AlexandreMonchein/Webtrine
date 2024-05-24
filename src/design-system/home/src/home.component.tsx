import { Contact } from "../../components/contact/src/contact.component";
import { Description } from "../../components/description/src/description.component";
import { FlippingCard } from "../../components/flippingCard/src/flippingCard.component";
import { List } from "../../components/list/src/list.component";
import { Banner } from "../../components/presentation/src/banner.component";
import { Showcase } from "../../components/showcase/src/showcase.component";

import { Content } from "./home.styled";

export const Home = ({ templates }) => {
  return (
    <Content data-testid="Home">
      <Banner {...templates[2]?.datas} />
      <Description {...templates[3]?.datas} />
      <List {...templates[6]?.datas} />
      <FlippingCard {...templates[7]?.datas} />
      <Showcase {...templates[4]?.datas} />
      <Description {...templates[5]?.datas} />
      <Contact {...templates[8]?.datas} />
    </Content>
  );
};
