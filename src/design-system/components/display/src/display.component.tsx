import classNames from "classnames";

import { Image, ShowcaseContainer } from "./display.styled";

// Data for images
const imagesData = [
  { src: "https://via.placeholder.com/200x200", alt: "Image 1", width: 200, height: 200 },
  { src: "https://via.placeholder.com/400x200", alt: "Image 2", width: 400, height: 200 },
  { src: "https://via.placeholder.com/200x200", alt: "Image 3", width: 200, height: 200 },
  { src: "https://via.placeholder.com/400x200", alt: "Image 4", width: 400, height: 200 },
  { src: "https://via.placeholder.com/200x200", alt: "Image 5", width: 200, height: 200 },
  { src: "https://via.placeholder.com/400x200", alt: "Image 6", width: 400, height: 200 },
  { src: "https://via.placeholder.com/200x200", alt: "Image 7", width: 200, height: 200 },
  { src: "https://via.placeholder.com/400x200", alt: "Image 8", width: 400, height: 200 },
  { src: "https://via.placeholder.com/200x200", alt: "Image 9", width: 200, height: 200 },
  { src: "https://via.placeholder.com/400x200", alt: "Image 10", width: 400, height: 200 },
  { src: "https://via.placeholder.com/200x200", alt: "Image 11", width: 200, height: 200 },
  { src: "https://via.placeholder.com/400x200", alt: "Image 12", width: 400, height: 200 },
  { src: "https://via.placeholder.com/400x400", alt: "Image 13", width: 400, height: 400 },
  { src: "https://via.placeholder.com/200x400", alt: "Image 14", width: 200, height: 400 },
  { src: "https://via.placeholder.com/400x400", alt: "Image 15", width: 400, height: 400 },
  { src: "https://via.placeholder.com/200x400", alt: "Image 16", width: 200, height: 400 },
];

// Component to display images
export const Display = () => {
  return (
    <ShowcaseContainer>
      {imagesData.map((image, index) => (
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          className={classNames({
            "double-width": image.width === 400,
            "double-height": image.height === 400
          })}
        />
      ))}
    </ShowcaseContainer>
  );
};