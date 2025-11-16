import React, { useCallback, useEffect, useRef, useState } from "react";

import * as S from "./testimonialQuote.styled";
import type {
  TestimonialQuoteCardProps,
  TestimonialQuoteComponentProps,
} from "./testimonialQuote.types";

const TestimonialQuoteCard: React.FC<TestimonialQuoteCardProps> = ({
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

  return (
    <S.TestimonialQuoteCard>
      <S.TestimonialQuoteContent cite={name}>
        {content}
      </S.TestimonialQuoteContent>

      <S.TestimonialQuoteFrom>
        <S.AvatarContainer>
          {avatar ? (
            <img
              src={avatar}
              alt={`Profil de ${name}`}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                if (target.parentNode) {
                  const fallback = document.createElement("div");
                  fallback.className = "avatar-fallback";
                  fallback.textContent = initials;
                  fallback.style.cssText = `
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--color-primary, #007bff);
                    color: var(--color-on-primary, #ffffff);
                    font-weight: 600;
                    font-size: 1.75rem;
                  `;
                  target.parentNode.appendChild(fallback);
                }
              }}
            />
          ) : (
            <S.AvatarFallback aria-label={`Initiales de ${name}`}>
              {initials}
            </S.AvatarFallback>
          )}
        </S.AvatarContainer>

        <S.TestimonialQuoteInfo>
          <S.TestimonialQuoteName>{name}</S.TestimonialQuoteName>
          {displayPosition && (
            <S.TestimonialQuotePosition>
              {displayPosition}
            </S.TestimonialQuotePosition>
          )}
          <S.StarRating role="img" aria-label={`${rating} étoiles sur 5`}>
            {renderStars()}
          </S.StarRating>
        </S.TestimonialQuoteInfo>
      </S.TestimonialQuoteFrom>

      {date && (
        <div
          style={{
            marginTop: "var(--spacing-md, 16px)",
            fontSize: "0.875rem",
            color: "var(--color-on-surface-variant, #666666)",
            textAlign: "center",
          }}
        >
          <time
            dateTime={date}
            aria-label={`Témoignage publié le ${new Date(date).toLocaleDateString("fr-FR")}`}
          >
            {new Date(date).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      )}
    </S.TestimonialQuoteCard>
  );
};

const TestimonialQuoteComponent: React.FC<TestimonialQuoteComponentProps> = ({
  testimonials,
  autoplay = false,
  autoplayDelay = 5000,
  showPagination = true,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalItems = testimonials.length;
  const canNavigate = totalItems > 1;

  // Navigation functions
  const goToNext = useCallback(() => {
    if (!canNavigate) return;
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [canNavigate, totalItems]);

  const goToPrevious = useCallback(() => {
    if (!canNavigate) return;
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [canNavigate, totalItems]);

  const goToSlide = useCallback(
    (index: number) => {
      if (!canNavigate || index < 0 || index >= totalItems) return;
      setCurrentIndex(index);
    },
    [canNavigate, totalItems],
  );

  // Autoplay logic
  useEffect(() => {
    if (autoplay && canNavigate && !isPaused) {
      autoplayRef.current = setInterval(goToNext, autoplayDelay);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, canNavigate, isPaused, autoplayDelay, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!canNavigate) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNext();
          break;
        case "Home":
          event.preventDefault();
          goToSlide(0);
          break;
        case "End":
          event.preventDefault();
          goToSlide(totalItems - 1);
          break;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [canNavigate, goToPrevious, goToNext, goToSlide, totalItems]);

  // Pause autoplay on hover/focus
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleFocus = () => setIsPaused(true);
  const handleBlur = () => setIsPaused(false);

  if (!testimonials.length) {
    return (
      <S.TestimonialQuoteContainer className={className}>
        <p style={{ textAlign: "center" }}>Aucun témoignage disponible.</p>
      </S.TestimonialQuoteContainer>
    );
  }

  return (
    <S.TestimonialQuoteContainer
      ref={containerRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="region"
      aria-label="Carrousel de témoignages en citation"
      tabIndex={0}
    >
      {/* Screen reader announcements */}
      <S.AccessibleContent role="status" aria-live="polite" aria-atomic="true">
        Témoignage {currentIndex + 1} sur {totalItems}
      </S.AccessibleContent>

      <S.TestimonialQuoteWrapper
        $currentIndex={currentIndex}
        $totalItems={totalItems}
        role="group"
        aria-label="Témoignages clients en citation"
      >
        {testimonials.map((testimonial, index) => (
          <S.TestimonialQuoteSlide
            key={testimonial.id}
            aria-hidden={index !== currentIndex}
            role="tabpanel"
            aria-labelledby={`testimonial-quote-tab-${index}`}
          >
            <TestimonialQuoteCard testimonial={testimonial} />
          </S.TestimonialQuoteSlide>
        ))}
      </S.TestimonialQuoteWrapper>

      {/* Pagination Dots */}
      {canNavigate && showPagination && (
        <S.PaginationContainer
          role="tablist"
          aria-label="Sélection de témoignage"
        >
          {testimonials.map((_, index) => (
            <S.PaginationDot
              key={index}
              $active={index === currentIndex}
              onClick={() => goToSlide(index)}
              aria-label={`Aller au témoignage ${index + 1}`}
              role="tab"
              id={`testimonial-quote-tab-${index}`}
              aria-selected={index === currentIndex}
              type="button"
            />
          ))}
        </S.PaginationContainer>
      )}

      {/* Autoplay indicator */}
      {autoplay && canNavigate && (
        <S.AccessibleContent>
          Carrousel en lecture automatique.
          {isPaused
            ? "En pause."
            : `Changement automatique toutes les ${autoplayDelay / 1000} secondes.`}
          Utilisez les flèches du clavier ou survolez pour contrôler.
        </S.AccessibleContent>
      )}
    </S.TestimonialQuoteContainer>
  );
};

export default TestimonialQuoteComponent;
export { TestimonialQuoteCard };
