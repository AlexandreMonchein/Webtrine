import { getTemplate } from "../../../../App";
import Banner from "../../banner/src/banner.component";
import Gallery from "../../gallery/src/gallery.component";

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

  const { topBanner, description, gallery, bottomBanner } = content || {};

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
      {gallery && <Gallery template={gallery} />}
      {bottomBanner && <Banner {...bottomBanner} />}
    </>
  );
};

export default MultiDescription;
