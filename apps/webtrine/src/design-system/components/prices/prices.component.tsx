import AllInOne from "./allInOne.component";
import MultiplePrices from "./multiplePrices.component";

const Prices = (props) => {
  const { type } = props;

  switch (type) {
    case "multiplePrices":
      return <MultiplePrices {...props} />;

    case "allInOne":
      return <AllInOne {...props} />;

    default:
      return null;
  }
};

export default Prices;
