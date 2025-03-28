import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { getCustomer } from "../../../customer.utils";
import { SectionTitle } from "../description/description.styled";

import {
  Container,
  ImageItem,
  ImageList,
  ScrollButton,
  Section,
} from "./imageList.styled";

const List = (datas) => {
  const customer = useSelector(getCustomer);
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

  const { title, images } = datas;

  return (
    <Section>
      {title ? <SectionTitle>{title}</SectionTitle> : null}
      <Container>
        {showButtons && (
          <ScrollButton onClick={() => scroll("left")}>‹</ScrollButton>
        )}
        <ImageList ref={scrollContainerRef} $imagecount={images.length}>
          {images.map((image, index) => (
            <a
              key={index}
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImageItem
                src={`${import.meta.env.BASE_URL}/assets/${customer}/clients/${image.src}.jpeg`}
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

export default List;
