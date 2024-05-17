import React from "react";
import classNames from "classnames";
import styled from "styled-components";

// Container for the showcase page
const ShowcaseContainer = styled.div`
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  max-width: calc(100% - 80px); /* Réserve 40px de padding de chaque côté */
  margin: 0 auto;
  overflow: hidden;
`;

// Styled image
const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: center;

  &.double-width {
    width: 100%;
    grid-column-end: span 2;
  }

  &.double-height {
    height: 100%;
    grid-row-end: span 2;
  }
`;

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