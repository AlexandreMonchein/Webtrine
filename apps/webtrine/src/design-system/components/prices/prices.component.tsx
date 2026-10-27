import AllInOne, { type AllInOneProps } from "./allInOne.component";
import MultiplePrices, {
  type MultiplePricesProps,
} from "./multiplePrices.component";

type PricesProps =
  | ({ type: "multiplePrices" } & MultiplePricesProps)
  | ({ type: "allInOne" } & AllInOneProps);

const Prices = (props: PricesProps) => {
  switch (props.type) {
    case "multiplePrices":
      return <MultiplePrices {...props} />;

    case "allInOne":
      return <AllInOne {...props} />;

    default:
      return null;
  }
};

export default Prices;
