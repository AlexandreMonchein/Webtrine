import React, { useEffect, useRef, useState } from "react";

import { SectionTitle } from "../../description/src/description.styled";

import {
  Container,
  ImageItem,
  ImageList,
  ScrollButton,
  Section,
} from "./list.styled";

export const List = (template) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowButtons(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const { title, images } = template;

  return (
    <Section>
      {title ? <SectionTitle>{title}</SectionTitle> : null}
      <Container>
        {showButtons && (
          <ScrollButton onClick={() => scroll("left")}>‹</ScrollButton>
        )}
        <ImageList ref={scrollContainerRef} imageCount={images.length}>
          {images.map((image, index) => (
            <a
              key={index}
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImageItem
                src={require(
                  `../../../../assets/webtrine/clients/${image.src}.jpeg`
                )}
                alt={`Trust Image ${index + 1}`}
              />
            </a>
          ))}
        </ImageList>
        {showButtons && (
          <ScrollButton onClick={() => scroll("right")}>›</ScrollButton>
        )}
      </Container>
    </Section>
  );
};
