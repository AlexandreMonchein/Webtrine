import React, { useState, useEffect, useCallback, useRef } from "react";
import type {
  TestimonialCardsProps,
  TestimonialCardsItemProps,
} from "./testimonialCards.types";
import * as S from "./testimonialCards.styled";

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
                alt={`Photo de profil de ${name}`}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.parentNode?.querySelector(
                    "[data-fallback]"
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
  cardsPerSlide = 3,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Créer les slides avec cardsPerSlide témoignages par slide
  const createSlides = () => {
    const slides = [];
    for (let i = 0; i < testimonials.length; i += cardsPerSlide) {
      slides.push(testimonials.slice(i, i + cardsPerSlide));
    }
    return slides;
  };

  const slides = createSlides();
  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)));
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
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
          {slides.map((slide, slideIndex) => (
            <S.TestimonialCardsSlide key={slideIndex}>
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
              {slides.map((_, index) => (
                <S.PaginationDot
                  key={index}
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
