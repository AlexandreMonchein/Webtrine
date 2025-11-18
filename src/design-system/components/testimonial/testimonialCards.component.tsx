import React, { useCallback, useEffect, useRef, useState } from "react";

import * as S from "./testimonialCards.styled";
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
  const { name, position, company, rating, content, avatar, date } =
    testimonial;

  const displayPosition =
    position && company ? `${position} chez ${company}` : position || company;

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <S.Star key={index} $filled={index < rating} aria-hidden="true">
        ★
      </S.Star>
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
    <S.TestimonialCard>
      <S.CardHeader>
        <S.AvatarContainer>
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
              <S.AvatarFallback data-fallback style={{ display: "none" }}>
                {initials}
              </S.AvatarFallback>
            </>
          ) : (
            <S.AvatarFallback>{initials}</S.AvatarFallback>
          )}
        </S.AvatarContainer>

        <S.UserInfo>
          <S.UserName>{name}</S.UserName>
          {displayPosition && (
            <S.UserPosition>{displayPosition}</S.UserPosition>
          )}
          {date && <S.PublicationDate>{formatDate(date)}</S.PublicationDate>}
        </S.UserInfo>
      </S.CardHeader>

      <S.StarsContainer>{renderStars()}</S.StarsContainer>

      <S.TestimonialContent>{content}</S.TestimonialContent>
    </S.TestimonialCard>
  );
};

const TestimonialCards: React.FC<TestimonialCardsProps> = ({
  testimonials,
  autoplay = false,
  autoplayDelay = 5000,
}) => {
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
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <S.TestimonialCardsContainer>
        <S.TestimonialCardsWrapper $currentIndex={currentIndex}>
          {slides.map((slide) => (
            <S.TestimonialCardsSlide key={slide.map((t) => t.id).join("-")}>
              {slide.map((testimonial) => (
                <TestimonialCardsItem
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </S.TestimonialCardsSlide>
          ))}
        </S.TestimonialCardsWrapper>

        {totalSlides > 1 && (
          <S.NavigationContainer>
            <S.PaginationContainer>
              {slides.map((slide, index) => (
                <S.PaginationDot
                  key={slide.map((t) => t.id).join("-")}
                  $active={index === currentIndex}
                  onClick={() => goToSlide(index)}
                  aria-label={`Aller au slide ${index + 1}`}
                />
              ))}
            </S.PaginationContainer>
          </S.NavigationContainer>
        )}
      </S.TestimonialCardsContainer>
    </div>
  );
};

export default TestimonialCards;
