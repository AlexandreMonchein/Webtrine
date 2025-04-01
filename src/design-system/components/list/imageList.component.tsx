import { useEffect, useRef, useState } from "react";
import {
  Container,
  ImageItem,
  ImageList,
  ScrollButton,
  Section,
  SubTitle,
  Title,
  ImageWrapper,
  Overlay,
  ConsultButton,
} from "./imageList.styled";
import { getCustomer } from "../../../customer.utils";

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
      {title ? <Title tabIndex={0}>{title}</Title> : null}
      {subtitle ? <SubTitle tabIndex={0}>{subtitle}</SubTitle> : null}
      <Container>
        {showButtons && (
          <ScrollButton onClick={() => scroll("left")}>‹</ScrollButton>
        )}
        <ImageList ref={scrollContainerRef} $imagecount={images.length}>
          {images.map((image, index) => (
            <ImageWrapper>
              <ImageItem
                src={`${import.meta.env.BASE_URL}assets/${customer}/clients/${image.src}.jpg`}
                alt={image.alt}
                tabIndex={-1}
              />
              <Overlay>
                <a tabIndex={-1} key={index} href={image.link}>
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
