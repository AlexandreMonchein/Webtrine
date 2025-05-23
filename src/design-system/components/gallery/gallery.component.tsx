import classNames from "classnames";

import { Card } from "./card.component";
import {
  CardWrapper,
  GalleryRoot,
  MainColumn,
  Wrapper,
} from "./gallery.styled";

const Gallery = (datas) => {
  const {
    template: { type },
  } = datas;

  return (
    <GalleryRoot className={classNames({ isLogo: type === "logo" })}>
      <MainColumn>
        <Wrapper className={classNames({ isLogo: type === "logo" })}>
          {datas.template.inventory.map((data) => (
            <CardWrapper
              key={data.imageSrc}
              className={classNames({ isLogo: type === "logo" })}
            >
              <Card data={data} type={type} />
            </CardWrapper>
          ))}
        </Wrapper>
      </MainColumn>
    </GalleryRoot>
  );
};

export default Gallery;
