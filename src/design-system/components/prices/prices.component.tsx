import { useSelector } from "react-redux";

import { getTemplates } from "../../../store/state.selector";

import AllInOne from "./allInOne.component";
import MultiplePrices from "./multiplePrices.component";

const Prices = () => {
  const template = useSelector(getTemplates).find(
    (template) => template.type === "prices"
  );

  switch (template.id) {
    case "multiplePrices":
      return <MultiplePrices {...template.datas} />;

    case "allInOne":
      return <AllInOne {...template.datas} />;

    default:
      return null;
  }
};

export default Prices;
