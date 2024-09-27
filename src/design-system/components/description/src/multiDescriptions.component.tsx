import { useSelector } from "react-redux";

import { getTemplate } from "../../../../App";
import { getTemplates } from "../../../../store/state.selector";
import Banner from "../../banner/src/banner.component";

import Description from "./description.component";

const MultiDescription = ({ templateName = null }) => {
  const template = getTemplate(
    "description",
    "multiDescriptions",
    templateName
  );

  if (!template) {
    return null;
  }

  const {
    datas: { content },
  } = template || {};

  const { topBanner, description, bottomBanner } = content || {};

  return (
    <>
      {topBanner && <Banner {...topBanner} />}
      {description.map((data, index) => {
        return (
          <Description
            key={index}
            {...data}
            features={{ isReversed: index % 2 === 1, isContinious: true }}
          />
        );
      })}
      {bottomBanner && <Banner {...bottomBanner} />}
    </>
  );
};

export default MultiDescription;
