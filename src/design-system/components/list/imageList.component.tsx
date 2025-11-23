import { useEffect, useRef, useState } from "react";

import { getCustomer } from "../../../customer.utils";
import {
  ConsultButton,
  Container,
  ImageItem,
  ImageList,
  ImageWrapper,
  Overlay,
  ScrollButton,
  Section,
  SubTitle,
  Title,
} from "./imageList.styled";

const List = (datas) => {
  const customer = getCustomer();
  const scrollContainerRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  const scroll = (direction) => {
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

  const { title, subtitle, images } = datas;

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Section>
      {title ? <Title>{title}</Title> : null}
      {subtitle ? <SubTitle>{subtitle}</SubTitle> : null}
      <Container>
        {showButtons && (
          <ScrollButton onClick={() => scroll("left")}>‹</ScrollButton>
        )}
        <ImageList ref={scrollContainerRef} $imagecount={images.length}>
          {images.map((image) => (
            <ImageWrapper key={image.src}>
              <ImageItem
                src={`${import.meta.env.BASE_URL}assets/${customer}/clients/${image.src}.webp`}
                alt={image.alt}
                tabIndex={-1}
              />
              <Overlay>
                <a tabIndex={-1} key={image.src} href={image.link}>
                  <ConsultButton>Consulter</ConsultButton>
                </a>
              </Overlay>
            </ImageWrapper>
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
