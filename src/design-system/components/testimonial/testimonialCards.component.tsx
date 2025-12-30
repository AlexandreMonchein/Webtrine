import React, { useCallback, useEffect, useRef, useState } from "react";

import { Title } from "../cards/cardsList.styled";
import {
  AvatarContainer,
  AvatarFallback,
  NavigationContainer,
  PaginationContainer,
  PaginationDot,
  Section,
  Star,
  TestimonialCard,
  TestimonialContent,
} from "./testimonial.styled";
import {
  CardHeader,
  PublicationDate,
  StarsContainer,
  TestimonialCardsContainer,
  TestimonialCardsSlide,
  TestimonialCardsWrapper,
  UserInfo,
  UserName,
} from "./testimonialCards.styled";
import type {
  TestimonialCardsItemProps,
  TestimonialCardsProps,
} from "./testimonialCards.types";

// Hook pour détecter la taille d'écran et déterminer le nombre de cartes par slide
const useResponsiveCardsPerSlide = () => {
  const [cardsPerSlide, setCardsPerSlide] = useState(1);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth;
      // Utiliser les mêmes breakpoints que votre système
      if (width >= 1024) {
        // large
        setCardsPerSlide(3);
      } else if (width >= 768) {
        // medium
        setCardsPerSlide(2);
      } else {
        // small
        setCardsPerSlide(1);
      }
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);

    return () => {
      window.removeEventListener("resize", updateCardsPerSlide);
    };
  }, []);

  return cardsPerSlide;
};

const TestimonialCardsItem: React.FC<TestimonialCardsItemProps> = ({
  testimonial,
}) => {
  const { name, rating, content, avatar, date } = testimonial;

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} $filled={index < rating} aria-hidden="true">
        ★
      </Star>
    ));
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <TestimonialCard>
      <CardHeader>
        <AvatarContainer>
          {avatar ? (
            <>
              <img
                src={avatar}
                alt={`profil de ${name}`}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.parentNode?.querySelector(
                    "[data-fallback]",
                  ) as HTMLElement;
                  if (fallback) {
                    fallback.style.display = "flex";
                  }
                }}
              />
              <AvatarFallback data-fallback style={{ display: "none" }}>
                {initials}
              </AvatarFallback>
            </>
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </AvatarContainer>

        <UserInfo>
          <UserName>{name}</UserName>
          {date && <PublicationDate>{formatDate(date)}</PublicationDate>}
        </UserInfo>
      </CardHeader>

      <StarsContainer>{renderStars()}</StarsContainer>

      <TestimonialContent>{content}</TestimonialContent>
    </TestimonialCard>
  );
};

const TestimonialCards: React.FC<TestimonialCardsProps> = (props) => {
  const { title, testimonials, features } = props;
  const { autoplay = false, autoplayDelay = 5000 } = features || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const responsiveCardsPerSlide = useResponsiveCardsPerSlide();

  // Créer les slides avec le nombre responsive de cartes par slide
  const createSlides = () => {
    const slides = [];
    for (let i = 0; i < testimonials.length; i += responsiveCardsPerSlide) {
      slides.push(testimonials.slice(i, i + responsiveCardsPerSlide));
    }
    return slides;
  };

  const slides = createSlides();
  const totalSlides = slides.length;

  // Reset currentIndex si nécessaire quand cardsPerSlide change
  useEffect(() => {
    if (currentIndex >= totalSlides) {
      setCurrentIndex(0);
    }
  }, [responsiveCardsPerSlide, currentIndex, totalSlides]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)));
    },
    [totalSlides],
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Gestion de l'autoplay
  useEffect(() => {
    if (autoplay && totalSlides > 1) {
      intervalRef.current = setInterval(nextSlide, autoplayDelay);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }

    return () => clearInterval(intervalRef.current!);
  }, [autoplay, autoplayDelay, nextSlide, totalSlides]);

  // Cleanup de l'interval
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Pause autoplay au hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && totalSlides > 1) {
      intervalRef.current = setInterval(nextSlide, autoplayDelay);
    }
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <Section onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {title ? <Title>{title}</Title> : null}
      <TestimonialCardsContainer>
        <TestimonialCardsWrapper $currentIndex={currentIndex}>
          {slides.map((slide) => (
            <TestimonialCardsSlide key={slide.map((t) => t.id).join("-")}>
              {slide.map((testimonial) => (
                <TestimonialCardsItem
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </TestimonialCardsSlide>
          ))}
        </TestimonialCardsWrapper>

        {totalSlides > 1 && (
          <NavigationContainer>
            <PaginationContainer>
              {slides.map((slide, index) => (
                <PaginationDot
                  key={slide.map((t) => t.id).join("-")}
                  $active={index === currentIndex}
                  onClick={() => goToSlide(index)}
                  aria-label={`Aller au slide ${index + 1}`}
                />
              ))}
            </PaginationContainer>
          </NavigationContainer>
        )}
      </TestimonialCardsContainer>
    </Section>
  );
};

export default TestimonialCards;
