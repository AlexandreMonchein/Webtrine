import classNames from "classnames";
import { useSelector } from "react-redux";

import { getTemplates } from "../../../../../store/state.selector";

import { Image, ImageContainer, ShowcaseContainer } from "./display.styled";

// Component to display images
export const Display = ({ template }) => {
  console.warn(">>> template", template);
  const images = template.datas.content;

  return (
    <ShowcaseContainer>
      {images.map((image, index) => (
        <ImageContainer
          className={classNames({
            "double-width": image.width === 400,
            "double-height": image.height === 400,
          })}
        >
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            className={classNames({
              "double-width": image.width === 400,
              "double-height": image.height === 400,
            })}
          />
        </ImageContainer>
      ))}
    </ShowcaseContainer>
  );
};
