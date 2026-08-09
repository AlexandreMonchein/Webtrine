import { useEffect, useRef, useState } from "react";

import { getCustomer } from "../../../customer.utils";
import { useLoadComponent } from "../../utils/useLoadComponents.hook";
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
import type { ImageListProps } from "./imageList.types";

const List = ({
  title,
  subtitle,
  images,
  "data-testid": dataTestid,
}: ImageListProps) => {
  const customer = getCustomer();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);

  const ChevronLeft = useLoadComponent("chevronLeft");
  const ChevronRight = useLoadComponent("chevronRight");

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      // Image width (200px) + gap (48px) = 248px per image
      const scrollAmount = direction === "left" ? -248 : 248;
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

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Section data-testid={dataTestid}>
      {title ? <Title>{title}</Title> : null}
      {subtitle ? <SubTitle>{subtitle}</SubTitle> : null}
      <Container>
        {showButtons && ChevronLeft && (
          <ScrollButton onClick={() => scroll("left")}>
            <ChevronLeft size={40} />
          </ScrollButton>
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
        {showButtons && ChevronRight && (
          <ScrollButton onClick={() => scroll("right")}>
            <ChevronRight size={40} />
          </ScrollButton>
        )}
      </Container>
    </Section>
  );
};

export default List;
