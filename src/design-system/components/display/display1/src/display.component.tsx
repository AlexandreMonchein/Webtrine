import classNames from "classnames";

import { Image, ImageContainer, ShowcaseContainer } from "./display.styled";


// Component to display images
export const Display = ({ template }) => {
  const images = template[0].datas.images;

  return (
    <ShowcaseContainer >
      {images.map((image, index) => (
        <ImageContainer className={classNames({
          "double-width": image.width === 400,
          "double-height": image.height === 400
        })}><Image
            key={index}
            src={image.src}
            alt={image.alt}
            className={classNames({
              "double-width": image.width === 400,
              "double-height": image.height === 400
            })}
          /></ImageContainer>

      ))}
    </ShowcaseContainer>
  );
};